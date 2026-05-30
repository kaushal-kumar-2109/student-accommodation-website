<?php

require_once "../config/database.php";
require_once "../helpers/response.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}

$database = new Database();
$conn = $database->connect();

$city = $_GET["city"] ?? "";
$budget = $_GET["budget"] ?? "";
$gender = $_GET["gender"] ?? "";

try {
    $query = "
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
        FROM properties p
        WHERE 1 = 1
    ";

    $params = [];

    if (!empty($city)) {
        $query .= " AND p.city = :city";
        $params[":city"] = $city;
    }

    if (!empty($budget)) {
        $query .= " AND p.price <= :budget";
        $params[":budget"] = $budget;
    }

    if (!empty($gender)) {
        $query .= " AND p.gender = :gender";
        $params[":gender"] = $gender;
    }

    $query .= " ORDER BY p.id DESC";

    $stmt = $conn->prepare($query);
    $stmt->execute($params);

    $properties = $stmt->fetchAll(PDO::FETCH_ASSOC);

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

    sendResponse(true, "Properties fetched successfully", $properties);

} catch (PDOException $e) {
    sendResponse(false, "Failed to fetch properties", $e->getMessage());
}