/**Playing Board */
let tileSize = 32;
let rows = 16;
let column = 16;

let board;
let boardWidth = tileSize * column; // 32 * 16
let boardHeight = tileSize * rows; // 32 * 16
let context;

/**Building the ship */
let shipWidth = tileSize * 2;
let shipHeight = tileSize;
let shipX = tileSize * column / 2 - tileSize;
let shipY = tileSize * rows - tileSize * 2;

let ship = {
    x: shipX,
    y: shipY,
    width: shipWidth,
    height: shipHeight
}

let shipImg;
let shipVelocityx = tileSize; //ship moving speed

/**Aliens */
let alienArray = [];
let alienWIdth = tileSize * 2;
let alienHeight = tileSize;
let alienX = tileSize;
let alienY = tileSize;
let alienImg;

let alienRows = 2;
let alienColoumns = 3;
let alienCount = 0; //number of aliens to defeat

let alienVelocityX = 1; //alien moving speed

window.onload = function () {
    board = document.getElementById("playingBoard");
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d"); //used for drawing on the board

    /**Drawing the ship */
    // context.fillStyle = "green";
    // context.fillRect(ship.x, ship.y, ship.width, ship.height);
    shipImg = new Image();
    shipImg.src = "/imgs/hero.png";
    shipImg.onload = function () {
        context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);
    };

    alienImg = new Image();
    alienImg.src = "/imgs/special-invader.png";
    createAliens();

    requestAnimationFrame(update);
    document.addEventListener("keydown", moveShip);
}

function update() {
    requestAnimationFrame(update);

    //clearing the canvas after each ship movement
    context.clearRect(0, 0, board.width, board.height);

    //redrawing the ship over again on the canvas
    context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);

    //aliens
    for (let i = 0; i < alienArray.length; i++) {
        let alien = alienArray[i];
        if (alien.alive) {
            alien.x += alienVelocityX;

            //if alien touches the borders
            if (alien.x + alien.width >= board.width || alien.x <= 0){
                alienVelocityX *= -1;
                alien.x += alienVelocityX * 2;

                //move all aliens down by one row
                for (j = 0; j < alienArray.length; j++){
                    alienArray[j].y += alienHeight;
                }
            }
            context.drawImage(alienImg, alien.x, alien.y, alien.width, alien.height);
        }
    }
}

function moveShip(e) {
    if (e.code == "ArrowLeft" && ship.x - shipVelocityx >= 0) {//check if ship is moving out of bounds on the left
        ship.x -= shipVelocityx; //moving the ship left one tile
    }
    else if (e.code == "ArrowRight" && ship.x + shipVelocityx + ship.width <= board.width) { //check if ship is moving out of bounds on the right
        ship.x += shipVelocityx; //moving the ship right one tile
    }
}

function createAliens() {
    for (let c = 0; c < alienColoumns; c++) {
        for (let r = 0; r < alienRows; r++) {
            let alien = {
                img: alienImg,
                x: alienX + c * alienWIdth,
                y: alienY + r * alienHeight,
                width: alienWIdth,
                height: alienHeight,
                alive: true
            }
            alienArray.push(alien);
        }
    }
    alienCount = alienArray.length;
}