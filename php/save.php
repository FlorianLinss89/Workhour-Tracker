<?php
include("connect.php");
$tableName= 'main_table';
$column= 'task_index';

if(isset($_POST['date'])) {

    $result=true;

    $task_index_array = $_POST['index'];
    $task_user_array = $_POST['user'];
    $task_entry_array = $_POST['entry'];
    $task_date_array = $_POST['date'];
    $task_start_array = $_POST['start'];
    $task_end_array = $_POST['end'];
    $task_project_array = $_POST['project'];
    $task_hours_array = $_POST['hours'];
  
    $entries = count($_POST['index']);

    for($i=0;$i<$entries;$i++) {

        $task_index = $task_index_array[$i];
        $task_user = $task_user_array[$i];
        $task_entry = $task_entry_array[$i];
        $converter = explode(".", $task_date_array[$i]);
        $task_date = $converter[2]."-".$converter[1]."-".$converter[0];
        $task_start = $task_start_array[$i];
        $task_end = $task_end_array[$i];
        $task_project = $task_project_array[$i];
        $task_hours = $task_hours_array[$i];

        if(empty($task_index)) {
            $insertsql = "INSERT INTO ".$tableName." (task_user, task_entry, task_date, task_start, task_end, task_project, task_hours) 
            VALUES ('$task_user', '$task_entry', '$task_date', '$task_start', '$task_end', '$task_project', '$task_hours')";

            if($con->query($insertsql) === TRUE){
               $msg="Insertion Success";
            }
       
            else{
               $msg="Insertion failed";
            }
        }
        else {
            $insertsql = "UPDATE ".$tableName." SET task_entry = '$task_entry', 
                                                    task_date = '$task_date',
                                                    task_start = '$task_start', 
                                                    task_end ='$task_end', 
                                                    task_project = '$task_project',
                                                    task_hours = '$task_hours' WHERE task_index='$task_index'";
            if($con->query($insertsql) === TRUE){
                $msg= "Databank updated";
            }

            else{
                $msg= "Databank update failure";
            }
        }
    }
}
    
echo $msg;
?>