<?php
// api/gallery_manage.php
// GET  /api/gallery                - get all gallery images
// POST /api/gallery                - create new gallery image (admin only)
// DELETE /api/gallery/{id}         - delete gallery image (admin only)

try {
  $method = $_SERVER['REQUEST_METHOD'];
  $body = body();

  // Check admin role for POST/DELETE
  if ($method === 'POST' || $method === 'DELETE') {
    $stmt = $pdo->prepare("SELECT role FROM users WHERE id = ? LIMIT 1");
    $stmt->execute([me_id()]);
    $user = $stmt->fetch();
    
    if (!$user || $user['role'] !== 'admin') {
      json(['error' => 'Forbidden - Admin access required'], 403);
    }
  }

  if ($method === 'GET') {
    // Get all gallery images, latest first
    $stmt = $pdo->query("
      SELECT 
        id, 
        title, 
        cloudinary_public_id, 
        description, 
        display_order, 
        created_at 
      FROM gallery 
      WHERE deleted_at IS NULL 
      ORDER BY display_order DESC, created_at DESC
    ");
    $images = $stmt->fetchAll();
    json(['success' => true, 'data' => $images]);
  }

  if ($method === 'POST') {
    // Create new gallery image
    $title = $body['title'] ?? null;
    $cloudinary_public_id = $body['cloudinary_public_id'] ?? null;
    $description = $body['description'] ?? '';

    if (!$title || !$cloudinary_public_id) {
      json(['error' => 'Missing required fields: title, cloudinary_public_id'], 400);
    }

    // Get the next display_order
    $stmt = $pdo->query("SELECT MAX(display_order) as max_order FROM gallery WHERE deleted_at IS NULL");
    $result = $stmt->fetch();
    $next_order = ($result['max_order'] ?? 0) + 1;

    $stmt = $pdo->prepare("
      INSERT INTO gallery (title, cloudinary_public_id, description, display_order, created_at)
      VALUES (?, ?, ?, ?, NOW())
    ");
    $stmt->execute([$title, $cloudinary_public_id, $description, $next_order]);
    
    $image_id = $pdo->lastInsertId();
    
    json([
      'success' => true, 
      'message' => 'Image added to gallery',
      'id' => $image_id
    ], 201);
  }

  if ($method === 'DELETE') {
    // Soft delete gallery image
    $image_id = (int)($_GET['id'] ?? 0);
    
    if ($image_id <= 0) {
      json(['error' => 'Invalid image ID'], 400);
    }

    $stmt = $pdo->prepare("SELECT id FROM gallery WHERE id = ? AND deleted_at IS NULL");
    $stmt->execute([$image_id]);
    
    if (!$stmt->fetch()) {
      json(['error' => 'Image not found'], 404);
    }

    $stmt = $pdo->prepare("UPDATE gallery SET deleted_at = NOW() WHERE id = ?");
    $stmt->execute([$image_id]);

    json(['success' => true, 'message' => 'Image deleted from gallery']);
  }

  json(['error' => 'Method not allowed'], 405);

} catch (Throwable $e) {
  error_log($e->getMessage());
  json(['error' => 'Server error'], 500);
}
