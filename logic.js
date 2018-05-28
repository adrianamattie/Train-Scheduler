// Initialize Firebase
var config = {
    apiKey: "AIzaSyDwJ4fHHGG1To1blV2Z96CRuWVXu1rFKBE",
    authDomain: "my-awesome-project-669b9.firebaseapp.com",
    databaseURL: "https://my-awesome-project-669b9.firebaseio.com",
    projectId: "my-awesome-project-669b9",
    storageBucket: "my-awesome-project-669b9.appspot.com",
    messagingSenderId: "334163095916"
};
firebase.initializeApp(config);


// Create a variable to reference the database.
var database = firebase.database();

// 2. Button for adding Employees
$("#addTrainBtn").on("click", function (event) {
    event.preventDefault();
    // Grabs user input
    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrain = moment($("#trainTimeInput").val().trim(), "HH:mm").format("X");
    var frequency = $("#frequencyInput").val().trim();

    // Creates local "temporary" object for holding train data
    var newTrain = {
        "name": trainName,
        "location": destination,
        "startTime": firstTrain,
        "trainFrequency": frequency
    };

    // Uploads train data to the database
    database.ref("/employees").push(newTrain);

    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.location);
    console.log(newTrain.startTime);
    console.log(newTrain.trainFrequency);

    // Alert
    alert("Train successfully added");

    // Clears all of the text-boxes
    $("#trainNameInput").val("");
    $("#DestinationInput").val("");
    $("#trainTimeInput").val("");
    $("#frequencyInput").val("");
});

// 3. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().location;
    var firstTrain = childSnapshot.val().startTime;
    var frequency = childSnapshot.val().trainFrequency;



    // Train Info
    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);

    // Prettify the Train start
    var firstTrainPretty = moment.unix(firstTrain).format("HH:mm");

    TODO = "Math to do";

    // Calculate the months worked using hardcore math
    // To calculate the months worked
    // var empMonths = moment().diff(moment(empStart, "X"), "months");
    // console.log(empMonths);

    // Calculate the total billed rate
    // var empBilled = empMonths * empRate;
    // console.log(empBilled);

    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
        firstTrainPretty + "</td><td>" + frequency + "</td><td>" + TODO +  "</td></tr>");
});