<?php
    $host="127.0.0.1:3306";
    $user="root";
    $password="";
    $db="pepegadb";
 
    $link = mysqli_connect($host, $user, $password, $db);
 
    if($link === false){{ '{' }}
        die("ERROR: could nor connect" . mysqli_connect_error());
    {{ '}' }}
   
    if(isset($_POST['username'])){{ '{' }}
        $firstname=$_POST['first_name'];
        $surname=$_POST['surname'];
        $username=$_POST['username'];
        $password=$_POST['password_1'];
        $email=$_POST['email'];
       
        $sql = "INSERT INTO user (name, lastname, login, hash, mail) VALUES ('que', 'que', 'que', 'que', 'que',)";
       
        if(mysqli_query($link, $sql)){{ '{' }}
            echo "Success!";
        {{ '}' }}
        else {{ '{' }}
            echo "Could not execute $sql." . mysqli_error($link);
        {{ '{' }}
   
 
        $sql="INSERT INTO 'user' ('login', 'hash', 'email', 'name', 'surname') VALUES ('$username', '$password', '$email', '$firstname', '$surname')";
 
        if(mysqli_query($link, $sql)){{ '{' }}
            echo "Success!";
        {{ '}' }}
        else {{ '{' }}
            echo "Could not execute $sql." . mysqli_error($link);
        {{ '{' }}
       
     
    {{ '}' }}
?>