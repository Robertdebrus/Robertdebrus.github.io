var xCoords;
var yCoords;
var lookingAtTop = false;
var lookingAtBottom = false;
var lookingAtRight = false;
var lookingAway = false;
var lookingAt;

/*  Top Left:   xMin = 0    xMax = 404
                yMin = 0    yMax = 324
                
    Bottom Left:xMin = 0    xMax = 404
                yMin = 325  yMax = 1079
                
    Right       xMin = 405  xMax = 1599
                yMin = 0    yMax = 1079
*/

function gazeDetector(x, y) {
    "use strict";
    var xMin = 0;
    var xMax = 404;
    var yMin = 0;
    var yMax = 324;
    if (x < xMax && y < yMax && x > xMin && y > yMin) {
        lookingAtTop = true;
        lookingAt = "Top Right Section";
        //console.log("Looking at the Top Left side of the Page");
    } else {
        lookingAtTop = false;
    }
    
    xMin = 0;
    xMax = 404;
    yMin = 325;
    yMax = 1079;
    if (x < xMax && y < yMax && x > xMin && y > yMin) {
        lookingAtBottom = true;
        lookingAt = "Bottom Left Section";
        //console.log("Looking at the Bottom Left side of the Page");
    } else {
        lookingAtBottom = false;
    }

    xMin = 405;
    xMax = 1599;
    yMin = 0;
    yMax = 1079;
    if (x < xMax && y < yMax && x > xMin && y > yMin) {
        lookingAtRight = true;
        lookingAt = "Right Section";
        //console.log("Looking at the Right side of the Page");
    } else {
        lookingAtRight = false;
    }
    
    if (lookingAtRight === false && lookingAtTop === false && lookingAtBottom === false) {
        lookingAway = true;
        lookingAt = "Away";
        //console.log("Looking away from the Page");
    }
    
}

function getCoordinates() {
    "use strict";
    // GET
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8080", true);
    xhr.onload = function (e) {
        if (xhr.readyState === 4) {
            var jsonString = xhr.responseText;
            var coordsDict = JSON.parse(jsonString);
            xCoords = coordsDict.x;
            yCoords = coordsDict.y;
        } else {
            console.error(xhr.statusText);
        }
    };
    xhr.onerror = function () {
        console.error(xhr.statusText);
    };
    xhr.send(null);
    
    // POST
    var xhr2 = new XMLHttpRequest();
    xhr2.open("POST", "http://localhost:8080", true);

    xhr2.onerror = function(e) {
        console.error(xhr.statusText);
    };

    var data = {"message": lookingAt};
    var jsondata = JSON.stringify(data);
    xhr2.send(jsondata);
    
    // Looking At
    gazeDetector(xCoords, yCoords);
}

//  Repeating Function
setInterval(getCoordinates, 2000);