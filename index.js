// Laptop Cursor speed test

// Config
var trackSpeed = true
var trackInterval = 50
var movingAverage = true
var movingAverageLength = 5

// variables
var currentPosition = { x: 0, y: 0 }
var lastPosition = { x: 0, y: 0 }
var lastTime = performance.now()
var speedElement = document.getElementById("speed")
var performanceElement = document.getElementById("performance")
var then = 0
var speedHistory = []

var canvas = document.getElementById("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
var ctx = canvas.getContext("2d")

// Get speed
function getSpeed(time) {
	var timeInSeconds = time * 0.001
	var deltaTimeInSeconds = timeInSeconds - then
	then = timeInSeconds

	// Get current time
	var currentTime = performance.now()

	// Calculate distance
	var distance = Math.sqrt(
		Math.pow(lastPosition.x - currentPosition.x, 2) +
			Math.pow(lastPosition.y - currentPosition.y, 2)
	)

	// Calculate speed
	var currentSpeed = (distance / (currentTime - lastTime)) * 1000
    // currentSpeed /= deltaTimeInSeconds
    currentSpeed *= 60

    speedHistory.push(currentSpeed)
    if (speedHistory.length > movingAverageLength) {
        speedHistory.shift()
    }
    var averageSpeed = speedHistory.reduce((a, b) => a + b, 0) / speedHistory.length
    
	return (averageSpeed)
}

function renderSpeedTest(time) {
	clear()
	point(currentPosition.x, currentPosition.y, "blue")
	point(lastPosition.x, lastPosition.y, "red")
	line(
		lastPosition.x,
		lastPosition.y,
		currentPosition.x,
		currentPosition.y,
		"green"
	)

	// Get current speed
	var speed = getSpeed(time)

	// Update last position
	lastPosition = currentPosition

	// Update speed
	speedElement.innerHTML = speed
    performanceElement.innerHTML = performance.now() - time
	requestAnimationFrame(renderSpeedTest)
}

if (trackSpeed) {
	// Infinite loop to track speed
	document.addEventListener("mousemove", (e) => {
		currentPosition = { x: e.clientX, y: e.clientY }
	})

	// Infinite loop to update speed
	requestAnimationFrame(renderSpeedTest)
}

// Canvas utils
function point(x, y, color = "black") {
	ctx.strokeStyle = color
	ctx.beginPath()
	ctx.arc(x, y, 1, 0, 2 * Math.PI, true)
	ctx.stroke()
}

function line(x1, y1, x2, y2, color = "black") {
	ctx.strokeStyle = color
	ctx.beginPath()
	ctx.moveTo(x1, y1)
	ctx.lineTo(x2, y2)
	ctx.stroke()
}

function clear() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
}
