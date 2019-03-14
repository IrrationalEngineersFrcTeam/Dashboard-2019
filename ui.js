

document.getElementById('connectionIndicator').innerHTML = "Something Went Wrong!";
    
document.getElementById('rotationDial').style.transform = ('rotate(' + 0 + 'deg)');
var ui = {

  navY = 0,
  eR = 0,
  eL = 0,

};
document.getElementById('connectionIndicator').innerHTML = "Check 7";

NetworkTables.addRobotConnectionListener(function(connected) {
    if(connected == true) {
        document.getElementById('connectionIndicator').innerHTML = "Robot is Connected";
        document.getElementById('connectionIndicator').style.webkitTextFillColor = "lime";
    } else {
        document.getElementById('connectionIndicator').innerHTML = "Robot is not Connected";
        document.getElementById('connectionIndicator').style.webkitTextFillColor = "red";
    }
}, true);

NetworkTables.addGlobalListener(function(key, value, isNew) {
    console.info("key: " + key + "   value: " + value);
    
    switch (key) {
   
    case '/FMSInfo/FMSControlData':
        /* When TeleOperated mode is enabled, the value's least significant byte will equal 1.
         * When Autonomous mode is enabled, the value's least significant byte will equal 3.
         * Using bit-wise '&' (AND) operator to isolate the first nibble (first 4 bits) to determine
         * if it equals either 1 or 3.
         */
        if((value & 0x0F) == 1 || (value & 0x0F) == 3) {
            var s = 150;
            
            document.getElementById('timer').style.webkitTextFillColor = "lime";

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
                    document.getElementById('timer').style.webkitTextFillColor = 'red';
                } else if (s <= 75) {
                    document.getElementById('timer').style.webkitTextFillColor = 'yellow';
                }
                document.getElementById('timer').innerHTML = m + ':' + visualS;
            }, 1000);
        } else {
            s = 135;
        }
        break;
    case '/SmartDashboard/encoderL':
     ui.eL = value;
       minimap.minimapCalc();
       document.getElementById('ID1') = 'Left =' + eL;
       
    break;

    case '/SmartDashboard/encoderR':
         ui.eR = value;
        minimap.minimapCalc();
        document.getElementById('ID2') = 'Right =' + eR;
        
        
    break;

    case '/SmartDashboard/NavXYaw':
        
         ui.navY = value;
         document.getElementById('ID3').innerHTML = 'Yaw =' + navY + 'degrees';
        
        robotAngle = Math.floor(navY);
        if (navY < 0) { // Corrects for negative values
            navY += 360;
        }
        document.getElementById('rotationDial').style.transform = ('rotate(' + robotAngle + 'deg)');

        minimap.minimapCalc();
    break;

    default:
      //  document.getElementById('connectionIndicator').innerHTML = "Something went wrong!";
        
        break;
    }
}, true);


var minimap = {
    minimapCalc: function(){ 
        document.getElementById('test').innerHTML = "Minimap Error!" +  roboRate;
        var roboRate = 2 * (Math.PI(1.9125 * (ui.eL + ui.eR)));
        
        document.getElementById('miniBot').translate((Math.cos(ui.navY) * roboRate), (Math.sin(ui.navY) * roboRate));

    }
};

/*
Alternate Minimap Calc, Do not delete!
var minimap = {
 minimapCalc: function(){ 
    document.getElementById('ID1').innerHTML = eL;
    var eL = 0;
    var eR = 0;
    var navY = 0;
    /* get the speed of the robot based on the rotation of the encoders and convert to px. */
   // var roboRate = 2 * (Math.PI(1.9125 * (eL + eR)));
    
    /* sets up a vector for the robot and translates to a coordinate point on the canvas. */
   /* var minimap = document.getElementById("minimap");
    var minimapIndicator = minimap.getContext("2d");
    minimapIndicator.beginPath();
    minimapIndicator.arc(45 + (Math.cos(navY) * roboRate), 50 + (Math.sin(navY) * roboRate), 5, 0, 2 * Math.PI);
    minimapIndicator.stroke();
    /* ui.ctx.fillRect(Math.cos(navY) * roboRate , Math.sin(navY) * roboRate , 11 , 10 ); */
//}