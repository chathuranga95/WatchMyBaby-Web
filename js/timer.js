function isTimeUp(hh,mm){
    var date = new Date();
    if(date.getHours()>=hh && date.getMinutes()>=mm){
        console.log("Time's up");
        return true;
    }
    else{
        window.setTimeout(arguments.callee,1000,hh,mm); // tick every second
        console.log(hh + ":" + mm + " vs " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
    }
}