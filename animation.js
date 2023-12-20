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