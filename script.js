const Y_AXIS = 1, X_AXIS = 2;
let lastSecond = 0, afternoonColor, morningColor, midnightColor, duskColor;

function setup() {
    let height = document.getElementsByTagName("body")[0].getBoundingClientRect().height, width = document.getElementsByTagName("body")[0].getBoundingClientRect().width;
    afternoonColor = color('rgba(253, 125, 1, 0.5)');
    morningColor = color('rgba(141, 163, 153, 0.5)');
    midnightColor = color('rgba(0, 20, 40, 0.5)');
    duskColor = color('rgba(253, 94, 83, 0.5)');
    createCanvas(width, height);
    lastSecond = second();
}

function draw() {
    var currSecond = second();
    if (currSecond !== lastSecond) {
        let hr = hour(), mnt = minute(), scd = second();
        setGradient(0, 0, width, height, color(255, 255, 255), color(255, 255, 255));
        if (hr < 12) {
            setGradient(0, height/2, width, height/2, morningColor, midnightColor);
            setGradient(0, 0, width, height/2, afternoonColor, morningColor);
        } else {
            setGradient(0, height/2, width, height/2, duskColor, afternoonColor);
            setGradient(0, 0, width, height/2, midnightColor, duskColor);
        }
        lastSecond = scd;
        innerCircleColor = getColor(0, 11, hour % 12, color(0, 0, 0), color(255, 255, 255));
    }
}

function getColor(start, end, currVal, color1, color2) {
    
}

function setGradient(x, y, w, h, color1, color2) {
    noFill();
    for (var i = y; i <= y+h; i++) {
        var inter = map(i, y, y+h, 0, 1);
        var c = lerpColor(color1, color2, inter);
        stroke(c);
        line(x, i, x+w, i);
    }
}
