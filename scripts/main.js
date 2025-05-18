const context = document.getElementById("canvas")
const ctx = context.getContext("2d")

canvas.width = GAME.width
canvas.height = GAME.height

const backgrounds = [
    new Background(0, 0, backgroundImg.height, backgroundImg),
    new Background(0, -backgroundImg.height, backgroundImg.height, backgroundImg)
]

let playerInitialPositionX = GAME.width / 2 - CELL / 2
let playerInitialPositionY = GAME.height * 0.8

const player = new Player(playerInitialPositionX, playerInitialPositionY, playerSpriteSheet, 0, 0)

var enemies = []

var projectiles = []

var powerItems = []

var effects = []

function spawnEnemy(x, y, type) {
    enemies.push(new Enemy(x, y, type))
}

function spawnEnemiesLogic() {
    let enemyType = Math.floor(Math.random() * 10 + 1)
    let randX = Math.random() * (GAME.width - CELL)

    if (enemyType % 2 === 0) {
        let max = 6
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
        e.shootInterval = setInterval(() => lipsAttackLogic(e), LIPS_FIRE_RATE)
    }
}

function spawnPowerItemsLogic() {
    let x = Math.random() * (GAME.width - CELL)
    let y = -CELL

    powerItems.push(new PowerItem(x, y))
}


function lipsAttackLogic(lips) {
    let x = player.x
    let y = player.y

    let sx = lips.x
    let sy = lips.y + CELL / 2

    let dx = x - sx
    let dy = y - sy
    let hyp = Math.sqrt(dx*dx + dy*dy);

    let distX = dx / hyp * LIPS_PROJECTILE_VELOCITY;
    let distY = dy / hyp * LIPS_PROJECTILE_VELOCITY;

    // projectiles.push(new Projectile(sx, sy, dx / 80, dy / 80, PROJECTILE_TYPES.LipsBall))
    projectiles.push(new Projectile(sx, sy, distX, distY, PROJECTILE_TYPES.LipsBall))
}

function enemyTakeDamage(e, p, isPlayerContact) {
    e.health -= p.damage
    if (e.health <= 0 || isPlayerContact) {
        if (enemies[enemies.indexOf(e)].type === ENEMY_TYPES.Lips)
            clearInterval(enemies[enemies.indexOf(e)].shootInterval)

        switch (e.type) {
            case ENEMY_TYPES.BonBon:
                player.increaseScore(BON_BON_REWARD)
                break
            case ENEMY_TYPES.Alan:
                player.increaseScore(ALAN_REWARD)
                break
            case ENEMY_TYPES.Lips:
                player.increaseScore(LIPS_REWARD)
        }

        player.kills++
        if (player.kills % KILLS_AMOUNT_TO_HEAL === 0) {
            player.increaseHealth()
        }

        if (p.type === PROJECTILE_TYPES.PlayerBeam) {
            effects.push(new Explosion(e.x, e.y, EXPLOSION_TYPES.Sparkle))
        } else {
            effects.push(new Explosion(e.x, e.y, EXPLOSION_TYPES.Default))
        }

        enemies.splice(enemies.indexOf(e), 1)
    }
}

function setPlayerIsInvencibleToFalse() {
    player.isInvincible = false
}

function playerTakeDamage() {
    if (!player.isInvincible) {
        player.health -= 1
        effects.push(new Explosion(player.x, player.y, EXPLOSION_TYPES.Default))
    }
    player.isInvincible = true
    setTimeout(setPlayerIsInvencibleToFalse, PLAYER_INVINCIBILITY_TIMER)

    if (player.health <= 0) {
        GAME.isOver = true
        clearInterval(player.scoreTimer)
    }
}

function update() {
    playerMovement()
    enemiesMovementLogic(enemies)
    checkPlayerCollision()
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
    p.isHostile = false
    projectiles.push(p)
}

function drawProjectile(p) {
    p.x += p.velocityX * p.velocityMultiplyer
    p.y += p.velocityY * p.velocityMultiplyer

    let upCond = p.y < -CELL
    let rightCond = p.x > GAME.width
    let leftCond = p.x < -CELL
    let bottomCond = p.y > GAME.height
    if (upCond || rightCond || leftCond || bottomCond) projectiles.splice(projectiles.indexOf(p), 1)

    // Check enemy collision
    enemies.forEach(e => {
        let xCond = e.x - CELL / 1.5 <= p.x && p.x <= e.x + CELL / 1.5
        let yCond = e.y - CELL / 1.5 <= p.y && p.y <= e.y + CELL / 1.5

        if (xCond && yCond && !p.isHostile) {
            enemyTakeDamage(e, p, false)
            projectiles.splice(projectiles.indexOf(p), 1)
        }

        if (e.type === ENEMY_TYPES.Alan) {
            let x0 = e.x
            let y0 = e.y
            let x1 = p.x
            let y1 = p.y

            if (Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0)) < e.alanRing.radius) {
                if (p.isHostile) {
                    p.velocityMultiplyer = 2.5
                } else {
                    p.velocityMultiplyer = 0.1
                }
            }
        }
    })

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


function drawPowerItem(i) {
    i.y += POWER_ITEM_VELOCITY

    if (i.y > GAME.height) {
        powerItems.splice(powerItems.indexOf(i))
    }

    ctx.drawImage(
        i.animation.image,
        CELL * i.animation.count,
        0,
        CELL,
        CELL,
        i.x,
        i.y,
        CELL,
        CELL
    )
}


function drawEffect(e) {
    ctx.drawImage(
        e.animation.image,
        CELL * e.animation.count,
        0,
        CELL,
        CELL,
        e.x,
        e.y,
        CELL,
        CELL
    )

    let maxCount = (e.type === EXPLOSION_TYPES.Default) ? explosionFrames : sparkleFrames

    if (e.animation.count >= maxCount) {
        effects.splice(effects.indexOf(e), 1)
    }
}

function setPlayerDefaultWeaponType() {
    player.currentWeaponType = PROJECTILE_TYPES.PlayerBeam
}

function checkPlayerCollision() {
    enemies.forEach(e => {
        let playerXCond = e.x - CELL / 1.5 <= player.x && player.x <= e.x + CELL / 1.5
        let playerYCond = e.y - CELL / 1.5 <= player.y && player.y <= e.y + CELL / 1.5

        if (playerXCond && playerYCond) {
            enemyTakeDamage(e, e.health, true)
            playerTakeDamage()
        }
    })

    projectiles.forEach(p => {
        if (p.isHostile) {
            let xCond = player.x - CELL / 1.5 <= p.x && p.x <= player.x + CELL / 1.5
            let yCond = player.y - CELL / 1.5 <= p.y && p.y <= player.y + CELL / 1.5

            if (xCond && yCond) {
                playerTakeDamage()
                projectiles.splice(projectiles.indexOf(p), 1)
            }
        }
    })

    powerItems.forEach(i => {
        let ixCond = player.x - CELL / 1.5 <= i.x && i.x <= player.x + CELL / 1.5
        let iyCond = player.y - CELL / 1.5 <= i.y && i.y <= player.y + CELL / 1.5

        if (ixCond && iyCond) {
            powerItems.splice(powerItems.indexOf(i), 1)

            player.currentWeaponType = PROJECTILE_TYPES.PlayerChargedBeam
            setTimeout(setPlayerDefaultWeaponType, 10000)
        }
    })
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
    })

    drawPlayer()
    drawEnemies()
    
    projectiles.forEach(p => drawProjectile(p))
    powerItems.forEach(i => drawPowerItem(i))
    effects.forEach(e => drawEffect(e))

    // UI
    drawPlayerHealth(ctx, player)
}

function play() {
    if (!GAME.isOver) {
        update()
        draw()
        drawScore(ctx, player.scoreToString(), false)
    } else {
        // Draw background
        backgrounds.forEach(element => {
            ctx.drawImage(element.animation.image, element.x, element.y)
            
            var backgroundVelocity = 10
            element.y += backgroundVelocity
    
            if (element.y > element.height) {
                element.y = -element.height
            }
        })

        clearInterval(player.scoreTimer)

        drawGameOver(ctx)
        drawScore(ctx, player.scoreToString(), true)
    }

    requestAnimationFrame(play)
}


document.addEventListener('keydown', function(e) {
    let g = String(e.key).toUpperCase()
    if (GAME.isOver && g != null) {
        enemies.forEach(e => {
            if (e.type === ENEMY_TYPES.Lips) {
                clearInterval(e.shootInterval)
            }
        })

        enemies = []
        projectiles = []
        powerItems = []
        effects = []

        player.x = playerInitialPositionX
        player.y = playerInitialPositionY
        player.health = MAX_PLAYER_HEALTH
        player.score = 0
        player.scoreTimer = setInterval(() => player.increaseScore(1), 10)
        player.kills = 0
        player.currentWeaponType = PROJECTILE_TYPES.PlayerBeam

        GAME.isOver = false
    }
})

setInterval(() => player.boostersAnimation.increaseCount(), ANIMATION_DURATION * 2)

setInterval(() => createProjectile(player.currentWeaponType), 100)

setInterval(() => spawnEnemiesLogic(), ENEMIES_SPAWN_RATE)
setInterval(() => spawnPowerItemsLogic(), POWER_ITEM_SPAWN_RATE)

play()
