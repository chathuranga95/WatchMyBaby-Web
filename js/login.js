// Login logic here
function validate() {

    var username = document.getElementById("uname").value;
    var password = document.getElementById("psw").value;
    if ((Authenticate(username, password))) {
        window.location = "home.html"; // goto home page.
        return false;
    }
    else {
        alert("wrong username or password");
        return false;
    }
}


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
                    localStorage.setItem("userName",uname);
                    window.location = "home.html"; // goto home page.
                    return false;
                }
            }
            console.log(childKey + " :  " + childData);
        });
    });

    // //compare for password and take action
    // var ret = firebase.database().ref(uname).once('value').then(function (snapshot) {
    //     if (snapshot.val() == psw) {
    //     window.location = "home.html"; // goto home page.
    //     }
    //     else{
    //         alert("wrong username or password");
    //     }
    // });

    // if (!ret) {
    //     alert("wrong username or password");
    // }
}

//play store opening function
function openPlayStore() {
    window.open("https://play.google.com/store", false);
}