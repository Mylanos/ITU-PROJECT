<?php 
 
$host="192.168.100.44:3307";
$user="root";
$password="password";
$db="pepegaDB";
 
$link = mysqli_connect($host,$user,$password,$db);
 
if(isset($_POST['username'])){
    
    $uname=$_POST['username'];
    $password=$_POST['password_1'];
    
    $sql="SELECT * from user where login='".$uname."'AND hash='".$password."' limit 1";
    
    $result=mysqli_query($link,$sql);
    $count = mysqli_num_rows($result);

    if($count==1){
        echo " You Have Successfully Logged in";
        header('Location: localhost:4200/domain');
    }
    else{
        echo = "Your Login Name or Password is invalid";
    }
        
}
?>