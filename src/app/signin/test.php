<?php

// db credentials
define('DB_HOST', '192.168.233.136');
define('DB_USER', 'root');
define('DB_PASS', 'password');
define('DB_NAME', 'pepegaDB');

// Connect with the database.
function connect()
{
  $connect = mysqli_connect(DB_HOST ,DB_USER ,DB_PASS ,DB_NAME);

  if (mysqli_connect_errno($connect)) {
    die("Failed to connect:" . mysqli_connect_error());
  }

  mysqli_set_charset($connect, "utf8");

  return $connect;
}

$con = connect();


$users = [];
$sql = "SELECT login, name, surname, email, hash FROM user WHERE login='test'";

if($result = mysqli_query($con,$sql))
{
	$cr = 0;
    $users[$cr]['login'] = $row['login'];
    $users[$cr]['name'] = $row['name'];
	$users[$cr]['surname'] = $row['surname'];
	$users[$cr]['email'] = $row['email'];
	$users[$cr]['hash'] = $row['hash'];

  echo json_encode(['data'=>$users]);
}
else
{
  http_response_code(404);
}