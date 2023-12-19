const context = document.getElementById("canvas")
const ctx = context.getContext("2d")

const PLAYER_VELOCITY = 5
const CELL = 64
const FUCKING_PADDING = 4

var GAME = {
    width: 448,
    height: 896,
}

canvas.width = GAME.width
canvas.height = GAME.height

// Нормально работающий скейл спрайтов
ctx.webkitImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;
// -------------------------------------


class Animation {
    constructor(width, height, maxCount) {
        this.image = new Image()
        this.width = width
        this.height = height
        this.count = 0
        this.maxCount = maxCount
        this.countDir = 1
    }

    increaseCount() {
        if (this.count + 1 <= this.maxCount) this.count++
        else this.count = 0
    }

    changeCount() {
        if (this.count === this.maxCount || this.count === 0) {
            this.countDir *= -1
        }

        this.count += this.countDir
    }
}

// Set background
class Background {
    constructor (x, y, height, image) {
        this.x = x
        this.y = y
        this.height = height
        this.animation = new Animation(image.width, image.height, 1)
        this.animation.image.src = image.src
    }
}

// Создаем картинку для бг
const backgroundImg = new Image()
backgroundImg.src = "./resources/MiniPixelPack/background.png"
// -----------------------------------------------------------

// Массив для создания анимации движения фона
const backgrounds = [
    new Background(0, 0, backgroundImg.height, backgroundImg),
    new Background(0, -backgroundImg.height, backgroundImg.height, backgroundImg)
]
// ------------------------------------------------------------------------------

// ---------------------------
// Player initialization
class Player {
    constructor(x, y, size, image, velocity) {
        this.x = x
        this.y = y
        this.size = size
        this.velocity = velocity
        this.animation = new Animation(size, size, 2)
        this.animation.image.src = image.src
    }
}

// Создаем картинку для игрока
const playerSpriteSheet = new Image()
playerSpriteSheet.src = "./resources/MiniPixelPack/Player/Player_ship.png"
// -----------------------------------------------------------------------

// Создаем картинку для бустеров
const boostersSpriteSheet = new Image()
boostersSpriteSheet.src = "./resources/MiniPixelPack/Player/Boosters.png"

// Инициализация игрока
const player = new Player(GAME.width / 2 - CELL / 2, GAME.height * 0.8, CELL, playerSpriteSheet, PLAYER_VELOCITY)
// ------------------------------------------------------------------------

function update() {
    // Двигаем фон вниз, если не видно - поднимаем наверх
    backgrounds.forEach(element => {
        var backgroundVelocity = 10
        element.y += backgroundVelocity

        if (element.y > element.height) {
            element.y = -element.height
        }
    });
}


// Задаем анимацию для бустеров
let boostersAnimation = new Animation(CELL * 2, CELL, 1)
//------------------------------------------------------

function drawPlayer() {
    ctx.drawImage(
        player.animation.image,
        CELL * player.animation.count,
        0,
        CELL,
        CELL,
        player.x,
        player.y,
        CELL,
        CELL,
    )

    ctx.drawImage(
        boostersSpriteSheet,
        CELL * boostersAnimation.count,
        0,
        CELL,
        CELL,
        player.x,
        (player.y + player.size) - FUCKING_PADDING,
        CELL,
        CELL
    )
}

setInterval(() => boostersAnimation.increaseCount(), 500)

// setInterval(() => player.animation.changeCount(), 1000);
player.animation.count = 1
function draw() {
    backgrounds.forEach(element => {
        ctx.drawImage(element.animation.image, element.x, element.y)
    });

    drawPlayer()
}

// Main cycle
function play() {
    update()
    draw()

    requestAnimationFrame(play)
}

play()
