<?php

require_once "../config/database.php";
require_once "../helpers/response.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    sendResponse(false, "Only POST method allowed");
}

$data = json_decode(file_get_contents("php://input"), true);

$email = trim($data["email"] ?? "");
$password = $data["password"] ?? "";

if (!$email || !$password) {
    sendResponse(false, "Email and password are required");
}

$database = new Database();
$conn = $database->connect();

try {
    $stmt = $conn->prepare("
        SELECT id, name, email, phone, password
        FROM users
        WHERE email = :email
    ");

    $stmt->execute([":email" => $email]);
    $user = $stmt->fetch();

    if (!$user) {
        sendResponse(false, "Invalid email or password");
    }

    if (!password_verify($password, $user["password"])) {
        sendResponse(false, "Invalid email or password");
    }

    unset($user["password"]);
    $user["role"] = $user["email"] === "admin@stayfinder.com" ? "admin" : "user";
    sendResponse(true, "Login successful", $user);

} catch (PDOException $e) {
    sendResponse(false, "Login failed", $e->getMessage());
}