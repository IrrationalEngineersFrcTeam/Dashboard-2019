document.getElementById('connectionIndicator').innerHTML = "Check5";

var ui = {
    countdown: null
}

/*
var ui = {

camera: document.getElementById('camera'),
timer: document.getElelementById('timer'),
connetion: document.getElementById('connectionIndicator'),
minimap: document.getElementById('minimap'),


};


document.getElementById('connectionIndicator').innerHTML = "Check4";
*/

/* if (NetworkTables.isWsConnected() == true){

    document.getElementById('connectionIndicator').innerHTML = "Check6";
} */


/* not connecting for some reason, figure out tomorrow */

/*NetworkTables.addKeyListener("/SmartDashboard/robotConnection", function(key, value, isNew) {
    if (key == '/SmartDashboard/robotConnection') {
        if (value == true) {
            document.getElementById('connectionIndicator').innerHTML = "Robot is Connected";
        } esle {
            document.getElementById('connectionIndicator').innerHTML = "Robot is not Connected";
        }
    }
}
}, true); */
    
document.getElementById('connectionIndicator').innerHTML = "Check 7";

NetworkTables.addRobotConnectionListener(function(connected) {
    if(connected == true) {
        document.getElementById('connectionIndicator').innerHTML = "Robot is Connected";
    } else {
        document.getElementById('connectionIndicator').innerHTML = "Robot is not Connected";
    }
}, true);

NetworkTables.addGlobalListener(function(key, value, isNew) {
    console.info("key: " + key + "   value: " + value);
    
    switch (key) {
    /*case '/SmartDashboard/robotConnection':
        if (value == true) {
            document.getElementById('connectionIndicator').innerHTML = "Robot is Connected";
        } else {
            document.getElementById('connectionIndicator').innerHTML = "Robot is not Connected"; 
        }
        break;*/
    /*case ('/SmartDashboard/timeRunning'):*/
    case '/FMSInfo/FMSControlData':
        /* When TeleOperated mode is enabled, the value's least significant byte will equal 1.
         * When Autonomous mode is enabled, the value's least significant byte will equal 3.
         * Using bit-wise '&' (AND) operator to isolate the first nibble (first 4 bits) to determine
         * if it equals either 1 or 3.
         */
        if((value & 0x0F) == 1 || (value & 0x0F) == 3) {
            var s = 150;

            document.getElementById('timer').style.color = "#00d500";

            if(ui.countdown != null) {
                clearTimeout(ui.countdown);
            }

            ui.countdown = setInterval(function () {
                s--; // Subtracts one second

                var m = Math.floor(s / 60);

                var visualS = (s % 60);

                visualS = visualS < 10 ? '0' + visualS : visualS;

                if (s < 0) {
                    // Stop countdown when timer reaches zero
                    clearTimeout(ui.countdown);
                    return;
                } else if (s <= 30) {
                    document.getElementById('timer').style.color = 'red';
                } else if (s <= 75) {
                    document.getElementById('timer').style.color = 'yellow';
                }
                document.getElementById('timer').innerHTML = m + ':' + visualS;
            }, 1000);
        } else {
            if(ui.countdown != null) {
                clearTimeout(ui.countdown);
            }
        }
        break;
    case ('/SmartDashboard/encoderL' , '/SmartDashboard/encoderR' , '/SmartDashboard/NavXYaw'):
        /*
        placeholder! needs actual math for translate.
        ui.ctx.fillRect(0,0,150,75);
        */
        /* get the speed of the robot based on the rotation of the encoders and convert to px. */
        var roboRate = 2 * (Math.PI(1.9125 * (encoderL + encoderR)));
        /* sets up a vector for the robot and translates to a coordinate point on the canvas. */
        ui.ctx.fillRect(Math.cos(NavXYaw) * roboRate , Math.sin(NavXYaw) * roboRate , 11 , 10 );
        ui.ctx.fillStyle = "#FF0000";
        break;
    default:
        //document.getElementById('connectionIndicator').innerHTML = "Something went wrong!";
        
        //document.getElementById('connectionIndicator').innerHTML = "Connection is " + SmartDashboard + " " + value;
        break;
    }
}, true);

