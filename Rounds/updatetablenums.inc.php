<?php

	include "sql_connection.php";
	
	$table = intval($_GET['Table']);
	$matchid = intval($_GET['MatchID']);
	
	$sql = $conn->prepare("UPDATE matches SET TableNum = ? WHERE idMatches = ?");
	$sql->execute([$table,$matchid]);





?>