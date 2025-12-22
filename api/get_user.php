<?php
// public_html/api/get_user.php
$id = (int)($_GET['id'] ?? 0);
if ($id <= 0) json(['error'=>'invalid id'], 400);

$stmt = $pdo->prepare("SELECT id, first_name, last_name, email, phone_e164, role, created_at, email_verified_at
                       FROM users WHERE id = ? AND deleted_at IS NULL");
$stmt->execute([$id]);
$row = $stmt->fetch();
if (!$row) json(['error'=>'not found'], 404);
json($row);
