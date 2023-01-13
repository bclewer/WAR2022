<?php

	include "sql_connection.php";
	
	$round = $_GET['Round'];
	$prevround = intval($round) - 1;
	$sql = buildSQLRound($prevround);
	
		
	$result = $conn->query($sql);
	
	$temparray = array();
	
	if ($result->num_rows > 0){
		while($row = $result->fetch_assoc()) 
		{
			array_push($temparray, $row); //save your data into array
		}
		echo json_encode($temparray);
	}
	
	
	function buildSQLRound($round) {
		
		
		$sql = "SELECT scoring.PlayerName, opponents.*,players_info.idPlayers,";
		
		$sumtps = "SUM(";
		$sumvps = "SUM(";
		$sumvpdiff = "SUM(";
		
		for ($i = 1; $i <= $round; $i++){
			
			$sumtps = $sumtps . "+Round" . $i . "_TPs";
			$sumvps = $sumvps . "+Round" . $i . "_VPs";
			$sumvpdiff = $sumvpdiff . "+Round" . $i . "_VPDiff";

		}
		
		$sumtps = $sumtps . ") AS TotalTPs, ";
		$sumvps = $sumvps . ") AS TotalVPs, ";
		$sumvpdiff = $sumvpdiff . ") AS TotalVPDiff ";
		
		$sql = $sql . $sumtps . $sumvps . $sumvpdiff;
		
		$sql = $sql .  "From scoring
						LEFT JOIN opponents ON scoring.PlayerName = opponents.PlayerName
						LEFT JOIN players_info ON scoring.PlayerName = players_info.Name
						GROUP By scoring.PlayerName
						ORDER BY TotalTPS DESC, TotalVPS DESC, TotalVPDiff DESC";
						
		return $sql;
		
	}
	
	
	
	
	
	
	
	
?>