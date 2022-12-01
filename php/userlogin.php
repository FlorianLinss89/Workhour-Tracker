<?php

session_start();

include("connect.php");
$tableName = "userbase";
$columns = ['user_name','user_password'];
$responseStatus = '200 OK';
$responseText = 'nothing';

if(!isset($_POST['username'])) {
   http_response_code(400);
   $responseText = 'Anfrage enthält keinen Nutzernamen';
} else {
   $validatePattern = '/^[a-z0-9]{4,20}$/';
   if(!preg_match($validatePattern,$_POST['username'])) {
      http_response_code(400);
      $responseText = 'Nutzername entspricht nicht den Vorgaben. Der Benutzername muss aus kleinen Buchstaben(a-z) und/oder Ziffern(0-9) bestehen und 4-20 Zeichen lang sein';
   } else loginAttempt($_POST, $con, $tableName, $columns);
}

function loginAttempt($data, $db, $table, $col) {

   $result = true;
   $col = implode(", ", $col);
   $query = $db->prepare("SELECT * FROM ".$table." WHERE user_name = ?");
   $query->bind_param("s", $_POST['username']);
   $query->execute();
   $result = $query->get_result();
   $success = false;
   if($result == true) { 
      $pswrd = mysqli_fetch_all($result, MYSQLI_ASSOC);
      $responseText = "result true";
      $success = loginCheck($pswrd);
   }
   else {
      $responseText = $responseText.'Nutzername nicht gefunden'; 
   }

   if(!$success) {
      //http_response_code(409);
      $responseText = $responseText.' Nutzername und Passwort stimmen nicht überein';
   }
   else {
      $_SESSION['username'] = $_POST['username'];
      $responseText = $responseText.'Login Success';
      $responseStatus = '204 No Content';
   }
   echo $responseText;
}

function loginCheck($data) {
   foreach($data as $subarray) {
      if(in_array($_POST['password'],$subarray)) return true;
   }
   return false;
}