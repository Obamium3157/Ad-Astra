const context = document.getElementById("canvas")
const ctx = context.getContext("2d")

canvas.width = GAME.width
canvas.height = GAME.height

const backgrounds = [
    new Background(0, 0, backgroundImg.height, backgroundImg),
    new Background(0, -backgroundImg.height, backgroundImg.height, backgroundImg)
]

const player = new Player(GAME.width / 2 - CELL / 2, GAME.height * 0.8, playerSpriteSheet, 0, 0)

const enemies = [
    new Enemy(100, 100, 15, ENEMY_TYPES.BonBon),
    new Enemy(100, 200, 15, ENEMY_TYPES.Alan),
    new Enemy(100, 300, 15, ENEMY_TYPES.Lips)
]

const projectiles = [
    new Projectile(200, 100, 7, PROJECTILE_TYPES.PlayerBeam),
    new Projectile(200, 200, 7, PROJECTILE_TYPES.PlayerChargedBeam),
    new Projectile(200, 300, 7, PROJECTILE_TYPES.LipsBall),
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

    // Player movement
    // player.x += player.velocityX
    // player.y += player.velocityY
    playerMovement()
}

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


initAnimation(enemies[0], ANIMATION_DURATION)
initAnimation(enemies[1], ANIMATION_DURATION)
initAnimation(enemies[2], ANIMATION_DURATION)
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


initAnimation(projectiles[0], ANIMATION_DURATION)
initAnimation(projectiles[1], ANIMATION_DURATION)
initAnimation(projectiles[2], ANIMATION_DURATION)
function drawProjectiles() {
    projectiles.forEach(p => {
        ctx.drawImage(
            p.animation.image,
            CELL * p.animation.count,
            0,
            CELL,
            CELL,
            p.x,
            p.y,
            CELL,
            CELL,
        )
    });
}

setInterval(() => boostersAnimation.increaseCount(), ANIMATION_DURATION * 1.25)

// setInterval(() => player.animation.changeCount(), 1000);
player.animation.count = 1
function draw() {
    backgrounds.forEach(element => {
        ctx.drawImage(element.animation.image, element.x, element.y)
    });

    drawPlayer()
    drawEnemies()
    drawProjectiles()
}

// Main cycle
function play() {
    update()
    draw()

    requestAnimationFrame(play)
}

play()
