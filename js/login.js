// Login logic here
function Authenticate() {
    var uname = document.getElementById("uname").value;
    var psw = document.getElementById("psw").value;

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

    //compare for password and take action
    var ref = firebase.database().ref(uname);
    ref.once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            if (childKey == "password") {
                if (childData == psw) {
                    localStorage.setItem("userName",uname); //save user-name on the local storage
                    window.location = "home.html"; // goto home page.
                    return false;
                }
            }
            console.log(childKey + " :  " + childData);
        });
    });
}

//play store opening function
function openPlayStore() {
    window.open("https://play.google.com/store", false);
}