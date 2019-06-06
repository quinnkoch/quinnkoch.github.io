/*Created by Quinn Koch
3/12/19
Online Games and Interactivity
This program creates a random Mondrian
inspired art piece every time you run it*/
function setup() {
    //Setup happens just once!!
    //create variables necessary to draw varying rectangles




    //set up the canvas and background
    createCanvas(400, 400);
    background(255);
    strokeWeight(5)
}

function createArt(){
    var cooldown = 0;
    var xcor = 0;
    var ycor = 0;
    var length = round(random(50, 150));
    var wide = random(50, 100);
    var white = random(0, 3)
    var split = random(0, 5)
    //each time through this loop a column of rectangles are drawn
    for (let i = 0; i < 10; i++) {
        //each time through this loop one rectangle is drawn
        for (let i = 0; i < 15; i++) {
            //set the color to random
            if (white > 1) {
                fill(random(0, 255), random(0, 255), random(0, 255));
            }
            //set the color to white
            if (white <= 1) {
                fill(255)
            }
            //draw two congruent rectangles next to each other with random widths
            if (split >= 4 && cooldown <= 0) {
                rect(xcor, ycor, length / 2, wide);
                rect(xcor + (length / 2), ycor, length / 2, wide);
                cooldown = cooldown + 2
            }
            //draw just one rectangle with a random width
            if (split < 4 || cooldown > 0) {
                rect(xcor, ycor, length, wide);
            }
            //reset variables for next rectangle
            ycor = ycor + wide
            wide = random(50, 100)
            white = random(0, 2)
            split = random(0, 5)
            cooldown = cooldown - 1
        }
        //reset varibles for next column
        ycor = 0
        xcor = xcor + length;
        length = round(random(50, 150));
    }
}

function draw() {
    //Draw repeats over and over again

}
function mousePressed() {
    createArt()
}