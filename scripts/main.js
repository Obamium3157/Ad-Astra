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

const projectiles = []

function update() {
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
        CELL * player.boostersAnimation.count,
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

setInterval(() => player.boostersAnimation.increaseCount(), ANIMATION_DURATION * 2)


function createProjectile(type) {
    var p = new Projectile(player.x, player.y, PLAYER_PROJECTILE_VELOCITY, type)
    projectiles.push(p)
}

function drawProjectile(p) {
    p.y -= p.velocity
    if (p.y < 0) projectiles.splice(projectiles.indexOf(p), 1)

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
}


setInterval(() => createProjectile(PROJECTILE_TYPES.PlayerBeam), 100)
// setInterval(() => createProjectile(PROJECTILE_TYPES.PlayerChargedBeam), 100)

player.animation.count = 1
function draw() {
    backgrounds.forEach(element => {
        ctx.drawImage(element.animation.image, element.x, element.y)
        
        // Я сделал это в целях оптимизации, простите
        var backgroundVelocity = 10
        element.y += backgroundVelocity

        if (element.y > element.height) {
            element.y = -element.height
        }
    });

    drawPlayer()
    drawEnemies()
    
    projectiles.forEach(p => drawProjectile(p))
}


function play() {
    update()
    draw()

    requestAnimationFrame(play)
}

play()
