<?php

	include "sql_connection.php";
	
	$round = $_GET['Round'];
	
	$sql = buildSQLRound($round);
	
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
		
		$sql = "SELECT PlayerName,Player.Good_Army,Player.Evil_Army,";
		
		$sumtps = "SUM(";
		$sumvps = "SUM(";
		$sumvpdiff = "SUM(";
		
		$sql = $sql . "Round1_TPs,Round1_VPs,Round1_VPDiff,";
		
		for ($i = 1; $i <= $round; $i++){
			
			$sql = $sql . "Round" . $i . "_TPs,Round" . $i . "_VPs,Round" . $i . "_VPDiff,";
			$sumtps = $sumtps . "+Round" . $i . "_TPs";
			$sumvps = $sumvps . "+Round" . $i . "_VPs";
			$sumvpdiff = $sumvpdiff . "+Round" . $i . "_VPDiff";

		}
				
		$sumtps = $sumtps . ") AS TotalTPs, ";
		$sumvps = $sumvps . ") AS TotalVPs, ";
		$sumvpdiff = $sumvpdiff . ") AS TotalVPDiff ";
		
		$sql = $sql . $sumtps . $sumvps . $sumvpdiff ."From scoring
		LEFT Join players_info As Player on scoring.PlayerName = Player.Name GROUP BY PlayerName ORDER BY TotalTPs DESC,TotalVPs DESC,TotalVPDiff DESC";
		
		//echo $sql;
		
		return $sql;
		
	}

?>