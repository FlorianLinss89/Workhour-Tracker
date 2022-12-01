<?php

session_start();

include("connect.php");
$tableName = "main_table";
$username = $_SESSION['username'];
$month = date("m.Y");
$columns = ['task_position', 'task_date', 'task_start', 'task_end', 'task_project', 'task_hours'];
$sidecolumns = ['task_date', 'task_start', 'task-project', 'task_hours'];

if(isset($_GET['action']) && $_GET['action'] == 'fetch_data'){
    fetch_data($con, $tableName, $sidecolumns);
}
elseif(isset($_GET['action']) && $_GET['action'] == 'fetch_username') {
    echo giveInfo($username);
}
elseif(isset($_GET['action']) && $_GET['action'] == 'fetch_date') {
    $monthReply = $_SESSION['month'][0]." ".$_SESSION['month'][1];
    echo giveInfo($monthReply);
}

function giveInfo($info) {
    if($_SESSION){
        return $info;
    }
    return "";
}

function fetch_data($db, $main_table, $columns) {

    if(empty($db)) {
        $msg = "Database connection error";
    }
    elseif (empty($columns) || !is_array($columns)) {
        $msg ="Column names must be defined in an indexed array";
    }
    elseif(empty($main_table)) {
        $msg = "main_table name is empty";
    }

    else {
        $result = true;
        $col = implode(", ", $columns);
        $query = $db->prepare("SELECT * FROM ".$main_table." WHERE task_user = ? ORDER BY task_date");
        $query->bind_param("s", $_SESSION['username']);
        $query->execute();
        $result = $query->get_result();
        if($result == true) { 
            if ($result->num_rows > 0) {
                $row = mysqli_fetch_all($result, MYSQLI_ASSOC);
                $msg = json_encode($row);
            } 
            else {
                $msg = "No Data Found";
            }
        }
        else {
            $msg = mysqli_error($db);
            $msg = "result = false";
        }
    }
    echo $msg;
}

?>