<?php
// admin_get_sponsors.php

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

    // Check admin role
    $stmt = $pdo->prepare("SELECT role FROM users WHERE id = ? LIMIT 1");
    $stmt->execute([$userId]);
    $user = $stmt->fetch();

    if (!$user || $user['role'] !== 'admin') {
        json(['error' => 'Forbidden'], 403);
    }

    // ---------------------------------------------
    // GET SPONSORS
    // ---------------------------------------------
    $stmt = $pdo->query("
        SELECT 
            id,
            user_id,
            name,
            message,
            amount,
            created_at,
            paid,
            paid_at
        FROM vlog_sponsors
        ORDER BY created_at ASC
    ");

    $sponsors = $stmt->fetchAll(PDO::FETCH_ASSOC);

    json(['success' => true, 'sponsors' => $sponsors]);

} catch (Exception $ex) {
    error_log($ex->getMessage());
    json(['error' => 'Server error'], 500);
}
