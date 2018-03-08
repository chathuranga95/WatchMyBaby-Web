// Initialize Firebase
var config = {
    apiKey: "AIzaSyAjbvIpUvlC2KiJ4LnjLbNgZYwu_FxqU_s",
    authDomain: "watchmybaby-52d18.firebaseapp.com",
    databaseURL: "https://watchmybaby-52d18.firebaseio.com",
    projectId: "watchmybaby-52d18",
    storageBucket: "watchmybaby-52d18.appspot.com",
    messagingSenderId: "197695828620"
};
firebase.initializeApp(config);
// Get a reference to the storage service, which is used to create references in storage bucket
var storage = firebase.storage();

// Create a storage reference from storage service
var storageRef = storage.ref();

function pickFile() {
    // Check for the various File API support.
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        // Great success! All the File APIs are supported.
        console.log("Great success! All the File APIs are supported.");
    } else {
        alert('The File APIs are not fully supported in this browser.');
    }

}

//File uploading function
function uploadFile(file) {
    // Create a reference to file on storage
    var ref = storageRef.child('songs/' + file.name);
    console.log('Upload started');
    ref.put(file).then(function (snapshot) {
        console.log('Uploaded a blob or file!');
    });

    var uploadTask = storageRef.child('songs/' + file.name).put(file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', function (snapshot) {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        document.getElementById('progress').innerHTML = "Progress: " + progress
        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
        }
    }, function (error) {
        // Handle unsuccessful uploads
    }, function () {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        var downloadURL = uploadTask.snapshot.downloadURL;
        console.log("upload success..");
    });
}

//open camera
function cameraPreview() {
    // Grab elements, create settings, etc.
    var video = document.getElementById("video");

    // Get access to the camera!
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Not adding `{ audio: true }` since we only want video now
        navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
            video.src = window.URL.createObjectURL(stream);
            video.play();
        });
    }
}

//Pubnub initiate
var pubnubObj = new PubNub({
    publishKey: 'pub-c-616fc02a-063a-41cd-8185-dcf5ba936b2a',
    subscribeKey: 'sub-c-f72b3372-f5da-11e7-8098-329148162fa8'
});

// Subscribe to the channel
pubnubObj.addListener({
    message: function (message) {
        console.log("received msg: ", message)
    }
})

//make channel name
var channelName = "watchMyBaby" + localStorage.getItem("userName");

pubnubObj.subscribe({
    channels: [channelName]
});
// Publish a simple message to the channel
function publishMsg() {
    //var msg = document.getElementById('intxt').value
    console.log("new msg published :");
    pubnubObj.publish({
        message: {
            //msg
            "message": "ping from web App"
        },
        channel: channelName
    });
}

function sendCryNotification() {
    //var msg = document.getElementById('intxt').value
    console.log("new msg published :");
    pubnubObj.publish({
        message: {
            //msg
            "message": "baby cried"
        },
        channel: channelName
    });
}