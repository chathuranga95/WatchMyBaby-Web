var songAudio; //keep a global audio instance to control and avoid clashes
var isPlaying = false;

//Function to play a given lullaby
function playLullaby(path) {
    var songRef = storageRef.child(localStorage.getItem("userName")+'/songs/' + path); //Reference to the file on storage

    songRef.getDownloadURL().then(function (url) { // Get the download URL
        songAudio = new Audio(url); //Create audio instance and Play
        playAudioFile();

        //add on ended event listener
        songAudio.onended = function () {
            console.log("lullaby is finished...");
            isPlaying = false;
        };
    }).catch(function (error) {
        switch (error.code) {
            case 'storage/object_not_found':
                // File doesn't exist
                break;
            case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;
            case 'storage/canceled':
                // User canceled the upload
                break;
            case 'storage/unknown':
                // Unknown error occurred, inspect the server response
                break;
        }
    });
}

//Main page Play, Pause, Stop Functionalities
function playAudioFile() {
    if (!getInCallStatus()) {
        songAudio.play();
        console.log("Lullaby player: playing");
        isPlaying = true;
    }
    else {
        console.log("Lullaby player: In call, lullaby playing skipped");
    }
}



function stopAudioFile() {
    songAudio.pause();
    songAudio.currentTime = 0;
    console.log("Lullaby player: Stoped");
    isPlaying = false;
}
function pauseAudioFile() {
    songAudio.pause();
    console.log("Lullaby player: Paused");
    isPlaying = false;
}

function getPlayingStatus() {
    return isPlaying;
}