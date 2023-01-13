<?php

	include "sql_connection.php";
	$player = $_GET['Player'];

	$sql = $conn->prepare("	UPDATE players_info
							SET Painted_Votes = (Painted_Votes + 1)
							WHERE Name = ? ");

	$sql->execute([$player]);
?>