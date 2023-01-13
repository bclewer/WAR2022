<?php


	include "sql_connection.php";
	$round = intval($_GET['Round']);
	
	//$round_TPstr = "Round" . strval($round) ."_TPs";
	$round_VPstr = "Round" . strval($round) ."_VPs";
	//$round_VPDiffstr = "Round" . strval($round) ."_VPDiff";
	
	$sql = $conn->prepare("	SELECT matches.*, A.name AS NAME_A, B.name AS NAME_B,
								A.Good_Army AS A_GOOD, A.Evil_Army AS A_EVIL,
								B.Good_Army AS B_GOOD, B.Evil_Army AS B_EVIL,
								ASCORE.$round_VPstr AS A_VPS, BSCORE.$round_VPstr AS B_VPS
								FROM matches
								LEFT JOIN players_info AS A ON A.idPlayers = matches.PlayerA_id
								LEFT JOIN players_info AS B ON B.idPlayers = matches.PlayerB_id
								LEFT JOIN scoring AS ASCORE ON A.Name = ASCORE.PlayerName
								LEFT JOIN scoring AS BSCORE ON B.Name = BSCORE.PlayerName
								WHERE Round = $round");
	
	
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