<?php


	include "sql_connection.php";
	$round = intval($_GET['Round']);

	$sql = $conn->prepare("	SELECT * FROM war2022.players_info
							ORDER BY Name ASC");
	//$sql->execute([$round]);
	$sql->execute();
	$result = $sql->get_result();
	
	$temparray = array();
	
	if ($result->num_rows > 0){
		while($row = $result->fetch_assoc()) 
		{
			array_push($temparray, $row); //save your data into array
		}
		echo json_encode($temparray);
	}

?>