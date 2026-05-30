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

$name = trim($data["name"] ?? "");
$email = trim($data["email"] ?? "");
$phone = trim($data["phone"] ?? "");
$password = $data["password"] ?? "";

if (!$name || !$email || !$phone || !$password) {
    sendResponse(false, "All fields are required");
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    sendResponse(false, "Invalid email address");
}

if (strlen($password) < 6) {
    sendResponse(false, "Password must be at least 6 characters");
}

$database = new Database();
$conn = $database->connect();

try {
    $checkStmt = $conn->prepare("SELECT id FROM users WHERE email = :email");
    $checkStmt->execute([":email" => $email]);

    if ($checkStmt->fetch()) {
        sendResponse(false, "Email already registered");
    }

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $conn->prepare("
        INSERT INTO users (name, email, phone, password)
        VALUES (:name, :email, :phone, :password)
        RETURNING id, name, email, phone
    ");

    $stmt->execute([
        ":name" => $name,
        ":email" => $email,
        ":phone" => $phone,
        ":password" => $hashedPassword
    ]);

    $user = $stmt->fetch();

    sendResponse(true, "Signup successful", $user);

} catch (PDOException $e) {
    sendResponse(false, "Signup failed", $e->getMessage());
}