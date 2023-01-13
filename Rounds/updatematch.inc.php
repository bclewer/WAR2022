<?php	
	
	include "sql_connection.php";
	
	$playerA = $_GET['PlayerA'];
	$playerB = $_GET['PlayerB'];
	$matchid = intval($_GET['MatchID']);
	
	$sql = $conn->prepare("SELECT * FROM war2022.players_info WHERE Name = ? ");
	$sql->execute([$playerA]);
	$result = $sql->get_result();
	
	$playerA_details = $result->fetch_assoc();

	
	$sql = $conn->prepare("SELECT * FROM war2022.players_info WHERE Name = ? ");
	$sql->execute([$playerB]);
	$result = $sql->get_result();
	
	$playerB_details = $result->fetch_assoc();
	echo $playerB_details["idPlayers"];

	
	
	$sql = $conn->prepare("UPDATE matches SET PlayerA_id = ? , PlayerB_id = ?  WHERE idMatches = ?");
	$sql->execute([intval($playerA_details["idPlayers"]),intval($playerB_details["idPlayers"]),$matchid]);
	
	
	
?>