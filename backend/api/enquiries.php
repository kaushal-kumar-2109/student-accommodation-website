<?php

require_once "../config/database.php";
require_once "../helpers/response.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") exit;

$database = new Database();
$conn = $database->connect();

try {
    $stmt = $conn->prepare("
        SELECT 
            e.id,
            e.name,
            e.phone,
            e.message,
            e.created_at,
            p.name AS property_name,
            p.city,
            p.location,
            u.email AS user_email
        FROM enquiries e
        INNER JOIN properties p ON e.property_id = p.id
        INNER JOIN users u ON e.user_id = u.id
        ORDER BY e.created_at DESC
    ");

    $stmt->execute();
    $enquiries = $stmt->fetchAll();

    sendResponse(true, "Enquiries fetched successfully", $enquiries);

} catch (PDOException $e) {
    sendResponse(false, "Failed to fetch enquiries", $e->getMessage());
}