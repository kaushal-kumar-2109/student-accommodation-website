<?php

require_once "../config/database.php";
require_once "../helpers/response.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") exit;

$data = json_decode(file_get_contents("php://input"), true);

$user_id = $data["user_id"] ?? null;
$property_id = $data["property_id"] ?? null;
$name = trim($data["name"] ?? "");
$phone = trim($data["phone"] ?? "");
$message = trim($data["message"] ?? "");

if (!$user_id || !$property_id || !$name || !$phone || !$message) {
    sendResponse(false, "All fields are required");
}

$database = new Database();
$conn = $database->connect();

try {
    $stmt = $conn->prepare("
        INSERT INTO enquiries (user_id, property_id, name, phone, message)
        VALUES (:user_id, :property_id, :name, :phone, :message)
    ");

    $stmt->execute([
        ":user_id" => $user_id,
        ":property_id" => $property_id,
        ":name" => $name,
        ":phone" => $phone,
        ":message" => $message
    ]);

    sendResponse(true, "Enquiry submitted successfully");

} catch (PDOException $e) {
    sendResponse(false, "Failed to submit enquiry", $e->getMessage());
}