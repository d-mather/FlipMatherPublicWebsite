<?php
// create_user.php

require_json_size(1 * 1024 * 1024); // 1 MB
rate_limit('signup:'.($_SERVER['REMOTE_ADDR'] ?? 'ip'), 5, 300); // 5 / 5min

try {
  $b = body();
  foreach (['first_name','last_name','email','password'] as $k) {
    if (empty($b[$k])) throw new Exception("$k is required");
  }

  $first = assert_string($b['first_name'], 100);
  $last  = assert_string($b['last_name'], 100);
  $email = norm_email($b['email']);
  $phone = assert_e164($b['phone_e164'] ?? null);
  $marketing_opt_in = !empty($b['marketing_opt_in']) ? 1 : 0;

  // unique email (case-insensitive)
  $chk = $pdo->prepare("SELECT 1 FROM users WHERE email_lower = LOWER(?) AND deleted_at IS NULL LIMIT 1");
  $chk->execute([$email]);
  if ($chk->fetch()) json(['error'=>'email already in use'], 409);

  // unique phone number
  $chkp = $pdo->prepare("SELECT 1 FROM users WHERE phone_e164 = :phone AND deleted_at IS NULL LIMIT 1");
  $chkp->execute([':phone' => $phone]);
  if ($chkp->fetch()) json(['error'=>'phone number already in use'], 409);

  $hash = password_hash($b['password'], PASSWORD_DEFAULT);

  $otp = random_int(100000, 999999);
  $expires = date('Y-m-d H:i:s', time() + 900); // 15 minutes

  $stmt = $pdo->prepare("
    INSERT INTO users (
      first_name,
      last_name,
      email,
      phone_e164,
      password_hash,
      marketing_opt_in,
      email_verification_code,
      email_verification_expires,
      email_verified_at,
      created_at,
      updated_at
      )
    VALUES (?,?,?,?,?,?,?,?,NULL,NOW(),NOW())
  ");
  $stmt->execute([$first, $last, $email, $phone, $hash, $marketing_opt_in, $otp, $expires]);

  resend_send(
    [$email],
    "Verify your email - Flip Mather",
    "<p>Your Flip Mater verification code is:</p><h2>$otp</h2><p>It expires in 15 minutes.</p>"
  );

  $id = (int)$pdo->lastInsertId();
  json(['ok'=>true, 'id'=>$id], 201);

} catch (Exception $ex) {
    error_log($ex->getMessage());
    json(['error' => 'Server error'], 500);
}
