
$(document).ready(function(){

	$.ajax({
	//url: "https://raw.githubusercontent.com/precisememory/yuletiderequests/master/Yule2014Requests.txt",
	url: "http://precisememory.github.io/yule/Yule2014Requests.txt",
	data: {},
	success: function( data ) {
		parseData(data);
		initializePage();
	}
	});

});

//global for later use in initializePage and updatePageByRequester, updatePageByFandom
var mapRequesterToRequests = {};
var mapFandomToRequests = {};

function parseData(data){
	var dataByRequester = data.split("***"); //an array of strings, each with all data for a participant's requests
	//regular expression to parse out requester name: "Request " + n + " by " + name
	//var re = /Request \d by .+/;
	alert(dataByRequester); //debug
	for(var dbr in dataByRequester){
		var ao3username;
		var fandoms = {};
		var lines = dbr.split("\n");
		for(var i = 0; i < lines.length; i++){
			if(lines[i].startsWith("Request")){
				ao3username = lines[i].substring(lines[i].indexOf("by ") + 3);
				i++;
				var fandomName = lines[i];
				i++;
				var characters = "";
				if(!lines[i].equals("") && !lines[i].startsWith("Letter") && !lines[i].startsWith("Request")){
					characters = lines[i].split(",");
				}
				i++;
				var optionalDetails = "";
				while(!lines[i].equals("") && !lines[i].startsWith("Letter") && !lines[i].startsWith("Request")){
					optionalDetails += lines[i]
					i++;
				}
				var letter = "";
				if(lines[i].startsWith("Letter:")){
					lettter = lines[i].substring(lines[i].indexOf(": " + 2));
				}
				fandoms[fandomName] = {"characters": characters, 
										"details"  : optionalDetails,
										"letter"   : letter
										};
				
			}
		}
		//now ao3username and fandoms should be populated, so add to larger map
		mapRequesterToRequests[ao3username] = fandoms;
	}
	
	//make key of requester's name, parse out each fandom's data + place in JSON object 
	//to parse out each fandom's data:
	//"Request " + n + " by " +name
	//fandom_n_name
	//character1, character2, character3.... (comma-separated list, optional)
	//(Optional details, multiple lines, optional, until...)
	//"Letter: " link (optional)
	//blank line, non-optional, between requests
	
}

function initializePage(){
	for(var user in mapRequesterToRequests){
		alert(user);
		$("#dataTable").append("<li>" + user + "</li>");
	}
}

function updatePageByRequester(ao3username){
//sorts by typed username -- check bootstrap-select for data-live-search?
}

function updatePageByFandom(fandom){

}

/* mapRequesterToRequests:
{
	"AO3username1":{
		"fandom1name":{
			characters: [
			"character1",
			"character2",
			"character3",
			"character_n"
			],
			details: "",
			letter: "",
		}
		//repeat for other fandoms
	}
	//repeat for other requesters
}

mapFandomToRequests:
{
	"fandom1name":{
		"AO3username1":{
			characters: [
			"character1",
			"character2",
			"character3",
			"character_n"
			],
			details: "",
			letter: "",
		}
		//repeat for other requesters
	}
	//repeat for other fandoms
}

*/