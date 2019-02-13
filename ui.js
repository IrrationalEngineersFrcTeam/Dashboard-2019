document.getElementById('connectionIndicator').innerHTML = "Check5";
/*
var ui = {

camera: document.getElementById('camera'),
timer: document.getElelementById('timer'),
connetion: document.getElementById('connectionIndicator'),
minimap: document.getElementById('minimap'),


};


document.getElementById('connectionIndicator').innerHTML = "Check4";
*/
/*
NetworkTables.addRobotConnectionListener(function(immediateNotify){

    document.getElementById('connectionIndicator').innerHTML = "Robot Connected";
},true);
*/
/* if (NetworkTables.isWsConnected() === true){

    document.getElementById('connectionIndicator').innerHTML = "Check6";
} */


/* not connecting for some reason, figure out tomorrow */

/*NetworkTables.addKeyListener(function(key, value, isNew){

      if (value === '/SmartDashboard/robotConnection'){

    document.getElementById('connectionIndicator').innerHTML = "Check7";
    
}

}, true); */
    
document.getElementById('connectionIndicator').innerHTML = "Check 7";


NetworkTables.addGlobalListener(function(key , value){
    
     var key = NetworkTables.getKeys(key);
    document.getElementById('connectionIndicator').innerHTML = "Check 8";
   
switch (key) {

    case '/SmartDashboard/robotConnection':
    document.getElementById('connectionIndicator').innerHTML = "Check 10";
       if (value === true) {
        document.getElementById('connectionIndicator').innerHTML = "Robot is Connected";
       }else{
        document.getElementById('connectionIndicator').innerHTML = "Robot is not Connected";
       }
    break;

    default:
    document.getElementById('connectionIndicator').innerHTML = "Check 9";
/*
    case ('/SmartDashboard/timeRunning'):
    var s = 135;

    if (timeRunning === true) {
        document.getElementById('timer').innerHTML = "#00d500";

        var countdown = setInterval(function () {
            s--; // Subtracts one second

            var m = Math.floor(s / 60);

            var visualS = (s % 60);


            visualS = visualS < 10 ? '0' + visualS : visualS;

            if (s < 0) {
                // Stop countdown when timer reaches zero
                clearTimeout(countdown);
                return;
            } else if (s <= 30) {

                document.getElementById('timer').color = 'red';

                
                ui.timeWarning.style.color = (s % 2 === 0) ? 'red' : 'transparent';

            } else if (s <= 75) {

                document.getElementById('timer').color = 'yellow';
            }
            document.getElementById('timer').innerHTML = m + ':' + visualS;
        }, 1000);
    } else {
        s = 135;
    }
    break;
*/
/*
    case ('/SmartDashboard/encoderL' , 'SmartDashboard/encoderR' , '/SmartDashboard/NavXYaw'):
    /*
    placeholder! needs actual math for translate.
    ui.ctx.fillRect(0,0,150,75);
    */
   /* get the speed of the robot based on the rotation of the encoders and convert to px. */
   /* var roboRate = 2 * (Math.PI(1.9125 * (encoderL + encoderR)));
    /* sets up a vector for the robot and translates to a coordinate point on the canvas. */
    /*ui.ctx.fillRect(Math.cos(NavXYaw) * roboRate , Math.sin(NavXYaw) * roboRate , 11 , 10 );
    ui.ctx.fillStyle = "#FF0000";
    break;*/
 
}

   
}, true);

