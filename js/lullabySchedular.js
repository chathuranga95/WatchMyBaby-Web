var userName = localStorage.getItem("userName"); //retrieve logged userName

//retrieve relevant lullaby list from database.
var ref = firebase.database().ref(userName + "/settings/fileList");
ref.once('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
        var childKey = childSnapshot.key; //file name
        var childData = childSnapshot.val(); //time to play

        var mm = childData % 100; //extract minutes
        var hh = parseInt(childData / 100); //extract hours

        //check for time already expired, else schedule
        var date = new Date(); //current system Date-Time instance
        if ((date.getHours() > hh) || (date.getHours() >= hh && date.getMinutes() >= mm)) { //check time has expired
            console.log("Already timed out");
        }
        else {
            scheduleLullaby(hh, mm, childKey); //push into schedular
        }

    });
});

//Function to schedule a song for a time
function scheduleLullaby(hh, mm, song) {
    var date = new Date(); //current system Date-Time instance

    if (date.getHours() >= hh && date.getMinutes() >= mm) { //check time has expired
        console.log("Time's up" + "  playing " + song);
        playLullaby(song); //play the lullaby
        return true;
    }
    else {
        window.setTimeout(arguments.callee, 5000, hh, mm, song); // tick every 5 seconds to consume lower proirity
        console.log(hh + ":" + mm + " vs " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
    }
}