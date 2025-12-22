<?php
// public_html/api/index.php
declare(strict_types=1);

// ---- Bypass headers for PayFast ITN ----
$uri = $_SERVER['REQUEST_URI'];
if (strpos($uri, '/payfast-notify') !== false) {
    // No JSON, no CORS, no security headers.
    // Let payfast-notify.php control headers.
    require __DIR__ . '/payfast-notify.php';
    exit;
}

// ----- basic JSON/CORS headers -----
header('Content-Type: application/json; charset=utf-8');

$allowedOrigins = [
    'https://flipmather.co.za',
    'https://www.flipmather.co.za'
];

if (!empty($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins, true)) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header("Access-Control-Allow-Credentials: true");
}

header('Access-Control-Allow-Headers: Content-Type, Authorization, X-CSRF-Token');
header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');

// Important: OPTIONS preflight must end immediately
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// ----- sessions (for login) -----
// Harden session settings
ini_set('session.use_strict_mode', '1');
ini_set('session.cookie_httponly', '1');
// If your whole site is HTTPS:
ini_set('session.cookie_secure', '1');


//------------------ start error log code ------------------//
// ---- robust error logging (drop-in) ----
$LOG_DIR  = __DIR__ . '/logs';
if (!is_dir($LOG_DIR)) { @mkdir($LOG_DIR, 0755, true); }
$LOG_FILE = $LOG_DIR . '/php-error.log';

// Try to send PHP's internal errors here
ini_set('display_errors', '0');        // hide from users
ini_set('log_errors', '1');            // log instead
ini_set('error_log', $LOG_FILE);       // some hosts ignore this, so we add handlers too

// Catch warnings/notices (so they don't become blank 500s)
set_error_handler(function($sev, $msg, $file, $line) use ($LOG_FILE) {
  // Let PHP handle fatal-level errors; log the rest.
  error_log("PHP error [$sev] $msg @ $file:$line");
  return false; // keep default behavior
});

// Catch uncaught exceptions
set_exception_handler(function($e) {
  error_log('Uncaught: '.$e->getMessage().' @ '.$e->getFile().':'.$e->getLine());
  http_response_code(500);
  header('Content-Type: application/json');
  echo json_encode(['error' => 'server error']);
  exit;
});

// Catch fatal errors on shutdown
register_shutdown_function(function() {
  $e = error_get_last();
  if ($e && in_array($e['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR], true)) {
    error_log('Fatal: '.$e['message'].' @ '.$e['file'].':'.$e['line']);
  }
});
//------------------ end error log code ------------------//

session_set_cookie_params([
  'lifetime' => 60*60*24*7,     // 7 days
  'path' => '/',
  'secure' => isset($_SERVER['HTTPS']), // true on HTTPS
  'httponly' => true,
  'samesite' => 'Lax'
]);
session_start();

// ----- DB -----
require __DIR__ . '/db.php';
require __DIR__ . '/helpers.php';
require __DIR__ . '/send_resend.php';

// ----- helpers -----
function json($data, int $status = 200) {
  http_response_code($status);
  echo json_encode($data, JSON_UNESCAPED_SLASHES);
  exit;
}
function body(): array {
  $raw = file_get_contents('php://input');
  if (!$raw) return [];
  $data = json_decode($raw, true);
  if (json_last_error() !== JSON_ERROR_NONE) json(['error' => 'invalid JSON'], 400);
  // return is_array($data) ? $data : [];
  return $data;
}
function require_login() {
  if (!isset($_SESSION['uid'])) json(['error'=>'unauthorized'], 401);
}
function me_id(): ?int { return isset($_SESSION['uid']) ? (int)$_SESSION['uid'] : null; }

// ----- parse path -----
$uri  = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$apiBase = '/api/';
$path = trim(substr($uri, strlen($apiBase)), '/');
$seg  = $path === '' ? [] : explode('/', $path);
$method = $_SERVER['REQUEST_METHOD'];

// ----- simple routing -----
try {
  if ($method === 'POST' && ($seg[0] ?? '') === 'login')      { require __DIR__.'/login.php'; exit; }
  if ($method === 'POST' && ($seg[0] ?? '') === 'logout')     { require __DIR__.'/logout.php'; exit; }
  if ($method === 'POST' && ($seg[0] ?? '') === 'verify-email') { require __DIR__.'/verify_email.php'; exit; }
  if ($method === 'POST' && ($seg[0] ?? '') === 'resend-otp') { require __DIR__.'/resend_otp.php'; exit; }
  if ($method === 'POST' && ($seg[0] ?? '') === 'forgot-password') { require __DIR__.'/forgot_password.php'; exit; }
  if ($method === 'POST' && ($seg[0] ?? '') === 'reset-password') { require __DIR__.'/reset_password.php'; exit; }
  if ($method === 'GET'  && ($seg[0] ?? '') === 'me')         { require __DIR__.'/me.php'; exit; }
  if ($method === 'GET'  && ($seg[0] ?? '') === 'admin-get-users') { require __DIR__ . '/admin_get_users.php'; exit; }
  if ($method === 'GET'  && ($seg[0] ?? '') === 'admin-get-sponsors') { require __DIR__ . '/admin_get_sponsors.php'; exit; }
  if ($method === 'POST' && ($seg[0] ?? '') === 'egg-order') { require __DIR__ . '/egg_order.php'; exit; }
  if ($method === 'GET'  && ($seg[0] ?? '') === 'gallery') { require __DIR__ . '/gallery_manage.php'; exit; }
  if ($method === 'POST' && ($seg[0] ?? '') === 'gallery') { require __DIR__ . '/gallery_manage.php'; exit; }
  if ($method === 'DELETE' && ($seg[0] ?? '') === 'gallery') { require __DIR__ . '/gallery_manage.php'; exit; }

  if ($method === 'POST' && ($seg[0] ?? '') === 'generate-payfast') { require __DIR__ . '/generate-payfast.php'; exit; }
  if ($method === 'POST' && ($seg[0] ?? '') === 'payfast-notify') { require __DIR__ . '/payfast-notify.php'; exit; }

  if ($method === 'POST' && ($seg[0] ?? '') === 'users' && count($seg) === 1) { require __DIR__.'/create_user.php'; exit; }
  if ($method === 'GET'  && ($seg[0] ?? '') === 'users' && isset($seg[1]))    { $_GET['id'] = $seg[1]; require __DIR__.'/get_user.php'; exit; }
  if (($method === 'PUT' || $method === 'PATCH') && ($seg[0] ?? '') === 'users' && isset($seg[1])) {
    $_GET['id'] = $seg[1]; require __DIR__.'/update_user.php'; exit;
  }

  json(['error'=>'route not found','path'=>$path,'method'=>$method], 404);

} catch (Throwable $e) {
  // In production, log $e->getMessage() to a file instead of returning it
  error_log($e->getMessage());
  json(['error'=>'server error'], 500);
}
