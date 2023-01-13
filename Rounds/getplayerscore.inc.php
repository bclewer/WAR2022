<?php

	include "sql_connection.php";
	
	$player = $_GET['Player'];

	$sql = $conn->prepare("SELECT * FROM scoring WHERE PlayerName = ?");
	$sql->execute([$player]);
	$result = $sql->get_result();
	
	$temparray = array();
	
	if ($result->num_rows > 0){
		while($row = $result->fetch_assoc()) 
		{
			array_push($temparray, $row); //save your data into array
		}
		echo json_encode($temparray);
	}