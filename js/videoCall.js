ready = false;

function login(userName) {
    
    var video_out = document.getElementById("vid-box"); //video will be appeared on this component

    var phone = window.phone = PHONE({
        number: "watchMyBabyWeb" + userName, //listen on prefix+username
        publish_key: 'pub-c-616fc02a-063a-41cd-8185-dcf5ba936b2a',
        subscribe_key: 'sub-c-f72b3372-f5da-11e7-8098-329148162fa8'
    });
    //TODO: Set connected status "Connected" on the main page.
    console.log("Ready to receive calls");

    phone.receive(function (session) {
        session.connected(function (session) { video_out.appendChild(session.video); });
        session.ended(function (session) { video_out.innerHTML = ''; });
    });

    return false;
}

function makeTheCall(callName) {
    phone.dial(callName);
    console.log("dialing...");
    return false;
}