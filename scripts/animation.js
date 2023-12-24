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

function initAnimation(entity, sleepTime) {
    setInterval(() => entity.animation.increaseCount(), sleepTime)
}

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

// Создаем картинку для игрока
const playerSpriteSheet = new Image()
playerSpriteSheet.src = "./resources/MiniPixelPack/Player/Player_ship.png"
// -----------------------------------------------------------------------

// Создаем картинку для бустеров
const boostersSpriteSheet = new Image()
boostersSpriteSheet.src = "./resources/MiniPixelPack/Player/Boosters.png"

// Создаем картинку для Bon_bon
const bonBonSpriteSheet = new Image()
bonBonSpriteSheet.src = "./resources/MiniPixelPack/Enemies/Bon_Bon.png"
const bonBonAnimationFrames = 3
// --------------------------------------------------------------------

// Создаем картинку для Alan
const alanSpriteSheet = new Image()
alanSpriteSheet.src = "./resources/MiniPixelPack/Enemies/Alan.png"
const alanAnimationFrames = 5
// ---------------------------------------------------------------

// Создаем картинку для Lips
const lipsSpriteSheet = new Image()
lipsSpriteSheet.src = "./resources/MiniPixelPack/Enemies/Lips.png"
const lipsAnimationFrames = 4
// ---------------------------------------------------------------

// Создаем картинку для снаряда игрока
const playerBeamSpriteSheet = new Image()
playerBeamSpriteSheet.src = "./resources/MiniPixelPack/Projectiles/Player_beam.png"
let playerBeamFrames = 0
// --------------------------------------------------------------------------------

// Создаем картинку для заряженного снаряда игрока
const playerChargedBeamSpriteSheet = new Image()
playerChargedBeamSpriteSheet.src = "./resources/MiniPixelPack/Projectiles/Player_charged_beam.png"
let playerChargedBeamFrames = 1
// -----------------------------------------------------------------------------------------------

// Создаем картинку для снаряда противника
const enemyProjectileSpriteSheet = new Image()
enemyProjectileSpriteSheet.src = "./resources/MiniPixelPack/Projectiles/Enemy_projectile.png"
let enemyProjectileFrames = 3
// ------------------------------------------------------------------------------------------

// Создаем картинку для отображения здоровья игрока
const playerHealthSprite = new Image()
playerHealthSprite.src = "./resources/MiniPixelPack/UI objects/Player Life Icon.png"
// -------------------------------------------------------------------------------

const numberFontSpriteSheet = new Image()
numberFontSpriteSheet.src = "./resources/MiniPixelPack/UI objects/Number font.png"

// Создаем картинку для надписи "Game Over"
const gameOverSprite = new Image()
gameOverSprite.src = "./resources/MiniPixelPack/UI objects/GameOver.png"
// ---------------------------------------------------------------------


function drawPlayerHealth(ctx, player) {
    for (let i = 0; i < player.health; i++) {
        ctx.drawImage(
            playerHealthSprite,
            i * 48,
            GAME.height - CELL
        )
    }
}

function drawScore(ctx, scoreStr) {
    let columns = 5
    let rows = 2
    let colSize = 120 / columns
    let rowSize = 48 / rows

    for (let i = 0; i < scoreStr.length; i++) {
        let currentFrameX = 0
        let currentFrameY = 0
        let currentChar = scoreStr[i]
        let currentInt = parseInt(currentChar)

        let dx = GAME.width - (rowSize * (scoreStr.length + 1 - i))
        let dy = GAME.height - CELL + colSize / 2

        switch (currentChar) {
            case "0":
                currentFrameX = rowSize * 4
                break
            case "1":
                currentFrameX = rowSize * 0
                break
            case "2":
                currentFrameX = rowSize * 1
                break
            case "3":
                currentFrameX = rowSize * 2
                break
            case "4":
                currentFrameX = rowSize * 3
                break
            case "5":
                currentFrameX = rowSize * 4
                break
            case "6":
                currentFrameX = rowSize * 0
                break
            case "7":
                currentFrameX = rowSize * 1
                break
            case "8":
                currentFrameX = rowSize * 2
                break
            case "9":
                currentFrameX = rowSize * 3
                break
        }

        // currentFrameX = rowSize * (currentInt % 5);

        if (6 <= currentInt && currentInt <= 9 || currentInt == 0) currentFrameY = colSize
        
        ctx.drawImage(
            numberFontSpriteSheet,
            currentFrameX,
            currentFrameY,
            rowSize,
            colSize,
            dx,
            dy,
            rowSize,
            colSize
        )
    }
}

function drawGameOver(ctx) {
    ctx.drawImage(
        gameOverSprite,
        (GAME.width / 2) - (288 / 2),
        (GAME.height / 2) - (32 / 2)
    )
}