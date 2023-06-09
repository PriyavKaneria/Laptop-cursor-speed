# Laptop-cursor-speed
Laptop (using trackpad) cursor speed on the edge

Open the [demo](https://priyavkaneria.github.io/Laptop-cursor-speed/)

## What is this?
Use a laptop and select a small area (don't lift your finger) and while selecting move your finger to trackpad edge. Most probably you cursor will now start moving to that edge direction on it's own.

I don't know what that feature is called so let's assume it is "Trackpad Edge Cursor Speed". I have seen this feature in Windows 10+. I don't know if it is available in other OS or not.

In this repo I have tried to calculate the speed of cursor when it is moving on it's own. I have used `mousemove` event to calculate the speed. I have used `requestAnimationFrame` to calculate the speed. I have used `performance.now()` to calculate the time difference between two frames.

## Confusion

Normally, the performance stays from 0-2. And speed seems somewhat accurate.
But whe in TECS mode, the performance starts to fluctuate and slowly increase till 16 and then falls back to 0. And the speed is not accurate as it keeps decreasing for the same cursor speed. (probably due to this fluctuation in performance, but even after performance resets, the speed keeps decreasing)

If you have any ideas on how and why this might happen please let me know.

## Do raise a issue or PR if any improvements can be made to the code or any inaccuracy is found in code or documentation.

> My speed calculation - `speed = distance / time` (distance is calculated using pythagoras theorem)
> The speed shown is moving average of last 10 frames. Configurable via the Slider.
> Please raise an issue if there are any issues in the calculation