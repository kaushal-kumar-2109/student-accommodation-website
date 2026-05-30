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

$data = json_decode(file_get_contents("php://input"), true);

$user_id = $data["user_id"] ?? null;
$property_id = $data["property_id"] ?? null;

if (!$user_id || !$property_id) {
    sendResponse(false, "User ID and Property ID are required");
}

$database = new Database();
$conn = $database->connect();

try {
    $checkStmt = $conn->prepare("
        SELECT id 
        FROM interested_users 
        WHERE user_id = :user_id AND property_id = :property_id
    ");

    $checkStmt->execute([
        ":user_id" => $user_id,
        ":property_id" => $property_id
    ]);

    $interest = $checkStmt->fetch();

    if ($interest) {
        $deleteStmt = $conn->prepare("
            DELETE FROM interested_users 
            WHERE user_id = :user_id AND property_id = :property_id
        ");

        $deleteStmt->execute([
            ":user_id" => $user_id,
            ":property_id" => $property_id
        ]);

        sendResponse(true, "Property removed from shortlist", [
            "interested" => false
        ]);
    }

    $insertStmt = $conn->prepare("
        INSERT INTO interested_users (user_id, property_id)
        VALUES (:user_id, :property_id)
    ");

    $insertStmt->execute([
        ":user_id" => $user_id,
        ":property_id" => $property_id
    ]);

    sendResponse(true, "Property added to shortlist", [
        "interested" => true
    ]);

} catch (PDOException $e) {
    sendResponse(false, "Interest action failed", $e->getMessage());
}