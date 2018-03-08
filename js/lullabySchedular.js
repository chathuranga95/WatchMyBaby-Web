var userName = localStorage.getItem("userName");

var ref = firebase.database().ref(userName + "/settings/fileList");
ref.once('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        //assign song here
        console.log(childKey + " :  " + childData);
    });
});



// Create a reference to the file to download(and play)
var songRef = storageRef.child('songs/newfile.mp3');

// Get the download URL
songRef.getDownloadURL().then(function (url) {
    //Play the audio file
    songAudio = new Audio(url);
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
