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

if (!$user_id) {
    sendResponse(false, "User ID is required");
}

$database = new Database();
$conn = $database->connect();

try {
    $stmt = $conn->prepare("
        SELECT 
            p.id,
            p.name,
            p.city,
            p.location,
            p.price,
            p.gender,
            p.rating,
            p.image,
            p.description
        FROM interested_users iu
        INNER JOIN properties p 
        ON iu.property_id = p.id
        WHERE iu.user_id = :user_id
        ORDER BY iu.created_at DESC
    ");

    $stmt->execute([
        ":user_id" => $user_id
    ]);

    $properties = $stmt->fetchAll();

    foreach ($properties as &$property) {
        $amenityStmt = $conn->prepare("
            SELECT a.name
            FROM amenities a
            INNER JOIN property_amenities pa 
            ON a.id = pa.amenity_id
            WHERE pa.property_id = :property_id
        ");

        $amenityStmt->execute([
            ":property_id" => $property["id"]
        ]);

        $property["amenities"] = $amenityStmt->fetchAll(PDO::FETCH_COLUMN);
    }

    sendResponse(true, "Shortlist fetched successfully", $properties);

} catch (PDOException $e) {
    sendResponse(false, "Failed to fetch shortlist", $e->getMessage());
}