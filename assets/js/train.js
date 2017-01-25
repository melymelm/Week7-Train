

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAA9O6hPGGpfXduxmE8j4vyTxVBou_N1DM",
    authDomain: "melissa-week7-train.firebaseapp.com",
    databaseURL: "https://melissa-week7-train.firebaseio.com",
    storageBucket: "melissa-week7-train.appspot.com",
    messagingSenderId: "482630388156"
  };
  firebase.initializeApp(config);

  //always change rules in database to "true"


//----------------------------------------------------------------
//vars

	// Create a variable to reference the database.
	var dataRef = firebase.database();

	var trainName = "";
	var destination = "";
	var firstTrainTime = "";
	var frequency = "";

//----------------------------------------------------------------
	$(document).ready(function(){
		//adding train from form
		$("#submitBtn").on("click", function(e){
			e.preventDefault();
			console.log("button clicked");

			// grabbing info from input
			trainName = $("#nameInput").val().trim();
		    destination = $("#destInput").val().trim();
		    firstTrainTime = $("#firstTrainInput").val().trim();
		    frequency = $("#freqInput").val().trim();

			//push to database
			dataRef.ref().push({
				trainName:  trainName,
				destination: destination,
				firstTrainTime: firstTrainTime,
				frequency: frequency
			});

			
			console.log("------from click function-------");
			console.log(trainName);
			console.log(destination); 
			console.log(firstTrainTime);
			console.log(frequency);
			console.log("------------------");

		
			// Clear data
			$("#nameInput").val("");
		   	$("#destInput").val("");
		    $("#firstTrainInput").val("");
		    $("#freqInput").val("");

			// Prevents moving to new page
			return false;
		});

	})

		dataRef.ref().on("child_added", function(childSnapshot) {
				//console everything
				console.log("-------child Snapshot--------")
				console.log(childSnapshot.val().trainName);
				console.log(childSnapshot.val().destination);
				console.log(childSnapshot.val().firstTrainTime);
				console.log(childSnapshot.val().frequency);
				console.log("------------------");

				var diffTimes = moment().diff(moment.unix(firstTrainTime), "minutes");
				var remainder = moment().diff(moment.unix(firstTrainTime), "minutes") % frequency ;
				var minAway = frequency - remainder;

				var arrTrain = moment().add(minAway, "m").format("hh:mm A"); 
				console.log("Minutes Away: " + minAway);
				console.log("Arrival Train: " + arrTrain);

				console.log(moment().format("hh:mm A"));
				console.log("Arrival time: " + arrTrain);
				console.log(moment().format("X"));










			//adding items to the html
			var addTrain = $("#schedule");

		    var trainData = "<tr>";
		    trainData += "<td>" + childSnapshot.val().trainName + "</td>";
		    trainData += "<td>" + childSnapshot.val().destination + "</td>";
		    trainData += "<td>" + childSnapshot.val().frequency + "</td>";
		    trainData += "<td>" + arrTrain + "</td>";
		    trainData += "<td>" + minAway + "</td>";
		    trainData += "</tr>";

		    addTrain.append(trainData);

		});








		





// Bonus (Extra Challenges)

// Consider updating your "minutes to arrival" and "next train time" text once every minute. This is significantly more challenging; only attempt this if you've completed the actual activity and committed it somewhere on GitHub for safekeeping (and maybe create a second GitHub repo).
// Try adding update and remove buttons for each train. Let the user edit the row's elements-- allow them to change a train's Name, Destination and Arrival Time (and then, by relation, minutes to arrival).
// As a final challenge, make it so that only users who log into the site with their Google or GitHub accounts can use your site. You'll need to read up on Firebase authentication for this bonus exercise.