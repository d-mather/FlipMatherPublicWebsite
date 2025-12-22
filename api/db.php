<?php
// public_html/api/db.php
$DB_HOST = 'localhost';
$DB_NAME = 'DB_NAME';
$DB_USER = 'DB_USERNAME';
$DB_PASS = 'DB_PASSWORD';
$DB_CHARSET = 'utf8mb4';

$dsn = "mysql:host=$DB_HOST;dbname=$DB_NAME;charset=$DB_CHARSET";
$options = [
  PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
  PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
  PDO::ATTR_EMULATE_PREPARES => false,
];
$pdo = new PDO($dsn, $DB_USER, $DB_PASS, $options);
