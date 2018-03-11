// Login logic here
function Authenticate() {
    var uname = document.getElementById("uname").value;
    var psw = document.getElementById("psw").value;

    var ps = new ProductCipher();
    var enctxt = ps.Encrypt("watch my baby username " + uname, psw);
    console.log("Encrypted text: " + enctxt);

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
                if (childData == enctxt) {
                    localStorage.setItem("userName", uname); //save user-name on the local storage
                    window.location = "home.html"; // goto home page.
                    return false;
                }
                else{
                    alert("Username or password incorrect, please try again!");
                }
            }
            console.log(childKey + " :  " + childData);
        });
        if(snapshot==null){
            alert("Username or password incorrect, please try again!");
        }
    });

    
}

//play store opening function
function openPlayStore() {
    window.open("https://play.google.com/store", false);
}


//Class for Product Cipher Encryption
var ProductCipher = (function () {
    function ProductCipher() {
    }
    /*private*/ ProductCipher.prototype.shift = function (text, key) {
        var s = 0;
        var letterInt = 0;
        var shiftingFactor;
        var outStr = "";
        var arr = (text).split('');
        var keyArr = (key).split('');
        for (var index5165 = 0; index5165 < keyArr.length; index5165++) {
            var letter = keyArr[index5165];
            {
                letterInt = (letter).charCodeAt(0);
                s = s + letterInt;
            }
        }
        shiftingFactor = s % 25 + 1;
        for (var i = 0; i < arr.length; i++) {
            var newVal = (arr[i]).charCodeAt(0) + shiftingFactor;
            outStr += String.fromCharCode(newVal);
        };

        return outStr;
    };
    /*private*/ ProductCipher.prototype.permute = function (text, key) {
        var keyArr = (key).split('');
        var keyLetters = ([]);
        for (var index5166 = 0; index5166 < keyArr.length; index5166++) {
            var letter = keyArr[index5166];
            {
                if (!(keyLetters.indexOf((letter)) >= 0)) {
                    /* add */ (keyLetters.push(letter) > 0);
                }
            }
        }
        var keyLetterSetObj = keyLetters.slice(0);
        var keyLetterSet = new Array(keyLetterSetObj.length);
        for (var i = 0; i < keyLetterSet.length; i++) {
            keyLetterSet[i] = String.fromCharCode(keyLetterSetObj[i]);
        };

        var sampleSize = keyLetterSet.length;
        var sortedKeyLetterSet = new Array(sampleSize);
        for (var i = 0; i < sampleSize; i++) {
            sortedKeyLetterSet[i] = keyLetterSet[i];
        };

        sortedKeyLetterSet.sort();   //sort sortedKeyLetterSet array

        var shuffleMap = (function (s) {
            var a = []; while (s-- > 0)
                a.push(0); return a;
        })(sampleSize);
        for (var j = 0; j < sampleSize; j++) {
            var letter = sortedKeyLetterSet[j];
            for (var i = 0; i < sampleSize; i++) {
                if ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(keyLetterSet[i]) == (function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(letter)) {
                    shuffleMap[j] = i;
                    break;
                }
            };

        };

        if (text.length % sampleSize > 0) {
            for (var i = 0; i < text.length % sampleSize; i++) {
                text = text + '_';
            };

        }
        var textArr = (text).split('');
        var numOfSamples = (textArr.length / sampleSize | 0);
        var sampleId = 0;
        var shuffledText = new Array(textArr.length);
        for (var i = 0; i < numOfSamples; i++) {
            for (var j = 0; j < shuffleMap.length; j++) {
                shuffledText[sampleId * sampleSize + j] = textArr[sampleId * sampleSize + shuffleMap[j]];
            };

            sampleId++;
        };

        var shuffledStr = "";
        for (var index5167 = 0; index5167 < shuffledText.length; index5167++) {
            var letter = shuffledText[index5167];
            {
                shuffledStr += letter;
            }
        }
        return shuffledStr;
    };
    ProductCipher.prototype.Encrypt = function (text, key) {
        var shifted = this.shift(text, key);
        // console.info("Shifted only \n" + shifted);
        var permuted = this.permute(shifted, key);
        // console.info("Shifted and permuted \n" + permuted);
        return permuted;
    };
    return ProductCipher;
}());
ProductCipher["__class"] = "ProductCipher";