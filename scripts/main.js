const context = document.getElementById("canvas")
const ctx = context.getContext("2d")

canvas.width = GAME.width
canvas.height = GAME.height

const backgrounds = [
    new Background(0, 0, backgroundImg.height, backgroundImg),
    new Background(0, -backgroundImg.height, backgroundImg.height, backgroundImg)
]

const player = new Player(GAME.width / 2 - CELL / 2, GAME.height * 0.8, playerSpriteSheet, 0, 0)

const enemies = []

const projectiles = []

function spawnEnemy(x, y, type) {
    enemies.push(new Enemy(x, y, type))
}

function spawnEnemiesLogic() {
    let enemyType = Math.floor(Math.random() * 10 + 1)
    let randX = Math.random() * (GAME.width - CELL)

    if (enemyType % 2 === 0) {
        let max = 8
        let min = 4
        let finalAmount = Math.floor(Math.random() * (max - min + 1) + min)
        for (let i = 0; i < finalAmount; i++) {
            spawnEnemy(randX, -CELL * i, ENEMY_TYPES.BonBon)
        } 
    } else if (enemyType % 3 == 0) {
        spawnEnemy(randX, -CELL, ENEMY_TYPES.Alan)
    } else if (enemyType % 5 == 0) {
        let e = new Enemy(randX, -CELL, ENEMY_TYPES.Lips)
        enemies.push(e)
        setInterval(() => lipsAttackLogic(e), LIPS_FIRE_RATE)
    }
}


function lipsAttackLogic(lips) {
    let x = player.x
    let y = player.y

    let sx = lips.x
    let sy = lips.y + CELL / 2

    let resX = x - sx
    let resY = y - sy

    projectiles.push(new Projectile(sx, sy, resX / 80, resY / 80, PROJECTILE_TYPES.LipsBall))
}

function update() {
    playerMovement()
    enemiesMovementLogic(enemies)
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

        if (e.type === ENEMY_TYPES.Alan) {
            e.alanRing.draw(ctx)
        }
    })
}


function createProjectile(type) {
    var p = new Projectile(player.x, player.y, 0, PLAYER_PROJECTILE_VELOCITY, type)
    projectiles.push(p)
}

function drawProjectile(p) {
    p.x += p.velocityX
    p.y += p.velocityY

    let upCond = p.y < 0
    let rightCond = p.x > GAME.width
    let leftCond = p.x < 0
    let bottomCond = p.y > GAME.height
    if (upCond || rightCond || leftCond || bottomCond) projectiles.splice(projectiles.indexOf(p), 1)

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


player.animation.count = 1
function draw() {
    backgrounds.forEach(element => {
        ctx.drawImage(element.animation.image, element.x, element.y)
        
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


setInterval(() => player.boostersAnimation.increaseCount(), ANIMATION_DURATION * 2)

setInterval(() => createProjectile(PROJECTILE_TYPES.PlayerBeam), 100)
// setInterval(() => createProjectile(PROJECTILE_TYPES.PlayerChargedBeam), 100)

setInterval(() => spawnEnemiesLogic(), ENEMIES_SPAWN_RATE)

play()
