<?php

	include "sql_connection.php";
	$player = $_GET['Player'];
	
	echo $player;

	$sql = $conn->prepare("	UPDATE players_info
							SET Sporting_Votes = (Sporting_Votes + 1)
							WHERE Name = ? ");

	$sql->execute([$player]);
?>