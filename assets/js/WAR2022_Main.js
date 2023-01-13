
var playernum;
var tabletotal;


$( document ).ready(function() {
	
	var test = document.getElementById("test");
	let pagetype = DetermindPageType();
	
	if(pagetype === "Rounds"){
		
		getPlayerNumbers();

		tabletotal = Math.ceil(playernum/2);
		test.innerHTML = playernum + " " + tabletotal;
		
		getPlayerRankingData();
		getDraw();
        
	}
	if (pagetype == "Players"){
		
		var subpage = DetermindSubPage();
		
		if(subpage == "Players"){
		
			console.log("PLAYERS PAGE");
			GetPlayersTableData();
		
		}
	
		if (subpage == "List"){
			
			console.log("LIST PAGE");
			displayFactions();
			
		}
	}
	
});

function DetermindPageType(){
	
	var URL = window.location.href;
	URL = URL.split('.')[0];
	return URL.split('/')[4];
}

function DetermindSubPage(){
	
	var URL = window.location.href;
	URL = URL.split('.')[0];
	URL = URL.split('/')[5];
	return URL.split('_')[0];
	
}