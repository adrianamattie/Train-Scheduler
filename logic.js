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

// 2. Button for adding Trauns
$("#addTrainBtn").on("click", function (event) {
    event.preventDefault();
    // Grabs user input
    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrain = $("#trainTimeInput").val().trim();
    var frequency = $("#frequencyInput").val().trim();

    // Creates local "temporary" object for holding train data
    var newTrain = {
        "name": trainName,
        "location": destination,
        "startTime": firstTrain,
        "trainFrequency": frequency
    };

    // Uploads train data to the database
    database.ref("/trains").push(newTrain);

    // Logs everything to console
    // console.log(newTrain.name);
    // console.log(newTrain.location);
    // console.log(newTrain.startTime);
    // console.log(newTrain.trainFrequency);

    // Alert
    alert("Train successfully added");

    // Clears all of the text-boxes
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#trainTimeInput").val("");
    $("#frequencyInput").val("");
});

// 3. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
database.ref("/trains").on("child_added", function (childSnapshot, prevChildKey) {

    // console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().location;
    var firstTrain = childSnapshot.val().startTime;
    var frequency = childSnapshot.val().trainFrequency;



    // Train Info
    // console.log(trainName);
    // console.log(destination);
    console.log(firstTrain);
    // console.log(frequency);

    // Prettify the Train start
    var firstTrainPretty = moment.unix(firstTrain).format("hh:mm");
    console.log(firstTrainPretty);



    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + moment(diffTime).format("hh:mm"));


    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    nextTrain = moment(nextTrain).format("hh:mm");



    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
        frequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");
});