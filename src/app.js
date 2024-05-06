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
}