
function getPlayerRankingData(){
	
	var Round = getRound();
	
	//test.innerHTML = Round;
	
	$.ajax({
	    url: "../../WAR2022/Rounds/player_scores.inc.php",
		data: {"Round":Round},
	    type: "GET",
	    dataType: "json",
	    success: function(data) {
	  	    FillRankingsTable(data)
			},
		error: function(data){
			   //alert("ERROR");
			}
	});
		
}

function FillRankingsTable(data){
	
	var table = document.querySelector("#RankingTable > table > tbody");
	
	//test.innerHTML = data;
	
	for (i = 0; i < data.length ; i++){
		
		var newRow = table.insertRow();
		
		newRow.insertCell().appendChild(document.createTextNode(i+1));
		newRow.insertCell().appendChild(document.createTextNode(data[i].PlayerName));
		newRow.insertCell().appendChild(document.createTextNode(data[i].Good_Army));
		newRow.insertCell().appendChild(document.createTextNode(data[i].Evil_Army));
		//newRow.insertCell().appendChild(document.createTextNode("W"));
		//newRow.insertCell().appendChild(document.createTextNode("D"));
		//newRow.insertCell().appendChild(document.createTextNode("L"));
		newRow.insertCell().appendChild(document.createTextNode(data[i].TotalTPs));
		newRow.insertCell().appendChild(document.createTextNode(data[i].TotalVPs));
		newRow.insertCell().appendChild(document.createTextNode(data[i].TotalVPDiff));

		
	}
	
	
		
}