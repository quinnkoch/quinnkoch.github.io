var miles;
var wordm = "miles";
var kilometers;
var wordk = "kilometers";

function setup() {
    createCanvas(600, 600);

    inputkm = createInput();
    inputkm.position(100,300);

    convertkm = createButton("Convert")
    convertkm.position(240,300)
    convertkm.mousePressed(kmm)


    kmmiles = createElement("h3","Convert kilometers to miles")
    kmmiles.position(100,250)

    inputmiles = createInput();
    inputmiles.position(100,450);

    convertmiles = createButton("Convert")
    convertmiles.position(240,450)
    convertmiles.mousePressed(mkm)

    mileskm = createElement("h3","Convert miles to kilometers")
    mileskm.position(100,400)
}

function mkm() {
    var km = round((inputmiles.value() * 1.609)*100);
    kilometers = km/100;
    //wordk = "kilometers"
}

function kmm() {
    var m = round((inputkm.value() / 1.609)*100);
    miles = m/100;
    //wordm = "miles";
}

function draw() {
    background(255);
    text(miles,100,145);
    text(wordm,100,158);
    text(kilometers,100,295);
    text(wordk,100,308);
}