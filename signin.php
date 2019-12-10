<?php
    $host="192.168.100.44:3307";
    $user="root";
    $password="password";
    $db="pepegaDB";

    $link = mysqli_connect($host, $user, $password, $db);

    if (mysqli_connect_errno($link)) {
    die("Failed to praise the omnissiah:" . mysqli_connect_error());
  }

    if(isset($_POST['username'])){
        $firstname=$_POST['first_name'];
        $surname=$_POST['surname'];
        $username=$_POST['username'];
        $password=$_POST['password_1'];
        $email=$_POST['email'];

        $sql = "INSERT INTO user (login, hash, email, name, surname) VALUES ('$username', '$password', '$email', '$firstname', '$surname');";

        if(mysqli_query($link, $sql)){
            echo "Praise the omnissiah and the machine spirit for this success!";
            header('Location: localhost:4200/domain');
        }
        else
        {
            echo "Could not execute $sql." . mysqli_error($link);
        }
    }
?>