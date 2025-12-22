<?php
// include 'send_resend.php';

try {
    $data = body();
    $email = $data['email'] ?? '';

    rate_limit('forgot:'.$email, 5, 900); // 5 per 15 minutes

    if (!$email) {
        json(['error' => 'Email is required'], 400);
    }

    $stmt = $pdo->prepare("SELECT id, email FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if (!$user) {
        // don't reveal if user doesn't exist
        json(['success' => true]);
    }

    // generate 6-digit OTP
    $otp = random_int(100000, 999999);

    // Send OTP via email
    resend_send([$email], "Password Reset OTP", "<p>Your password reset code is $otp </p>");

    // expire in 15 minutes
    $expires = date('Y-m-d H:i:s', time() + 900);

    $stmt = $pdo->prepare("UPDATE users SET reset_token = ?, reset_token_expires_at = ? WHERE id = ?");
    $stmt->execute([$otp, $expires, $user['id']]);

    json(['success' => true]);
} catch (Exception $ex) {
    error_log($ex->getMessage());
    json(['error' => 'Server error'], 500);
}
