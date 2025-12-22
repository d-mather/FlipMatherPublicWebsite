<?php

try {
    $data = body();
    $email = $data['email'] ?? '';
    $otp = $data['otp'] ?? '';
    $newPassword = $data['password'] ?? '';

    rate_limit('reset:'.$email, 10, 900); // 10 tries per 15 minutes

    if (!$email || !$otp || !$newPassword) {
        json(['error' => 'Missing required fields'], 400);
    }

    $stmt = $pdo->prepare("SELECT id, reset_token, reset_token_expires_at FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if (!$user || !$user['reset_token']) {
        json(['error' => 'Invalid or expired OTP'], 400);
    }

    if ($user['reset_token'] !== $otp) {
        json(['error' => 'Invalid OTP'], 400);
    }

    if (strtotime($user['reset_token_expires_at']) < time()) {
        json(['error' => 'OTP expired'], 400);
    }

    // update password
    $hash = password_hash($newPassword, PASSWORD_DEFAULT);

    $stmt = $pdo->prepare("
    UPDATE users 
    SET password_hash = ?, reset_token = NULL, reset_token_expires_at = NULL 
    WHERE id = ?
    ");
    $stmt->execute([$hash, $user['id']]);

    json(['success' => true]);
} catch (Exception $ex) {
    error_log($ex->getMessage());
    json(['error' => 'Server error'], 500);
}