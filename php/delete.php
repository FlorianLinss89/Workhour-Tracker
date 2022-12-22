<?php
include("connect.php");
$tableName= 'main_table';

if(isset($_POST['index'])) {

    $result=true;

    $task_index_array = $_POST['index'];  
    $entries = count($_POST['index']);

    for($i=0;$i<$entries;$i++) {

        $task_index = $task_index_array[$i];

        $removesql = "DELETE FROM ".$tableName." WHERE task_index=".$task_index;

        if($con->query($removesql) === TRUE){
           $msg="Deletion Success";
        }
   
        else{
           $msg="Deletion failed";
        }
    }
}
    
echo $msg;
?>