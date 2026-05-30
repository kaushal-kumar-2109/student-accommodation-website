<?php

require_once "../config/database.php";
require_once "../helpers/response.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}

$user_id = $_GET["user_id"] ?? null;
$property_id = $_GET["property_id"] ?? null;

if (!$user_id || !$property_id) {
    sendResponse(false, "User ID and Property ID are required");
}

$database = new Database();
$conn = $database->connect();

try {
    $stmt = $conn->prepare("
        SELECT id 
        FROM interested_users 
        WHERE user_id = :user_id AND property_id = :property_id
    ");

    $stmt->execute([
        ":user_id" => $user_id,
        ":property_id" => $property_id
    ]);

    $interested = $stmt->fetch() ? true : false;

    sendResponse(true, "Interest status fetched", [
        "interested" => $interested
    ]);

} catch (PDOException $e) {
    sendResponse(false, "Failed to check interest", $e->getMessage());
}