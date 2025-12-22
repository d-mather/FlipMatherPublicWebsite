<?php
// update_user.php
require_login();                // defined in index.php
require_json_size(1 * 1024 * 1024);

$id = (int)($_GET['id'] ?? 0);
if ($id <= 0) json(['error'=>'invalid id'], 400);

// Simple "self-service" rule: only update yourself
if (!isset($_SESSION['uid']) || (int)$_SESSION['uid'] !== $id) {
  json(['error'=>'unauthorized'], 401);
}

try {
  $b = body();

  $set = []; $vals = [];

  // Validatable fields
  if (array_key_exists('first_name', $b)) { $set[] = "first_name = ?"; $vals[] = assert_string($b['first_name'], 100); }
  if (array_key_exists('last_name',  $b)) { $set[] = "last_name = ?";  $vals[] = assert_string($b['last_name'], 100); }
  if (array_key_exists('phone_e164', $b)) { $set[] = "phone_e164 = ?"; $vals[] = assert_e164($b['phone_e164']); }
  if (array_key_exists('locale',     $b)) { $set[] = "locale = ?";     $vals[] = assert_string($b['locale'], 10); }
  if (array_key_exists('timezone',   $b)) { $set[] = "timezone = ?";   $vals[] = assert_string($b['timezone'], 64); }

  if (array_key_exists('marketing_opt_in', $b)) {
    $set[] = "marketing_opt_in = ?";
    $vals[] = (int)!!$b['marketing_opt_in'];
  }

  // Optional password change
  if (!empty($b['new_password'])) {
    // Optional policy: uncomment to enforce
    strong_password($b['new_password']);
    $set[] = "password_hash = ?";
    $vals[] = password_hash($b['new_password'], PASSWORD_DEFAULT);
    $set[] = "password_updated_at = NOW()";
  }

  if (!$set) json(['error'=>'no fields to update'], 422);

  $vals[] = $id;
  $sql = "UPDATE users SET ".implode(', ', $set).", updated_at = NOW() WHERE id = ? AND deleted_at IS NULL";
  $stmt = $pdo->prepare($sql);
  $stmt->execute($vals);

  json(['ok'=>true]);

} catch (Exception $ex) {
    error_log($ex->getMessage());
    json(['error' => 'Server error'], 500);
}
