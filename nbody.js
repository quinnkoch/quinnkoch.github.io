//this sketch is the modified planets simulation from HW #10 with 2 suns.  I also modified the sketch to make all of the planets pull each other, making it a N-Body diagram

var ballArray = []
var gravity = 9.8/30.0;
var speed = 0.0001

var sunX = [300,100]
var sunY = [300,100]
//click on a loctaion to move the first sun there press a over a location to move the second sun there

class Ball {
    constructor(x, y, width, v) {
        this.x = x;
        this.y = y;
        this.value = v;
        this.ySpeed = 0;
        this.xSpeed = 0;
        this.width = width;
        this.color = "hotpink"
    }

    update(){
        var directionX = [sunX[0]-this.x,sunX[1]-this.x]
        var directionY = [sunY[0]-this.y,sunY[1]-this.y]

        for (let i = 0;i<ballArray.length;i++){
            this.xSpeed += (ballArray[i].x-this.x)*speed
            this.ySpeed += (ballArray[i].y-this.y)*speed
        }

        this.xSpeed += (directionX[0]+directionX[1])*speed
        this.ySpeed += (directionY[0]+directionY[1]) *speed

        this.x += this.xSpeed/(0.1*this.width)
        this.y += this.ySpeed/(0.1*this.width)
        //each ball's speed is dependent on its width, making smaller balls move faster
    }

    draw(){
        fill(abs(this.xSpeed*50),abs(this.ySpeed*50),100) //the fill of each ball is dependent on its speed, so they constantly change color
        ellipse(this.x, this.y, this.width, this.width)
    }
}

function setup() {
    createCanvas(600, 600);
    for(var i = 0;i<50;i++){
        var newBall = new Ball(random(0, width), random(0, height, i), random(10, 100))//random width given here
        ballArray.push(newBall)
    }
}

function draw() {
    background(0, 0, 0);

    fill("yellow")
    ellipse(sunX[0], sunY[0], 10, 10)
    ellipse(sunX[1], sunY[1], 10, 10)

    for(var i = 0;i<ballArray.length;i++){
        ballArray[i].update()
        ballArray[i].draw()
    }

}
//functions that move the suns
function mousePressed() {
    sunX[0] = mouseX
    sunY[0] = mouseY
}
function keyPressed(){
    if (keyCode === 65) {
        sunX[1] = mouseX
        sunY[1] = mouseY
    }
}