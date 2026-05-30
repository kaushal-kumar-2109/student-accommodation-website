<?php

require_once __DIR__ . '/vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

try {

    $conn = new PDO(
        "pgsql:host=".$_ENV['DB_HOST'].
        ";port=".$_ENV['DB_PORT'].
        ";dbname=".$_ENV['DB_NAME'].
        ";sslmode=require",
        $_ENV['DB_USER'],
        $_ENV['DB_PASSWORD']
    );

    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    echo "Database Connected Successfully";

} catch (PDOException $e) {

    echo "Connection Error: " . $e->getMessage();
}