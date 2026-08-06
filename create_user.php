<?php
    require_once 'config.php';
    $username = 'Gundam_Meister';
    $plain_password = 'X20A-KnightJustice';
    $hashed = password_hash($plain_password, PASSWORD_DEFAULT);
    $stmt = $conn->prepare("INSERT INTO users (username, password_hash) VALUES (?, ?)");
    $stmt->bind_param("ss",$username,$hashed);
    if($stmt->execute()) echo "User Created";
    else echo "Error:" .$stmt->error;
    $stmt->close();
    $conn->close();
?>