<?php

	include "sql_connection.php";
	
	$round = intval($_GET['Round']);
	
	$playerA = $_GET['PlayerA'];
	$playerB = $_GET['PlayerB'];
	
	$factionA = $_GET['AFaction'];
	$factionB = $_GET['BFaction'];
	
	$playerAScore = intval($_GET['AScore']);
	$playerBScore = intval($_GET['BScore']);
	
	$playerATPs = getplayerTPs($playerAScore,$playerBScore);
	$playerBTPs = getplayerTPs($playerBScore,$playerAScore);
	$playerAVPDiff = $playerAScore - $playerBScore;
	$playerBVPDiff = $playerBScore - $playerAScore;
	
	$roundstr = "Round" . strval($round);
	$factionstr = "R" . strval($round) . "Faction";
		
	$sql = $conn->prepare("Update opponents SET $roundstr = ?, $factionstr = ? WHERE PlayerName = ?");
	$sql->execute([$playerB,$factionA,$playerA]);
	$sql->execute([$playerA,$factionB,$playerB]);
		
	$round_TPstr = "Round" . strval($round) ."_TPs";
	$round_VPstr = "Round" . strval($round) ."_VPs";
	$round_VPDiffstr = "Round" . strval($round) ."_VPDiff";
	
	$sql = $conn->prepare("Update scoring SET $round_TPstr = ?, $round_VPstr = ? , $round_VPDiffstr = ? WHERE PlayerName = ?");
	$sql->execute([$playerATPs,$playerAScore,$playerAVPDiff,$playerA]);
	$sql->execute([$playerBTPs,$playerBScore,$playerBVPDiff,$playerB]);
	
	//echo "COMPLETED";
	
	
	function getplayerTPs($scoreA,$scoreB){
		
		$scorediff = $scoreA - $scoreB;
		
		if($scorediff >= 7){
			return 6;}
		else if($scorediff > 0){
			return 5;}
		else if($scorediff == 0){
			return 2;}
		else if($scorediff >= -7){
			return 1;}
		else {
			return 0;}
				
	}





?>