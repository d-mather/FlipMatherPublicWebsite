<?php
// generate-payfast.php

function generateSignature(array $data): string
{
    // Remove empty values
    $filtered = array_filter($data, fn($v) => $v !== "");

    // Sort by key (PayFast requires alphabetical order)
    ksort($filtered);

    // Build signature string
    $signatureString = "";
    foreach ($filtered as $key => $value) {
        $signatureString .= $key . "=" . urlencode(trim($value)) . "&";
    }

    $signatureString = rtrim($signatureString, "&");

    return md5($signatureString);
}

header('Content-Type: application/json');
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

require_once "./db.php";

try {
    // PayFast merchant settings
    $merchant_id  = "MERCHANT_ID_HERE";
    $merchant_key = "MERCHANT_KEY_HERE";

    // Read JSON
    $input = json_decode(file_get_contents("php://input"), true);

    $amount  = floatval($input["amount"] ?? 0);
    $name    = trim($input["name"] ?? "");
    $message = trim($input["message"] ?? "");
    $userId  = isset($input["user_id"]) ? (int)$input["user_id"] : $_SESSION['uid'] ?? null;

    // --- Insert into DB (PDO) ---
    $stmt = $pdo->prepare("
        INSERT INTO vlog_sponsors (user_id, name, message, amount)
        VALUES (:user_id, :name, :message, :amount)
    ");

    $stmt->execute([
        ':user_id' => $userId,
        ':name'    => $name,
        ':message' => $message,
        ':amount'  => $amount
    ]);

    $insertId = $pdo->lastInsertId();

    // --- Prepare PayFast fields ---
    $pf_data = [
        'merchant_id' => $merchant_id,
        'merchant_key' => $merchant_key,
        'return_url' => 'https://www.flipmather.co.za/thankyou',
        'cancel_url' => 'https://www.flipmather.co.za/sponsor',
        'notify_url' => 'https://www.flipmather.co.za/api/payfast-notify',
        'amount' => number_format($amount, 2, '.', ''),
        'item_name' => "Vlog Sponsorship #$insertId",
        'm_payment_id' => $insertId
    ];

    // --- Signature ---
    $pf_data['signature'] = generateSignature($pf_data);

    // Output JSON
    echo json_encode($pf_data);
} catch (Exception $ex) {
    error_log($ex->getMessage());
    http_response_code(422);
    echo "Error: " . $ex->getMessage();
    exit;
}
