# Columbia COMSW4995 - Introduction to Data Visualization, HW 0
**UNI: kp2844**

Link to the full problem statement can be found [here](https://columbiaviz.github.io/2019f_w4995/a0.html).  The working abstract clock can be found [here](http://kartikparnami.com/coms4995-f2019-hw0/).

## Description of the visualization

- The clock given in the visualization is a 12-hour clock. The background and the sun/moon visualization at the top indicates the period of the day (AM/PM). During AM, the background color gradients from midnight black to early morning blue to afternoon orange and the drawing on top shows transition from moon to sun. During PM, the background color gradients from afternoon orange to dusk to midnight black and the drawing on top shows transition from sun to moon.

- The clock it self has three concentric circles.
  1. **Hour:** The innermost circle depicts the hour of the AM/PM period so it ranges from 12-11 and the amount of fill in the innermost circle (similar to a pie-chart) is proportionate to the hour value at that time.
  2. **Minute:** The middle circle depicts the minute of the current hour so it ranges from 0-59 and the amount of fill in the middle circle (similar to a pie-chart) is proportionate to the minute value at that time.
  3. **Second:** The outermost circle depicts the second of the current minute so it ranges from 0-59 and the amount of fill in the outermost circle (similar to a pie-chart) is proportionate to the second value at that time.