<?php
// payfast-notify.php
ini_set('error_log', __DIR__ . '/logs/php-error.log');
require_once "./db.php";

// PayFast requires text/plain, NOT JSON
header("Content-Type: text/plain");

// ---- Helper: Get remote IP safely ----
function pf_get_ip() {
    if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        // may contain multiple IPs - take the first
        return trim(explode(',', $_SERVER['HTTP_X_FORWARDED_FOR'])[0]);
    }
    if (!empty($_SERVER['HTTP_X_REAL_IP'])) {
        return $_SERVER['HTTP_X_REAL_IP'];
    }
    return $_SERVER['REMOTE_ADDR'] ?? '';
}

try {
    $pfData = $_POST;
    $remoteIp = pf_get_ip();

    // ----------------------------------
    // 1. Validate sponsor/payment ID
    // ----------------------------------
    $sponsorId = intval($pfData['m_payment_id'] ?? 0);

    if ($sponsorId <= 0) {
        error_log("PayFast ITN: Missing or invalid payment id.");
        echo "OK";
        exit;
    }

    // ----------------------------------
    // 2. Validate amount
    // ----------------------------------
    $stmt = $pdo->prepare("SELECT amount FROM vlog_sponsors WHERE id = ?");
    $stmt->execute([$sponsorId]);
    $dbAmount = $stmt->fetchColumn();

    if ($dbAmount === false) {
        error_log("PayFast ITN: Sponsor $sponsorId not found.");
        echo "OK";
        exit;
    }

    $pfAmount = floatval($pfData["amount_gross"] ?? 0);

    if (abs(floatval($dbAmount) - $pfAmount) > 0.01) {
        error_log("PayFast ITN: Amount mismatch. Expected $dbAmount, got $pfAmount");
        echo "OK";
        exit;
    }

    // ----------------------------------
    // 3. Payment must be COMPLETE
    // ----------------------------------
    if (($pfData['payment_status'] ?? '') !== 'COMPLETE') {
        error_log("PayFast ITN: Payment not complete");
        echo "OK";
        exit;
    }

    // ----------------------------------
    // 4. Mark sponsor as paid
    // ----------------------------------
    $stmt = $pdo->prepare("
        UPDATE vlog_sponsors
        SET paid = 1, paid_at = NOW()
        WHERE id = ?
    ");
    $stmt->execute([$sponsorId]);

    // ----------------------------------
    // 5. Email notification if sponsor has an account with email
    // ----------------------------------
    // $stmt = $pdo->prepare("
    //     SELECT u.email
    //     FROM vlog_sponsors vs
    //     JOIN vlog_users u ON vs.user_id = u.id
    //     WHERE vs.id = ? AND u.email IS NOT NULL AND u.email <> ''
    // ");
    // $stmt->execute([$sponsorId]);
    // $email = $stmt->fetchColumn();

    // if ($email !== false && !empty($email)) {
    //     // Send email notification
    //     $subject = "Payment Received - FlipMather";
    //     $message = "Thank you for your payment!";
    //     mail($email, $subject, $message);
    // }

    // ----------------------------------
    // 5. Must return OK (200)
    // ----------------------------------
    echo "OK";
    exit;

} catch (Exception $ex) {
    // Log but always return OK to stop retries
    error_log("PayFast ITN Exception: " . $ex->getMessage());
    echo "OK";
    exit;
}
