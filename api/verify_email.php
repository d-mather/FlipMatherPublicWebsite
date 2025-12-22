<?php

require_json_size(1 * 1024 * 1024); // 1 MB
rate_limit('verify:'.($_SERVER['REMOTE_ADDR'] ?? 'ip'), 10, 300);

try {
  $b = body();
  if (empty($b['email']) || empty($b['otp']))
      throw new Exception("email and otp required");

  $email = norm_email($b['email']);
  $otp   = assert_string($b['otp'], 6);

  // Lookup user
  $stmt = $pdo->prepare("
        SELECT id, email_verification_code, email_verification_expires, email_verified_at
        FROM users
        WHERE email_lower = LOWER(?)
        LIMIT 1
  ");
  $stmt->execute([$email]);
  $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!array_key_exists('email_verified_at', $user) || !empty($user['email_verified_at'])) {
        json(['ok'=>true]);
    }
    if (!array_key_exists('email_verification_code', $user)) {
        json(['error'=>"server misconfigured: missing verification_code"], 500);
    }
    if ($user['email_verification_code'] !== $otp) {
        json(['error'=>"invalid code"], 400);
    }
    if (!array_key_exists('email_verification_expires', $user)) {
        json(['error'=>"server misconfigured: missing verification_expires"], 500);
    }
    if (strtotime($user['email_verification_expires']) < time()) {
        json(['error'=>"code expired"], 400);
    }

  // mark verified
  $upd = $pdo->prepare("
      UPDATE users
      SET 
        email_verified_at = NOW(),
        email_verification_code = NULL,
        email_verification_expires = NULL,
        updated_at = NOW()
      WHERE id = ?
  ");
  $upd->execute([$user['id']]);
  
  // Fetch full user data to return
  $stmt = $pdo->prepare("SELECT * FROM users WHERE id = ? LIMIT 1");
  $stmt->execute([$user['id']]);
  $verified_user = $stmt->fetch(PDO::FETCH_ASSOC);
  
  // session hardening
  session_regenerate_id(true);
  $_SESSION['uid'] = (int)$verified_user['id'];
  
  json(['ok'=>true, 'user'=>[
    'id'=>(int)$verified_user['id'],
    'first_name'=>$verified_user['first_name'],
    'last_name'=>$verified_user['last_name'],
    'email'=>$verified_user['email'],
    'role'=>$verified_user['role']
  ]]);

} catch (Exception $ex) {
    error_log($ex->getMessage());
    json(['error' => 'Server error'], 500);
}
