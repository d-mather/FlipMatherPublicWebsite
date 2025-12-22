<?php
// login.php
require_json_size(1 * 1024 * 1024);
rate_limit('login:'.($_SERVER['REMOTE_ADDR'] ?? 'ip'), 10, 60); // 10 / min

try {
  $b = body();
  $email = norm_email($b['email'] ?? '');
  $pass  = $b['password'] ?? '';
  if ($pass === '') throw new Exception('password required');

  // Fetch user (case-insensitive)
  $stmt = $pdo->prepare("SELECT * FROM users WHERE email_lower = LOWER(?) AND deleted_at IS NULL LIMIT 1");
  $stmt->execute([$email]);
  $u = $stmt->fetch();
  if (!$u) json(['error'=>'Invalid credentials'], 401);

  // lockout check
  if (!empty($u['locked_until']) && strtotime($u['locked_until']) > time()) {
    json(['error'=>'Account locked, try later'], 423);
  }

  if (!password_verify($pass, $u['password_hash'])) {
    // bump counters; lock for 15 minutes after 5th failure
    $upd = $pdo->prepare("
      UPDATE users
      SET failed_login_attempts = failed_login_attempts + 1,
          locked_until = CASE
              WHEN failed_login_attempts + 1 >= 5 THEN DATE_ADD(NOW(), INTERVAL 15 MINUTE)
              ELSE locked_until END
      WHERE id = ?
    ");
    $upd->execute([$u['id']]);
    json(['error'=>'Invalid credentials'], 401);
  }

  // prevent unverified accounts to login
  if (empty($u['email_verified_at'])) {
    json(['error' => 'Email not verified'], 403);
  }

  // success → reset counters, record login
  $upd = $pdo->prepare("
    UPDATE users
    SET failed_login_attempts = 0,
        locked_until = NULL,
        last_login_at = NOW(),
        login_count = login_count + 1
    WHERE id = ?
  ");
  $upd->execute([$u['id']]);

  // session hardening
  session_regenerate_id(true);
  $_SESSION['uid'] = (int)$u['id'];

  json(['ok'=>true,'user'=>[
    'id'=>(int)$u['id'],
    'first_name'=>$u['first_name'],
    'last_name'=>$u['last_name'],
    'email'=>$u['email'],
    'role'=>$u['role']
  ]]);

} catch (Exception $ex) {
    error_log($ex->getMessage());
    json(['error' => 'Server error'], 500);
}
