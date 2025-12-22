<?php
// admin_get_users.php

try {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }

    // ---------------------------------------------
    // REQUIRE AUTH + ADMIN ROLE
    // ---------------------------------------------
    if (!isset($_SESSION['uid'])) {
        json(['error' => 'Unauthorized'], 401);
    }

    $userId = $_SESSION['uid'];

    // Fetch the user
    $stmt = $pdo->prepare("SELECT role FROM users WHERE id = ? LIMIT 1");
    $stmt->execute([$userId]);
    $user = $stmt->fetch();

    if (!$user || $user['role'] !== 'admin') {
        json(['error' => 'Forbidden'], 403);
    }

    // ---------------------------------------------
    // GET USERS (only selected columns)
    // ---------------------------------------------
    $stmt = $pdo->query("
        SELECT 
            id,
            first_name,
            last_name,
            email,
            phone_e164,
            password_updated_at,
            email_verified_at,
            role,
            marketing_opt_in,
            last_login_at,
            login_count,
            failed_login_attempts,
            locked_until,
            created_at,
            updated_at
        FROM users
        ORDER BY created_at ASC
    ");

    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

    json(['success' => true, 'users' => $users]);
} catch (Exception $ex) {
    error_log($ex->getMessage());
    json(['error' => 'Server error'], 500);
}
