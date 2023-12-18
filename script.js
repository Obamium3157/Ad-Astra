const context = document.getElementById("canvas")
const ctx = context.getContext("2d")

const BG_SCALE_FACTOR = 7
const PLAYER_SCALE_FACTOR = 3
const PLAYER_VELOCITY = 5

var GAME = {
    width: 64 * BG_SCALE_FACTOR,
    height: 128 * BG_SCALE_FACTOR,
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
        this.isPlaying = false
        this.count = 1
        this.maxCount = maxCount
    }

    increaseCount() {
        if (this.count + 1 < this.maxCount) {
            console.log("Incrisin'")
            this.count += 1
        } else {
            this.count = 0
        }
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

// Инициализация игрока
const player = new Player(200, 500, 16, playerSpriteSheet, PLAYER_VELOCITY)
// ------------------------------------------------------------------------

function update() {
    // Двигаем фон вниз, если не видно - поднимаем наверх
    backgrounds.forEach(element => {
        var backgroundVelocity = 2
        element.y += backgroundVelocity

        if (element.y > element.height) {
            element.y = -element.height
        }
    });
}

function drawPlayer() {
    // Скейл + отрисовка игрока
    // ctx.save()
    // ctx.scale(PLAYER_SCALE_FACTOR, PLAYER_SCALE_FACTOR)

    // ctx.drawImage(player.animation.image, 100 / PLAYER_SCALE_FACTOR, 100 / PLAYER_SCALE_FACTOR)

    // ctx.drawImage(player.animation.image, player.x, player.y,
    // player.animation.image.width * PLAYER_SCALE_FACTOR, player.animation.image.height * PLAYER_SCALE_FACTOR)
    ctx.drawImage(
        player.animation.image,
        16 * player.animation.count,
        0,
        16,
        16,
        player.x,
        player.y,
        16 * PLAYER_SCALE_FACTOR,
        16 * PLAYER_SCALE_FACTOR
    )
    // player.animation.increaseCount()
    // setTimeout(player.animation.increaseCount, 10000)
    setTimeout(() => player.animation.increaseCount, 100);

    // ctx.restore()
}

function draw() {
    backgrounds.forEach(element => {
        // Скейлим + рисуем фон (2 шт)
        ctx.save()
        ctx.scale(BG_SCALE_FACTOR, BG_SCALE_FACTOR)
        ctx.drawImage(element.animation.image, element.x, element.y)
        ctx.restore()
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