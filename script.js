let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let x = canvas.width / 2;
let y = canvas.height / 2;
let playerWidth = 50;
let playerHeight = 50;
let sizePlayer = playerWidth + playerHeight;

let rightPressed = 0;
let leftPressed = 0;
let downPressed = 0;
let upPressed = 0;

// обработка клавиш
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) { // клвиша нажата
    //влево-вправо
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
    //вверх-вниз
    if (e.key === "Top" || e.key === "ArrowUp") {
        upPressed = true;
    } else if (e.key === "Bottom" || e.key === "ArrowDown") {
        downPressed = true;
    }
}
function keyUpHandler(e) { // клавиша НЕ нажата
    //влево-вправо
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
    //вверх-вниз
    if (e.key === "Top" || e.key === "ArrowUp") {
        upPressed = false;
    } else if (e.key === "Bottom" || e.key === "ArrowDown") {
        downPressed = false;
    }
    

}

// отрисовка персонажа
function playerDraw() {
    ctx.beginPath();
    ctx.fillRect(x, y, playerWidth, playerHeight);
    ctx.fillStyle = "red";
    ctx.fill;
    ctx.closePath();

    // проверка вправо-влево
    if (rightPressed) {
        x += 7;
        if (x + playerWidth > canvas.width) {
            x = canvas.width - playerWidth;
        }
    } else if (leftPressed) {
        x -= 6;
        if (playerWidth < 0) {
            playerWidth = 0;
        }
    }
    //проверка вверх-вниз
    if (downPressed) {
        y += 7;
        if (y + playerHeight > canvas.heght) {
            y = canvas.heght - playerHeight;
        }
    } else if (upPressed) {
        y -= 6;
        if (playerHeight < 0) {
            playerHeight = 0;
        }
    }
    
}

// рисуем!
function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height); // очистка каждого кадра
    playerDraw();
    
    // проверка верхнего и правого края
    if(y > canvas.height || y < 0) {
        y = 0;
    }
    // проверка нижнего края
    if (y === 500 || y > canvas.height){
        y = 500;
    }
        
    // проверка левого края
    if(x > canvas.width || x < 0) {
        x = 0;
    }
}


setInterval(draw, 10);





















