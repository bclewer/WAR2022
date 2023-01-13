

function getRound(){
	
	var URL = window.location.href;
	return URL.split('.')[0].slice(-1);
}

function getDraw(){
	
	round = getRound();
	
	//test.innerHTML = "LOADING!";
	
	$.ajax({
	    url: "../../WAR2022/Rounds/getdraw.inc.php",
	    type: "GET",
		data: {"Round":round},
	    dataType: "json",
	    success: function(data) {
	  	    fillDrawTable(data)
			},
		error: function(data){
			   alert("EMPTY DRAW ERROR");
			}
	});
	
}


function fillDrawTable(data){
	
	var table = document.querySelector("#DrawTable > table > tbody");
	
	
	for (i=0;i<tabletotal;i++){
		
		var newRow = table.insertRow();
		if(data[i].TableNum != null){
			newRow.insertCell().appendChild(document.createTextNode(data[i].TableNum));
		}
		else{
			var editfield = newRow.insertCell();
			editfield.innerHTML = `<blockquote contenteditable="true"> 
									<p class="tablenum">0</p> 
								</blockquote>`;
		}
		newRow.insertCell().appendChild(document.createTextNode(data[i].NAME_A));
		newRow.insertCell().appendChild(document.createTextNode(data[i].PlayerA_Faction));
		if(data[i].PlayerA_Faction == "Good"){
			newRow.insertCell().appendChild(document.createTextNode(data[i].A_GOOD));
		}
		else{
			newRow.insertCell().appendChild(document.createTextNode(data[i].A_EVIL));
		}
		newRow.insertCell().appendChild(document.createTextNode(data[i].NAME_B));
		newRow.insertCell().appendChild(document.createTextNode(data[i].PlayerB_Faction));
		if(data[i].PlayerB_Faction == "Good"){
			newRow.insertCell().appendChild(document.createTextNode(data[i].B_GOOD));
		}
		else{
			newRow.insertCell().appendChild(document.createTextNode(data[i].B_EVIL));
		}
		
		addDrawScoresActions(newRow, data[i].A_VPS ,data[i].B_VPS);
		
		newRow.insertCell().appendChild(document.createTextNode(data[i].idMatches));
	
	}
}

function GetAllPlayers(){
	
	$.ajax({
	    url: "../../WAR2022/Rounds/getallplayers.inc.php",
	    type: "GET",
	    dataType: "json",
	    success: function(data) {
	  	    DrawRoundOne(data)
			},
		error: function(data){
			   //alert("ERROR");
			}
	});
}

function DrawRound(){
	
    round = getRound();
	
	if(round == 1){
		GetAllPlayers();
	}
	else if(round == 2 || round == 4 || round == 6){
		DrawEvenRound(round);
	}
	else if(round == 3 || round == 5){
		DrawOddRound(round);
	}
}

var editbuttonhtml = `<button type="button" class="savescore" onclick="saveScore(this)">Save</button>
							<button type="button" class="changeplayers" onclick="changePlayers(this)">Change Players</button>`;

function addDrawScoresActions(row,ScoreA,ScoreB){
	
	var playerAdata;
	var playerBdata;
	
	var round = getRound();
	
	const roundstr = "Round"+String(round)+"_VPs"; //Round1_VPs

	var editfield = row.insertCell();
	editfield.innerHTML = `<blockquote contenteditable="true"> 
									<p class="player1score">`+ScoreA+`</p> 
								</blockquote>`;
	
		
	editfield = row.insertCell();
	editfield.innerHTML = `<blockquote contenteditable="true"> 
									<p class="player1score">`+ScoreB+`</p> 
								</blockquote>`;
	

								
	editfield = row.insertCell();
	editfield.innerHTML =  editbuttonhtml;
}





function DrawRoundOne(data){
	
	var table = document.querySelector("#DrawTable > table > tbody");
			
	while(data.length > 0){
		
		const random = Math.floor(Math.random() * data.length);
		
		var player1 = data.splice(Math.floor(Math.random()*data.length),1)[0];
		var player2 = data.splice(Math.floor(Math.random()*data.length),1)[0];
		
		
		
		var newRow = table.insertRow();
		var editfield = newRow.insertCell();
		editfield.innerHTML = `<blockquote contenteditable="true"> 
									<p class="tablenum">0</p> 
								</blockquote>`;
		newRow.insertCell().appendChild(document.createTextNode(player1.Name));
		newRow.insertCell().appendChild(document.createTextNode("Good"));
		newRow.insertCell().appendChild(document.createTextNode(player1.Good_Army));
		newRow.insertCell().appendChild(document.createTextNode(player2.Name));
		newRow.insertCell().appendChild(document.createTextNode("Evil"));
		newRow.insertCell().appendChild(document.createTextNode(player2.Evil_Army));
		
		test.innerHTML = player1.Name + " " + player2.Name;
		
		addDrawScoresActions(newRow,null,null);
							   
		var matchid = insertIntoMatches(player1.idPlayers,"Good",player2.idPlayers,"Evil", 1);
		
		newRow.insertCell().appendChild(document.createTextNode(matchid));
		
		
	}
}

function DrawEvenRound(round){
	
	$.ajax({
	    url: "../../WAR2022/Rounds/getevenrankings.inc.php",
		data: {"Round":round},
	    type: "GET",
	    dataType: "json",
		//async: false,
	    success: function(data) {
			
			const middle = Math.ceil(data.length / 2); // if it's odd, it'll round up
			
			console.log(middle);
			console.log(tabletotal/2);
			
			var GoodPlayers = data.slice(0, middle);
			var EvilPlayers = data.slice(middle, data.length);
			
			console.log(EvilPlayers[0],EvilPlayers[1]);
						
			var rematches = 0;
			var i;
			
			for(i=0;i<tabletotal/2;i++){
				
				var j = 0;
				if(round == 6 && i <= 5){
					console.log("Trigger");
				}
				else{
					var check = checkopponents(EvilPlayers[0],GoodPlayers[j].PlayerName);
					
					if(check == true){				
						rematches++; }
					
					while (check != false){	
						j++;
						check = checkopponents(EvilPlayers[0],GoodPlayers[j].PlayerName);
					}
				}
				console.log(i,EvilPlayers[0].PlayerName,"Good",GoodPlayers[j].PlayerName,"Evil");
				insertIntoMatches(EvilPlayers[0].idPlayers,"Good",GoodPlayers[j].idPlayers,"Evil", round);
				GoodPlayers.splice(j,1); 
				EvilPlayers.splice(0,1); 
				console.log(j);
				
			}
			
			var DrawPart2 = [[],[]];
			
			//for(i=50;i>25;i--){
			while(EvilPlayers.length > 0 && GoodPlayers.length > 0){
				
				var j = GoodPlayers.length - 1;
				var check = checkopponents(EvilPlayers[EvilPlayers.length - 1],GoodPlayers[j].PlayerName);
				
				if(check == true){				
					rematches++; }
				
				while (check != false){	
					j--;
					check = checkopponents(EvilPlayers[EvilPlayers.length - 1],GoodPlayers[j].PlayerName);
				}
				
				DrawPart2.unshift([EvilPlayers[EvilPlayers.length - 1].idPlayers,"Good",GoodPlayers[j].idPlayers,"Evil", round]);
				
				GoodPlayers.splice(j,1); 
				EvilPlayers.splice(EvilPlayers.length - 1,1); 
				
			}
			
			//test.innerHTML = test.innerHTML +  GoodPlayers[0].PlayerName + "VS" + EvilPlayers[0].PlayerName;
			//for(var i = 0; i < tabletotal/2 ; i++){
			for(var i = 0; i < tabletotal/2 ; i++){		
				console.log(i,DrawPart2[i][0],DrawPart2[i][1],DrawPart2[i][2],DrawPart2[i][3], DrawPart2[i][4]);			
				insertIntoMatches(DrawPart2[i][0],DrawPart2[i][1],DrawPart2[i][2],DrawPart2[i][3], DrawPart2[i][4]);	
			}
			
			test.innerHTML = "REMATCHES: " + rematches;
			getDraw();
			
			},
		error: function(data){
			   //alert("ERROR");
		}
	});
}

function DrawOddRound(round){
	
	$.ajax({
	    url: "../../WAR2022/Rounds/getoddrankings.inc.php",
		data: {"Round":round},
	    type: "GET",
	    dataType: "json",
	    success: function(data) {
					
			var rematches = 0;
			var i;
			
			var middle = Math.ceil((tabletotal/2));
	
			for(i=0;i<middle;i++){
				
				PlayerA = data[0];
				data.shift(); 
				
				var j = 0;
				var check = checkopponents(PlayerA,data[j].PlayerName);
				
				if(check == true){				
					rematches++; }
				
				while (check != false){	
					j++;
					check = checkopponents(PlayerA,data[j].PlayerName);
				}
				
				insertIntoMatches(PlayerA.idPlayers,"Good",data[j].idPlayers,"Evil", round);
				data.splice(j,1); 
				
			}
			
			if(middle % 2 != 0) {
			middle--;}
			
			var DrawPart2 = [[],[]];
			
			for(i=tabletotal;i>middle;i--){
				
				PlayerA = data[data.length - 1];
				data.pop(); 
				
				var j = data.length - 1;
				test.innerHTML = j;
				var check = checkopponents(PlayerA,data[j].PlayerName);
				
				if(check == true){				
					rematches++; }
				
				while (check != false){	
					j--;
					check = checkopponents(PlayerA,data[j].PlayerName);
				}
				
				DrawPart2.unshift([PlayerA.idPlayers,"Good",data[j].idPlayers,"Evil", round]);
				
				data.splice(j,1); 
				
			}
	
			test.innerHTML = "REMATCHES: " + rematches;
			
			for(var i = 0; i < tabletotal/2 ; i++){				
				insertIntoMatches(DrawPart2[i][0],DrawPart2[i][1],DrawPart2[i][2],DrawPart2[i][3], DrawPart2[i][4]);	
			}
			
			getDraw();
			
		},
		error: function(data){
			   //alert("ERROR");
		}
	});
	
	
}

function checkopponents(PlayerA,PlayerB){
		
	let text = JSON.stringify(PlayerA);	
	return text.includes(PlayerB);
}


function drawTableNumbers(){
	
	var table = document.getElementById('DrawTable'); 
	var firstCells = table.querySelectorAll('td:first-child');
	var lastCells = table.querySelectorAll('td:last-child');
	
	var cellValues = [];
	firstCells.forEach(function(singleCell) {
		cellValues.push(parseInt(singleCell.innerText));
	});
	
	var tablenums = [];
	
	// ADD Table numbers from 1 to 50, missing out pre-assigned tables
	
	for (var i = 1; i <= tabletotal; i++) {
		
		if(cellValues.includes(i) == false){
			tablenums.push(i);
		}
	}
	
	// Draw Random Table numbers and delete from array till none left
	
	firstCells.forEach(function(singleCell) {
		if(singleCell.innerText == '0' || singleCell.innerText == 'null'){
			const random = Math.floor(Math.random() * tablenums.length);
			var assignedtable = tablenums.splice(Math.floor(Math.random()*tablenums.length),1)[0];
			singleCell.innerText = assignedtable;
		}
	});
	
	
	for (var i = 0; i < tabletotal; i++){
		
		var matchid = lastCells[i].innerText;
		var tablenum = firstCells[i].innerText;
		
		updateTableInDraw(matchid,tablenum);
	}	
}

function insertIntoMatches(player1, p1faction, player2, p2faction, round){
	
	var matchid = 0;
	
	$.ajax({
	    url: "../../WAR2022/Rounds/insertintomatches.inc.php",
	    type: "GET",
	    dataType: "json",
		async: false,  
		data: {"P1ID":player1,"P1FACT":p1faction,"P2ID":player2,"P2FACT":p2faction,"Round":round},
	    success: function(data) {
				matchid = data;
			},
		error: function(data){
			   //alert("ERROR");
			}
	});
	
	return matchid;
}

function updateTableInDraw(matchid,tablenum){
	
	$.ajax({
	    url: "../../WAR2022/Rounds/updatetablenums.inc.php",
	    type: "GET",
		data:{"MatchID":matchid,"Table":tablenum},
	    dataType: "json",
	    success: function(data) {
	  	    //DrawRoundOne(data)
			},
		error: function(data){
			   //alert("ERROR");
			}
	});
}


function changePlayers(thisbtn){
	
	round = getRound();
	
	var playerlist = 0;
	
	$.ajax({
	    url: "../../WAR2022/Rounds/playerdropdown.inc.php",
	    type: "GET",
		data: {"Round":round},
	    dataType: "json",
	    success: function(data) {
			
			
			var $row = $(thisbtn).closest("tr"),
			$tds = $row.find("td"); 
			
			playerlist = buildPlayersDropdown(round,data);
			
			var existing_playerA = $tds[1].innerText;
			var existing_playerB = $tds[4].innerText;
			var matchid = $tds[10].innerText;
			
			//playerlist = buildPlayersDropdown(round,data,matchid,"A");
			$tds[1].innerHTML = playerlist;
			//playerlist = buildPlayersDropdown(round,data,matchid,"B");
			$tds[4].innerHTML = playerlist;
			
			var cell = $row.find(':nth-child(2)');
			var selectObject = cell.find("select");
			selectObject.val(existing_playerA).change();
			
			cell = $row.find(':nth-child(5)');
			selectObject = cell.find("select");
			selectObject.val(existing_playerB).change();
			
			thisbtn.outerHTML = `<button type="button" class="acceptplayers" onclick="updatePlayers(this)">Accept</button>`;
			
			
			},
		error: function(data){
			   //alert("ERROR");
			}
	});
	
}

function updatePlayers(thisbtn){
			
	var $row = $(thisbtn).closest("tr");
	var	$tds = $row.find("td"); 
	
	var selectObject = $row.find(':nth-child(2)');
	var selectObjectA = selectObject.find("select");
	var playerA = selectObjectA.val();
	
	var selectObject = $row.find(':nth-child(5)');
	var selectObjectB = selectObject.find("select");
	var playerB = selectObjectB.val();
		
	var matchid = $tds[10].innerText;
	
	$.ajax({
	    url: "../../WAR2022/Rounds/updatematch.inc.php",
	    type: "GET",
		data:{"MatchID":matchid,"PlayerA":playerA,"PlayerB":playerB},
	    dataType: "json",
	    success: function(data) {
			
		},
		error: function(data){
			   alert("Match update ERROR");
		}
	});
	
	var btnfield = thisbtn.parentNode;
	btnfield.innerHTML =  editbuttonhtml;
	
	$tds[1].innerHTML = playerA;
	$tds[4].innerHTML = playerB;
				
}

function buildPlayersDropdown(round,data){
	
	var dropdownlist;	
	dropdownlist = `<select id = "playerList">`;
	
	//if(round == 1 || round  == 3 || round == 5){
		
		for(i = 0; i < data.length; i++){
			dropdownlist += `<option>` + data[i].Name + `</option>`;
			//dropdownlist += `<option>` + data[i].NAME_B + `</option>`;
		}
		
		dropdownlist += `</select>`;
		
		return dropdownlist;
	//}
	

}

function saveScore(thisbtn){
	
	var round = getRound();
	
	var $row = $(thisbtn).closest("tr");
	var	$tds = $row.find("td"); 
	
	var playerA = $tds[1].innerText;
	var playerB = $tds[4].innerText;
	
	var FactionA = $tds[2].innerText;
	var FactionB = $tds[5].innerText;
	
	var ScoreA = $tds[7].innerText;
	var ScoreB = $tds[8].innerText;
	
	test.innerHTML = playerA + " " + ScoreA + " " + FactionA + " " + playerB + " " + ScoreB + " " + FactionB;
	
	$.ajax({
	    url: "../../WAR2022/Rounds/savescore.inc.php",
	    type: "GET",
		data:{"Round":round,"PlayerA":playerA,"PlayerB":playerB,"AScore":ScoreA,"BScore":ScoreB,"AFaction":FactionA,"BFaction":FactionB},
	    dataType: "json",
	    success: function() {
			
		},
		error: function(){
			//alert("Score Save ERROR");
		}
	});
	
	
	
}

function getPlayerNumbers(){
	
	$.ajax({
	    url: "../../WAR2022/Rounds/player_numbers.inc.php",
	    type: "GET",
	    dataType: "json",
		async: false,
	    success: function(data) {
			//test.innerHTML = data;
			playernum =  parseInt(data);
		},
		error: function(){
			alert("0 Players Found");
			
		}
	});
}

function showHideAdmin(){
	
	var tbl = document.getElementById('DrawTable');
	var col = tbl.getElementsByTagName('col')[7];
	if (col.style.visibility != "collapse") {
		
		col.style.visibility = "collapse";
		tbl.getElementsByTagName('col')[8].style.visibility = "collapse";
		tbl.getElementsByTagName('col')[9].style.visibility = "collapse";
		tbl.getElementsByTagName('col')[10].style.visibility = "collapse";
		
		tbl.style.width = "620px";
		
		//col.style.width = "0px";
		//tbl.getElementsByTagName('col')[8].style.width = "0px";
		//tbl.getElementsByTagName('col')[9].style.width = "0px";
		//tbl.getElementsByTagName('col')[10].style.width = "0px";
	}
	else{
		col.style.visibility = "visible";
		tbl.getElementsByTagName('col')[8].style.visibility = "visible";
		tbl.getElementsByTagName('col')[9].style.visibility = "visible";
		tbl.getElementsByTagName('col')[10].style.visibility = "visible";
		
		tbl.style.width = "fit-content";
	
	}
	
}








