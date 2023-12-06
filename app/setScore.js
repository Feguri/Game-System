/*
This is the part that grabs the input from the user, through the form, and inserts it in the DB
*/

//Main function, called at line 50
var setScore = function () {
	//The form in the HTML
	const addForm = document.getElementById("scoreForm");

	//When the user submits the form (clicks the button)
	addForm.addEventListener('submit', function (event) {
		event.preventDefault(); //this is for JS to take over the submit

		//This is the backend file inserting in the DB
		const php = "app/setScore.php";

		//This is what we send to the server for the PHP file, the AJAX
		const xhr = new XMLHttpRequest();
		let formData = new FormData(addForm); //the form content, what the user submits

		//Connect to the PHP
		xhr.open("POST", php, true);
		xhr.onreadystatechange = function () {
			//Check that the connection is fine and that the PHP file answers
			console.log('readyState: ' + xhr.readyState);
			console.log('status: ' + xhr.status);
			if (xhr.readyState == 4 && xhr.status == 200) {
				// Everything ok, get the response 
				// We don't need the response, but wecheck for it to make sure it went well
				console.log(xhr.responseText);
				setTimeout(function() {
					window.location.reload();
				},500);
			}
		};
		xhr.send(formData); //send AJAX call

	});
};
setScore(); //init the funtion