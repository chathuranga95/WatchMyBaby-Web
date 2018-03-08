ready = false;

function login(userName) {//function login(form) {
    console.log("entered the function");
    var video_out = document.getElementById("vid-box");
    
    var phone = window.phone = PHONE({
        number        : userName,//form.username.value || "Anonymous", // listen on username line else Anonymous
        publish_key   : 'pub-c-616fc02a-063a-41cd-8185-dcf5ba936b2a',
        subscribe_key : 'sub-c-f72b3372-f5da-11e7-8098-329148162fa8'///,
    }); 
    //phone.ready(function(){ form.username.style.background="#55ff5b"; });
    console.log("ready....");
    
    phone.receive(function(session){
        console.log("here 1");
        session.connected(function(session) { video_out.appendChild(session.video); });
        console.log("here 2");
        session.ended(function(session) { video_out.innerHTML=''; });
        console.log("here 3");
    });
    console.log("here 4");
    
    return false;   // So the form does not submit.
    console.log("here 5");
}


//console.log("externelly called");

function makeTheCall(callName){//function makeCall(form){
    //if (!window.phone) alert("Login First!");
    phone.dial(callName);
    console.log("dialing...");
    return false;
}