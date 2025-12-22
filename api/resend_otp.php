<?php

require_json_size(1 * 1024 * 1024); // 1 MB
rate_limit('resend_otp:'.($_SERVER['REMOTE_ADDR'] ?? 'ip'), 3, 300); // 3 attempts per 5 minutes

try {
  $b = body();
  if (empty($b['email']))
      throw new Exception("email is required");

  $email = norm_email($b['email']);

  // Lookup user
  $stmt = $pdo->prepare("
    SELECT id, email_verified_at
    FROM users
    WHERE email_lower = LOWER(?)
    LIMIT 1
  ");
  $stmt->execute([$email]);
  $user = $stmt->fetch(PDO::FETCH_ASSOC);

  if (!$user) {
    json(['error'=>'user not found'], 404);
  }

  // If already verified, no need to resend
  if (!empty($user['email_verified_at'])) {
    json(['ok'=>true, 'message'=>'email already verified']);
  }

  // Generate new OTP
  $otp = random_int(100000, 999999);
  $expires = date('Y-m-d H:i:s', time() + 900); // 15 minutes

  // Update user with new OTP and expiry
  $upd = $pdo->prepare("
    UPDATE users
    SET 
      email_verification_code = ?,
      email_verification_expires = ?,
      updated_at = NOW()
    WHERE id = ?
  ");
  $upd->execute([$otp, $expires, $user['id']]);

  // Send verification email
  resend_send(
    [$email],
    "Verify your email - Flip Mather",
    "<p>Your Flip Mather verification code is:</p><h2>$otp</h2><p>It expires in 15 minutes.</p>"
  );

  json(['ok'=>true, 'message'=>'verification code sent'], 200);

} catch (Exception $ex) {
    error_log($ex->getMessage());
    json(['error' => 'Server error'], 500);
}

