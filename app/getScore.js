/*
This is the part of the app that SELECTs the data from the DB to get the highest score.
*/


//This is the main function of the chart, it builds both the Google and Custom charts
var getScore = function () {
	//The PHP file handling the SQL and DB interaction
	var php = "app/getScore.php";

	//The AJAX call information
	var xhr = new XMLHttpRequest();
	var formData = new FormData(); //This is for an HTML form, not used here
	var itemRaw = new Array(); //This contains the data returned from the DB

	xhr.open("POST", php, true); //Start AJAX call
	xhr.onreadystatechange = function () {
		//Check that the connection is fine and that the PHP file answers
		console.log('readyState: ' + xhr.readyState);
		console.log('status: ' + xhr.status);
		if (xhr.readyState == 4 && xhr.status == 200) {
			// Everything ok, get the data
			itemRaw = JSON.parse(xhr.responseText); //Parse the JSON from DB into array
			console.log(itemRaw); // log response

			//We only take the firs item (address 0) in the results which contains the highest score
			document.getElementById("highHandle").innerHTML = itemRaw[0].Handle;
			document.getElementById("highScore").innerHTML = itemRaw[0].Score;

			hScore = itemRaw[0].Score;//variable from game

		}
	};
	xhr.send(formData); //send AJAX call
};

getScore();