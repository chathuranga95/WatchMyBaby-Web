var songAudio; //keep a global audio instance to control and avoid clashes

//Function to play a given lullaby
function playLullaby(path) {
    var songRef = storageRef.child('songs/' + path); //Reference to the file on storage

    songRef.getDownloadURL().then(function (url) { // Get the download URL
        songAudio = new Audio(url); //Create audio instance and Play
        songAudio.play();
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
    songAudio.play();
    console.log("Lullaby player: playing");
}
function stopAudioFile() {
    songAudio.pause();
    songAudio.currentTime = 0;
    console.log("Lullaby player: Stoped");
}
function pauseAudioFile() {
    songAudio.pause();
    console.log("Lullaby player: Paused");
}
