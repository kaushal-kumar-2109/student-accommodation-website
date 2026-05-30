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

$database = new Database();
$conn = $database->connect();

$id = $_GET["id"] ?? null;

if (!$id) {
    sendResponse(false, "Property ID is required");
}

try {
    $stmt = $conn->prepare("
        SELECT 
            id, name, city, location, price, gender, rating, image, description
        FROM properties
        WHERE id = :id
    ");

    $stmt->execute([":id" => $id]);
    $property = $stmt->fetch();

    if (!$property) {
        sendResponse(false, "Property not found");
    }

    $imageStmt = $conn->prepare("
        SELECT image_url
        FROM property_images
        WHERE property_id = :property_id
    ");

    $imageStmt->execute([":property_id" => $id]);
    $property["gallery"] = $imageStmt->fetchAll(PDO::FETCH_COLUMN);

    $amenityStmt = $conn->prepare("
        SELECT a.name
        FROM amenities a
        INNER JOIN property_amenities pa 
        ON a.id = pa.amenity_id
        WHERE pa.property_id = :property_id
    ");

    $amenityStmt->execute([":property_id" => $id]);
    $property["amenities"] = $amenityStmt->fetchAll(PDO::FETCH_COLUMN);

    sendResponse(true, "Property details fetched successfully", $property);

} catch (PDOException $e) {
    sendResponse(false, "Failed to fetch property details", $e->getMessage());
}