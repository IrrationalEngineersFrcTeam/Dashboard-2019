var ui = {

camera: Document.getElementById('camera'),
timer: Document.getElelementById('timer'),
connetion: Document.getElementById('connectionIndicator'),
minimap: Document.getElementById('minimap'),
ctx = canvas.getContext("2d"),

}


/* not connecting for some reason, figure out tomorrow */
NetworkTables.addGlobalListener('key');


switch ('key') {

    case ('/SmartDashboard/robotConnection'):
       if (value === true) {
           ui.connection.innerHTML = "Robot Connected";
       }else{
           ui.connection.innerHTML = "No Robot Connected";
       }
    break;

    case ('/SmartDashboard/timeRunning'):
    var s = 135;

    if (timerunning === true) {
        ui.timer.style.color = "#00d500";

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

                ui.timer.style.color = 'red';

                
                ui.timeWarning.style.color = (s % 2 === 0) ? 'red' : 'transparent';

            } else if (s <= 75) {

                ui.timer.style.color = 'yellow';
            }
            ui.timer.innerHTML = m + ':' + visualS;
        }, 1000);
    } else {
        s = 135;
    }
    break;

    case ('/SmartDashboard/encoderL' , 'SmartDashboard/encoderR' , '/SmartDashboard/NavXYaw'):
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



}

   


