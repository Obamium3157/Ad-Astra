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
    constructor(x, y, image, velocity) {
        this.x = x
        this.y = y
        this.size = CELL
        this.velocity = velocity
        this.animation = new Animation(CELL, CELL, 2)
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
const player = new Player(GAME.width / 2 - CELL / 2, GAME.height * 0.8, playerSpriteSheet, PLAYER_VELOCITY)
// --------------------------------------------------------------------------------------------------------------


// Enemy initialization
const ENEMY_TYPES = {
    BonBon: "BonBon",
    Alan: "Alan",
    Lips: "Lips",
}

// Создаем картинку для Bon_bon
const bonBonSpriteSheet = new Image()
bonBonSpriteSheet.src = "./resources/MiniPixelPack/Enemies/Bon_Bon.png"
const bonBonAnimationFrames = 4
// --------------------------------------------------------------------

// Создаем картинку для Alan
const alanSpriteSheet = new Image()
alanSpriteSheet.src = "./resources/MiniPixelPack/Enemies/Alan.png"
const alanAnimationFrames = 6

// Создаем картинку для Lips
const lipsSpriteSheet = new Image()
lipsSpriteSheet.src = "./resources/MiniPixelPack/Enemies/Lips.png"
const lipsAnimationFrames = 5


class Enemy {
    constructor (x, y, velocity, type) {
        this.x = x
        this.y = y
        this.size = CELL
        this.velocity = velocity
        this.type = type

        switch (type) {
            case ENEMY_TYPES.BonBon:
                this.animation = new Animation(CELL, CELL, bonBonAnimationFrames)
                this.animation.image.src = bonBonSpriteSheet
                break
            case ENEMY_TYPES.Alan:
                this.animation = new Animation(CELL, CELL, alanAnimationFrames)
                this.animation.image.src = alanSpriteSheet
                break
            case ENEMY_TYPES.Lips:
                this.animation = new Animation(CELL, CELL, lipsAnimationFrames)
                this.animation.image.src = lipsSpriteSheet
                break
        }
    }
}


const enemies = [
    new Enemy(100, 100, 15, ENEMY_TYPES.BonBon)
]

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

function drawEnemies() {
    enemies.forEach(e => {
        ctx.drawImage(
            e.animation.image,
            CELL * e.animation.count,
            0,
            CELL,
            CELL,
            e.x,
            e.y,
            CELL,
            CELL,
        )
    })
}

setInterval(() => boostersAnimation.increaseCount(), 500)

// setInterval(() => player.animation.changeCount(), 1000);
player.animation.count = 1
function draw() {
    backgrounds.forEach(element => {
        ctx.drawImage(element.animation.image, element.x, element.y)
    });

    drawPlayer()
    drawEnemies()
}

// Main cycle
function play() {
    update()
    draw()

    requestAnimationFrame(play)
}

play()
