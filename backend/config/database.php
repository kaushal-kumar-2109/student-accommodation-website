<?php

class Database {
    private $host = "db.fxhraymsixzdsjehkrub.supabase.co";
    private $port = "5432";
    private $dbname = "postgres";
    private $username = "postgres";
    private $password = "stayfinder@123";

    public function connect() {
        try {
            $conn = new PDO(
                "pgsql:host={$this->host};port={$this->port};dbname={$this->dbname};sslmode=require",
                $this->username,
                $this->password
            );

            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

            return $conn;

        } catch (PDOException $e) {
            echo json_encode([
                "status" => false,
                "message" => "Database connection failed",
                "error" => $e->getMessage()
            ]);
            exit;
        }
    }
}