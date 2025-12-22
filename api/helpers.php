<?php
function norm_email(string $e): string {
  $e = trim($e);
  if (!filter_var($e, FILTER_VALIDATE_EMAIL)) throw new Exception('invalid email');
  return $e;
}
function is_e164(?string $p): bool {
  if ($p === null || $p === '') return true; // optional
  return (bool)preg_match('/^\+[1-9]\d{7,14}$/', $p);
}
function assert_e164(?string $p): ?string {
  if ($p === null || $p === '') return null;
  if (!is_e164($p)) throw new Exception('invalid phone');
  return $p;
}
function assert_string(string $s, int $max=255): string {
  $s = trim($s);
  if (mb_strlen($s) > $max) throw new Exception('input too long');
  return $s;
}
function strong_password(string $p): void {
  if (strlen($p) < 10) throw new Exception('password too short');
  if (!preg_match('/[a-z]/', $p)) throw new Exception('password needs a lowercase letter');
  if (!preg_match('/[A-Z]/', $p)) throw new Exception('password needs an uppercase letter');
  if (!preg_match('/\d/', $p))   throw new Exception('password needs a digit');
  if (!preg_match('/[^A-Za-z0-9]/', $p)) throw new Exception('password needs a symbol');
}
function require_json_size(int $maxBytes = 1048576 /* 1MB */): void {
  $len = (int)($_SERVER['CONTENT_LENGTH'] ?? 0);
  if ($len > $maxBytes) { http_response_code(413); echo json_encode(['error'=>'payload too large']); exit; }
}
function rate_limit(string $key, int $max, int $windowSec): void {
  $dir = sys_get_temp_dir().'/api_rl';
  if (!is_dir($dir)) @mkdir($dir, 0700, true);
  $file = $dir.'/'.sha1($key).'.json';

  $now = time();
  $data = ['t'=> $now, 'c'=> 0];

  if (is_file($file)) {
    $data = json_decode(file_get_contents($file), true) ?: $data;
    if ($now - (int)$data['t'] >= $windowSec) { $data = ['t'=>$now,'c'=>0]; }
  }

  if ($data['c'] >= $max) {
    http_response_code(429);
    header('Retry-After: '.max(1, $windowSec - ($now - (int)$data['t'])));
    echo json_encode(['error'=>'too many requests']);
    exit;
  }

  $data['c']++;
  file_put_contents($file, json_encode($data), LOCK_EX);
}
