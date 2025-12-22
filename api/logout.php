<?php
// public_html/api/logout.php
session_destroy();
json(['ok'=>true]);
