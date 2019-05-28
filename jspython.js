//This is my game. The player is the JavaScript sprite, press the spacebar to jump, and use the arrow keys to move left and right. The objective is to kill as many Python sprites as possible by jumping on top of them. Each time you eliminate all of the pythons from the screen, they will all regenerate and an extra will be added to the game, aso the levels get progressively more and more crowded. Grab the p5.js sprite to gain and extra life. Beware, pythons will jump at random times. Before you start, make sure the entire canvas is visible.

var mainCharacter;
var gravity = 9.8/30.0;
var backgroundImage;
var mainCharacterImage;
var monsterImage
var groundOffset = 100
var monsterArray = []
var health = 400
var score = 0
var cooldown = 0

class Character {
    constructor(x, y, width) {
        this.x = x;
        this.y = y;
        this.ySpeed = 0;
        this.xSpeed = random(4,8);
        this.width = width;
        this.color = "blue"
        this.isMonster = false
        this.isP5 = false
        this.groundOn = true //used to make Pythons fall after being stomped on
    }

    update(){

        if (health > 400){ //health limits
            health = 400
        }
        if(health < 0){
            health = 0
        }

        if (this.isMonster == true) { //this block creates the general movement for pythons
            var jump = random(0,400)
            if(jump<1 && this.y+this.width*0.5 >= (height-groundOffset)){//jump at a rando time
                this.ySpeed -= 8
            }
        }

        if(this.isP5 == true){
            this.xSpeed = -4//make health packs' movement
        }

        if(this.y+this.width*0.5 >= (height-groundOffset) && this.ySpeed > 0 && this.groundOn === true)//create the floor checking
        {
            this.ySpeed = this.ySpeed*(-0.4)//creates slight bouncing effect
            this.y = height-this.width*0.5-groundOffset
        }

        this.ySpeed += gravity;//make player and monsters fall to ground
        this.y += this.ySpeed;
        this.x += this.xSpeed;//move thing with xSpeed (monsters and health packs) across screen

        if(this.x <= -2000 && this.isP5){
            this.x = 2*width// reset health pack's location when far away
        }

        if(this.x <= 0 && this.isP5 == false){
            this.x = 1//left side boundry
            this.xSpeed *= -1
        }

        if(this.x >= width-50 && this.isP5 == false){//right side boundry
            this.x = width-50
            this.xSpeed *= -1
        }

        if(this.isP5 == true){//collision for player and health pack
            if(abs(this.x-mainCharacter.x) <= 30 && abs(this.y-mainCharacter.y) <= 30) {
                health += 100//give player 1 life back
                this.x = 4000
            }
        }

        if(this.isMonster == false && this.isP5 == false) {//create movement for player
            this.xSpeed *= 0.8
            for(let i = 0;i<monsterArray.length;i++){//monster-player collision detection
                if(abs(this.x-monsterArray[i].x) <= 30 && abs(this.y-monsterArray[i].y) <= 30 && this.ySpeed < 3 && cooldown <= 0){
                    health-=100
                    cooldown = 100// makes it so 1 collision doesn't immediately kill you

                }
                else if(abs(this.x-monsterArray[i].x) <= 50 && abs(this.y-monsterArray[i].y) <= 50 && this.ySpeed >= 3 && cooldown <= 0){//takes player's speed into account to detect if the player is jumping on to of the monster to kill it
                    monsterArray[i].groundOn = false//makes the monster fall off of the screen
                    monsterArray[i].ySpeed += 10;
                    score+=1
                    this.ySpeed = -10
                    cooldown = 100
                }
            }
        }

        var count = 0//this section detects when all of the monsters in a level are killed and then respawns them plus 1 more
        for(let i = 0;i<monsterArray.length;i++){
            if(monsterArray[i].y >= 500){
                count += 1
            }
            if(count == monsterArray.length){
                var mon = new Character(100,200,60);
                mon.isMonster = true
                monsterArray.push(mon)
                for(var j = 0;j<monsterArray.length;j++){
                    mainCharacter.x = 30;
                    mainCharacter.y = 200;
                    mainCharacter.xSpeed = 0;
                    mainCharacter.ySpeed = 0;
                    monsterArray[j].ySpeed = 0
                    monsterArray[j].xSpeed = random(4,10)
                    monsterArray[j].x = random(100,width)
                    monsterArray[j].y = 250
                    monsterArray[j].groundOn = true
                }
            }
        }

        cooldown-=1
    }

    draw(){//displays the appropriate image for each character at the appropriate location
        if(this.isMonster){
            image(monsterImage, this.x, this.y, this.width, this.width)
        }
        else if(this.isP5){
            image(p5Image, this.x, this.y, this.width, this.width)
        }
        else {
            image(mainCharacterImage, this.x, this.y, this.width, this.width)
        }
    }
}

function setup() {



    createCanvas(722, 348);
    background(255)
    textSize(40);

    mainCharacter = new Character(0, 200, 60)//create player

    backgroundImage = loadImage("./JSbackground.png")//import images
    mainCharacterImage = loadImage("./JavascriptLogo.png")
    monsterImage = loadImage("./pythonlogo.png")
    p5Image = loadImage("./P5.jslogo.png")

    p5 = new Character(1000,300,50)//create health pack
    p5.isP5 = true

    for (let i = 0;i<3;i++){
        var newMonster = new Character(random(100,width), 100, 60)//create starting pythons
        newMonster.isMonster = true
        monsterArray.push(newMonster)

    }
    noLoop()
}

function play(){
    loop();
}

function draw() {
    background(0, 200, 150);

    if(health<=0){//game over screen
        background(0)
        fill("red")
        text("GAME OVER", 250,100)
        text("FINAL SCORE:",230,140)
        fill(255)
        text(score,480,140)
    }
    else{

        image(backgroundImage, 0, 0, width, height)//create background
        stroke("yellow")
        line(0, height- 70,width, height-70)
        fill("white")
        textSize(16)
        text("Health:",100,20)
        textSize(35)
        text(score,650,35)

        if(health>0){//create health bar
            fill("red")
            rect(160,7,health,15)
        }

        if(keyIsDown(LEFT_ARROW)){
            //move player left
            mainCharacter.xSpeed -= 1.0
        }
        if(keyIsDown(RIGHT_ARROW)){
            //move player right
            mainCharacter.xSpeed += 1.0
        }
        //show and move characters
        mainCharacter.update();
        mainCharacter.draw()

        for(let i = 0; i<monsterArray.length;i++){
            monsterArray[i].update()
            monsterArray[i].draw()
        }
        p5.update()
        p5.draw()

    }
}

function keyPressed(){//create spacebar jumping
    if(key === " " && mainCharacter.y >= height-groundOffset - 60){
        mainCharacter.ySpeed -= 8.0
    }
}

