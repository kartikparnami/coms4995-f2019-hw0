const Y_AXIS = 1, X_AXIS = 2, MINISCULE_NUM = 0.0001;
let lastSecond = 0, afternoonColor, morningColor, midnightColor, duskColor, height, width, sunColor, moonColor;

function setup() {
    // Setup often used colors and lastSecond variable.
    afternoonColor = color('rgba(253, 125, 1, 0.4)');
    morningColor = color('rgba(141, 163, 153, 0.4)');
    midnightColor = color('rgba(0, 20, 40, 0.4)');
    duskColor = color('rgba(253, 94, 83, 0.4)');
    sunColor = color('rgba(252, 150, 1, 1)');
    moonColor = color('rgba(37, 88, 124, 1)');
    lastSecond = second();
}

function draw() {
    var currSecond = second();
    height = document.getElementsByTagName("body")[0].getBoundingClientRect().height;
    width = document.getElementsByTagName("body")[0].getBoundingClientRect().width;
    if (currSecond !== lastSecond) {
        // Draw new canvas to reflect the newest height and width, giving a responsive UI.
        createCanvas(width, height);

        // Get current hour, minute and second values, store the lastSecond for later reference.
        let hr = hour(), mnt = minute(), scd = second();
        lastSecond = scd;

        // Clear the canvas using a white background.
        setGradient(0, 0, width, height, color(255, 255, 255), color(255, 255, 255));

        // Calculate left half width avoiding gradient breaks when stitching two gradients.
        let leftHalfWidth = width/2 - 1;
        if (width % 2 == 1) {
            leftHalfWidth += 0.5;
        }
        if (hr < 12) {
            // AM time, shows a midnight to daytime horizontal gradient alongside a moon to sun depiction.
            setGradient(0, 0, leftHalfWidth, height, midnightColor, morningColor); // midnight to morning gradient - half screen.
            setGradient(leftHalfWidth + 1, 0, width - leftHalfWidth, height, morningColor, afternoonColor); // morning to afternoon gradient - half screen.

            // Create moon, star, an arrow and a sun to depict AM.
            fill(moonColor);
            arc(3.5 * width/8, 100, width/20, width/20, HALF_PI - QUARTER_PI, PI + QUARTER_PI, PIE);
            fill(color('rgba(241, 239, 255, 1)'))
            star(3.58 * width/8, 92, width/150, width/90, 5);
            strokeWeight(3);
            line(3.8 * width/8, 100, 4.2 * width/8, 100);
            strokeWeight(1);
            fill(color('rgba(0, 0, 0, 1)'));
            triangle(4.2 * width/8, 100, 4.15 * width/8, 104, 4.15 * width/8, 96);
            fill(sunColor);
            circle(4.5 * width/8, 100, width/20);
        } else {
            // PM time, shows a daytime to midnight horizontal gradient alongside a sun to moon depiction.
            setGradient(0, 0, leftHalfWidth, height, afternoonColor, duskColor); // afternoon to dusk gradient - half screen.
            setGradient(leftHalfWidth + 1, 0, width - leftHalfWidth, height, duskColor, midnightColor); // dusk to midnight gradient - half screen.

            // Create sun, an arrow, a moon and a star to depict PM.
            fill(sunColor);
            circle(3.5 * width/8, 100, width/20);
            strokeWeight(3);
            line(3.8 * width/8, 100, 4.2 * width/8, 100);
            strokeWeight(1);
            fill(color('rgba(0, 0, 0, 1)'));
            triangle(4.2 * width/8, 100, 4.15 * width/8, 104, 4.15 * width/8, 96);
            fill(moonColor);
            arc(4.5 * width/8, 100, width/20, width/20, HALF_PI - QUARTER_PI, PI + QUARTER_PI, PIE);
            fill(color('rgba(241, 239, 255, 1)'))
            star(4.58 * width/8, 92, width/150, width/90, 5);
        }

        // Create outermost circle to depict seconds in the running minute, with color moving gradually from one complementary color to another.
        // let outerCircleColor = getColor(60, scd, [255, 214, 89], [175, 89, 255]);
        let outerCircleColor = color(255, 214, 89);
        fill(outerCircleColor);
        arc(width/2, height/2, width/4, width/4, -PI/2, ((PI * 2 * scd/60) - PI/2 + MINISCULE_NUM), PIE);

        // Create middle circle to depict minutes in the running hour, with color moving gradually from one complementary color to another.
        // let middleCircleColor = getColor(60, mnt, [255, 75, 189], [192, 255, 75]);
        let middleCircleColor = color(255, 75, 189);
        fill(middleCircleColor);
        arc(width/2, height/2, width/6, width/6, -PI/2, ((PI * 2 * mnt/60) - PI/2 + MINISCULE_NUM), PIE);

        // Create innermost circle to depict hour in the running day (0-11), with color moving gradually from one complementary color to another.
        // let innerCircleColor = getColor(12, hr % 12, [63, 225, 223], [255, 105, 63]);
        let innerCircleColor = color(63, 225, 223);
        fill(innerCircleColor);
        // If 12.xx am or 12.yy pm, we should show full circle instead of showing nothing, for better viz.
        hr = hr % 12;
        if (hr == 0) {
            hr = 12;
        }
        arc(width/2, height/2, width/9, width/9, -PI/2, ((PI * 2 * hr/12) - PI/2), PIE);
    }
}

function getColor(total, currVal, color1Arr, color2Arr) {
    // Utility method to get step color between two values.
    let rVal = (currVal * (color2Arr[0] - color1Arr[0]))/(total) + color1Arr[0];
    let gVal = (currVal * (color2Arr[1] - color1Arr[1]))/(total) + color1Arr[1];
    let bVal = (currVal * (color2Arr[2] - color1Arr[2]))/(total) + color1Arr[2];
    return color(rVal, gVal, bVal);
}

function setGradient(x, y, w, h, color1, color2) {
    // Utility method to set linear gradient in the x direction. Inspired from p5.js documentation.
    noFill();
    for (let i = x; i <= x + w; i++) {
        let inter = map(i, x, x + w, 0, 1);
        let c = lerpColor(color1, color2, inter);
        stroke(c);
        line(i, y, i, y + h);
    }
}

function star(x, y, radius1, radius2, npoints) {
    // Utility method to create a star. Inspired from p5.js documentation.
    let angle = TWO_PI / npoints;
    let halfAngle = angle / 2.0;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
        let sx = x + cos(a) * radius2;
        let sy = y + sin(a) * radius2;
        vertex(sx, sy);
        sx = x + cos(a + halfAngle) * radius1;
        sy = y + sin(a + halfAngle) * radius1;
        vertex(sx, sy);
    }
    endShape(CLOSE);
}
