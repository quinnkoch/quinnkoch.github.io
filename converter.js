function setup() {
    createCanvas(400, 400);

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
    var km = inputmiles.value() * 1.609;
    outputmiles = createElement("h3",km + " kilometers")
    outputmiles.position(100,460)
}

function kmm() {
    var miles = inputkm.value() / 1.609;
    outputmiles = createElement("h3",miles + " miles")
    outputmiles.position(100,320)
}

function draw() {
    //background(220);
}