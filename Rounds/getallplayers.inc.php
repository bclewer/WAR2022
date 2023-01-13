<?php

	include "sql_connection.php";
	
	$sql = "SELECT * FROM players_info";
	
	$result = $conn->query($sql);
	
	$temparray = array();
	
	if ($result->num_rows > 0){
		while($row = $result->fetch_assoc()) 
		{
			array_push($temparray, $row); //save your data into array
		}
		echo json_encode($temparray);
	}






?>