<?php

	include "sql_connection.php";

	$player1ID = intval($_GET['P1ID']);
	$player2ID = intval($_GET['P2ID']);
	$player1Fact = $_GET['P1FACT'];
	$player2Fact = $_GET['P2FACT'];
	$round = intval($_GET['Round']);
	
	//echo $player1ID;

	$sql = $conn->prepare("INSERT INTO matches (Round, PlayerA_id, PlayerA_Faction, PlayerB_id, PlayerB_Faction) VALUES (?,?,?,?,?)");
	$sql->execute([$round,$player1ID,$player1Fact,$player2ID,$player2Fact]);
	
	$last_id = $conn->insert_id;
	echo json_encode($last_id);

?>