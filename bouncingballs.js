new p5()

var x = 0
var y = 100
var xchange = [random(0, 4)]
var ychange = [random(0, 4)]
var thick = 10
var r = 255
var g = 255
var b = 255
var ballnums = 0
var ballcount = 1
var previousx = x
var previousy = y
var xin = -1
var yin = -1
var xcors = [0]
var ycors = [0]
var previousxcors = [0]
var previousycors = [0]
var taillength = 1


function setup() {
    createCanvas(400, 400);

    newcol = createButton('New Color')
    newcol.mousePressed(col)

    sizeplus = createButton('BIGGER')
    sizeplus.mousePressed(grow)

    sizeminus = createButton('smaller')
    sizeminus.mousePressed(shrink)

    fast = createButton('FASTER')
    fast.mousePressed(faster)

    slow = createButton('slower')
    slow.mousePressed(slower)

    more = createButton('more balls')
    more.mousePressed(addmore)

    less = createButton('less balls')
    less.mousePressed(subtract)

    increasetrail = createButton('increase trail')
    increasetrail.mousePressed(longtrail)

    decreasetrail = createButton('decrease trail')
    decreasetrail.mousePressed(shorttrail)

    reset = createButton('reset')
    reset.mousePressed(restart)

}


function draw() {
    background(0);
    noStroke()
    fill(r, g, b)
    for (let i = 0; i < ballcount; i++) {
        for (let i = 0; i < taillength;i++){
            ellipse(previousxcors[previousxcors.length-i*25], previousycors[previousycors.length-i*25], thick)
        }
        ellipse(xcors[i], ycors[i], thick)
        previousxcors.push(xcors[i])
        previousycors.push(ycors[i])
        xcors[i] = xcors[i] + xchange[i]
        ycors[i] = ycors[i] + ychange[i]
        if (xcors[i] > width || xcors[i] < 0) {
            xchange[i] = -(xchange[i])
            //xin = -xin
        }
        if (ycors[i] > width || ycors[i] < 0) {
            ychange[i] = -(ychange[i])
        }
    }
}

function col() {
    r = random(0, 255)
    g = random(0, 255)
    b = random(0, 255)
}

function grow() {
    thick = thick + 2
}

function shrink() {
    thick = thick - 2
}

function faster() {
    for (let i = 0; i < xchange.length; i++) {
        xchange[i] = xchange[i] * 1.5
        ychange[i] = ychange[i] * 1.5
    }
}

function slower() {
    for (let i = 0; i < xchange.length; i++) {
        xchange[i] = xchange[i] / 1.5
        ychange[i] = ychange[i] / 1.5
    }
}

function addmore() {
    ballcount = ballcount + 1
    xcors.push(random(0, width))
    ycors.push(random(0, width))
    xchange.push(random(0, 4))
    ychange.push(random(0, 4))
}

function subtract() {
    ballcount = ballcount - 1
    xcors.pop()
    ycors.pop()
    xchange.pop()
    ychange.pop()
}

function restart() {

    x = 0
    y = 100
    xchange = [random(0, 4)]
    ychange = [random(0, 4)]
    thick = 10
    r = 0
    g = 0
    b = 0
    ballnums = 0
    ballcount = 1
    previousx = x
    previousy = y
    xin = -1
    yin = -1
    xcors = [0]
    ycors = [0]
    previousxcors = []
    previousycors = []
    taillength = 1
}
function longtrail() {
    taillength = taillength + 1
}
function shorttrail() {
    taillength = taillength - 1
}