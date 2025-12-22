<?php
include 'send_resend.php';

// public_html/api/me.php
if (!isset($_SESSION['uid'])) json(['user'=>null], 200);
$stmt = $pdo->prepare("SELECT id, first_name, last_name, email, phone_e164, role, created_at
                       FROM users WHERE id = ? AND deleted_at IS NULL");
$stmt->execute([$_SESSION['uid']]);
$user = $stmt->fetch();
json(['user'=>$user ?: null]);