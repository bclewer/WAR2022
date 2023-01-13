

function GetPlayersTableData(){
	
	$.ajax({
	    url: "../../WAR2022/Players/playerstable.inc.php",
	    type: "GET",
	    dataType: "json",
	    success: function(data) {
	  	    FillPlayersTable(data)
		},
		error: function(data){
			   //alert("ERROR");
		}
	});
		
}

var votingbuttonhtml = `<button type="button" class="sportingbtn" onclick="addSporting(this)">+1 Sporting</button>
							<button type="button" class="paintedbtn" onclick="addPainted(this)">+1 Painted</button>`;

function FillPlayersTable(data){
	
	var table = document.querySelector("#PlayersTable > table > tbody");
	
	for (i = 0; i < data.length ; i++){
		
		var newRow = table.insertRow();
		var Cellparam = newRow.insertCell();
		var newText = document.createTextNode(data[i].Name);
		Cellparam.appendChild(newText);
		Cellparam = newRow.insertCell();
		newText = document.createTextNode(data[i].Good_Army);
		Cellparam.appendChild(newText);
		Cellparam = newRow.insertCell();
		newText = document.createTextNode(data[i].Evil_Army);
		Cellparam.appendChild(newText);
		var votingfield = newRow.insertCell();
		votingfield.innerHTML = votingbuttonhtml;

	}
}

function addSporting(thisbtn){
	
	var $row = $(thisbtn).closest("tr"),
	$tds = $row.find("td"); 
	var player = $tds[0].innerText;
	
	$.ajax({
	    url: "../../WAR2022/Players/sportingvote.inc.php",
	    type: "GET",
		data: {"Player":player},
	    dataType: "json",
	    success: function() {
			
		},
		error: function(){
			
		}
	});	
}

function addPainted(thisbtn){
	
	var $row = $(thisbtn).closest("tr"),
	$tds = $row.find("td"); 
	var player = $tds[0].innerText;
	
	$.ajax({
	    url: "../../WAR2022/Players/paintedvote.inc.php",
	    type: "GET",
		data: {"Player":player},
	    dataType: "json",
	    success: function() {
			
		},
		error: function(){
			
		}
	});	
}





function displayFactions(){
	
	$.ajax({
	    url: "../../WAR2022/Players/playerstable.inc.php",
	    type: "GET",
	    dataType: "json",
	    success: function(data) {
	  	    displayListTypes(data)
		},
		error: function(data){
			   alert("ERROR");
		}
	});
			
}

function generateGoodGraph(data){
	
	
	
	
	
}

function displayListTypes(data){
	
	var LLs = 0;
	var SingleLists = 0;
	var alliances = 0;
		
	for (var i = 0; i < data.length ; i++){
		
		if(data[i]['Good_Type'] === "Single"){
			SingleLists++;
		}
		if(data[i]['Evil_Type'] === "Single"){
			SingleLists++;
		}
		if(data[i]['Good_Type'] === "LL"){
			LLs++;
		}
		if(data[i]['Evil_Type'] === "LL"){
			LLs++;
		}
		if(data[i]['Good_Type'] === "Alliance"){
			alliances++;
		}
		if(data[i]['Evil_Type'] === "Alliance"){
			alliances++;
		}
		
	}
	
	const Graph = {
		labels: ['Single List','Alliance','Leg Legion'],
		datasets: [{
			data: [7,8,8],
		}]
	};
	
	
	const config = {
		type: 'bar',
		data: Graph,
		options: {
			plugins: {
				title: {
					display: true,
					text: 'List Types',
				},
			},
			scales: {
				y: {
					title: {
						display: true,
						text: 'Number'
					}
				},
			},
		},
	};
	
		
	const ListChart = new Chart(
		document.getElementById("ListTypeChart"),
		config
	);
	
}