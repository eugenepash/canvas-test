let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let x = 0;
let y = 0;
let playerWidth = 50;
let playerHeight = 50;
let playerRadius = playerWidth / 2;
let sizePlayer = playerWidth + playerHeight;

let rightPressed = 0;
let leftPressed = 0;
let downPressed = 0;
let upPressed = 0;

// Обработчики кнопок:
const setRedColor = document.querySelector('#setRedColor');
const setYellowColor = document.querySelector('#setYellowColor');
const setBlueColor = document.querySelector('#setBlueColor');
const setFormQuadr = document.querySelector('#setFormQuadr');
const setFormCircle = document.querySelector('#setFormCircle');
// COLORS
const red = '#b2203a';
const yellow = '#edd207';
const blue = '#334cc6';
let colorPlayer = '#b2203a';


// ВЫБОР ЦВЕТА
setRedColor.onclick = function () {
    colorPlayer = red; //red
}
setYellowColor.onclick = function () {
    colorPlayer = yellow; //yellow
}
setBlueColor.onclick = function () {
    colorPlayer = blue; //blue
}
//Выбор формы
setFormQuadr.onclick = function () {

}



// обработка клавиш
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) { // клавиша нажата
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

// ОБРАБОТЧИК МЫШИ
function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const xm = event.clientX - (playerWidth / 2) - rect.left;
    const ym = event.clientY - (playerHeight / 2) - rect.top;
    const xr = event.clientX - (playerWidth / playerRadius) - rect.left;
    const yr = event.clientY - (playerHeight / playerRadius) - rect.top;

    if (setFormQuadr.checked) {
        x = xm;
        y = ym;
    }
    if (setFormCircle.checked){
        x = xr;
        y = yr;
    }

}
canvas.addEventListener('mousemove', function (e) {
    getCursorPosition(canvas, e);
})


// отрисовка персонажа
function playerDraw() {
    if (setFormQuadr.checked) {
        ctx.beginPath();
        ctx.fillRect(x, y, playerWidth, playerHeight);
        ctx.fillStyle = colorPlayer;
        ctx.fill;
        ctx.closePath();
    }
    if (setFormCircle.checked) {
        ctx.beginPath();
        ctx.fillStyle = colorPlayer;
        ctx.arc(x, y, playerRadius, 0, 2 * Math.PI, true);
        ctx.fill();
        ctx.closePath();
    }

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
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // очистка каждого кадра
    playerDraw();
    
    // коллизия квадрата
    if (setFormQuadr.checked) {
    // Проверка верхнего края
    if (y < 0) {
        y = 0;
    }
    // проверка правого края
    if (x > canvas.width - playerWidth) {
        x = canvas.width - playerWidth;
    }
    // проверка нижнего края
    if (y > canvas.height - playerHeight) {
        y = canvas.height - playerHeight;
    }

    // проверка левого края
    if (x > canvas.width || x < 0) {
        x = 0;
    }
    }
    
    // коллизия круга =============================
    if (setFormCircle.checked) {
    // Проверка верхнего края
    if (y < 0 + playerRadius) {
        y = 0 + playerRadius;
    }
    // проверка правого края
    if (x > canvas.width - playerWidth + playerRadius) {
        console.log('yes');
        x = canvas.width - playerWidth + playerRadius
    }
    // проверка нижнего края
    if (y > canvas.height - playerRadius) {
        y = canvas.height - playerRadius;
    }
    // проверка левого края
    if (x < 0 + playerRadius) {
        x = 0 + playerRadius;
    }
    }
}
let timer = setInterval(function () {
    draw(0.01);
}, 0.01);



