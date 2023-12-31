class Player {
    constructor(x, y, image, vx, vy) {
        this.x = x
        this.y = y
        this.size = CELL
        this.velocityX = vx
        this.velocityY = vy

        this.score = 0
        this.kills = 0
        this.scoreTimer = setInterval(() => this.increaseScore(1), 10)

        this.currentWeaponType = PROJECTILE_TYPES.PlayerBeam

        this.health = MAX_PLAYER_HEALTH
        this.isInvincible = false

        this.animation = new Animation(CELL, CELL, 2)
        this.animation.image.src = image.src

        this.boostersAnimation = new Animation(CELL * 2, CELL, 1)        
    }

    scoreToString() {
        this.score = Math.min(this.score, 9999999)
        
        return String(this.score).padStart(MAX_SCORE_STR_LENGTH, "0")
    }

    increaseHealth() {
        if (0 < this.health && this.health < 5) {
            this.health++
        }
    }

    increaseScore(amount) {
        if (0 <= this.score + amount) {
            this.score += amount
        }
    }

    stop() {
        this.velocityX = 0
        this.velocityY = 0

        this.animation.count = 1
    }
    moveUp() {
        this.velocityX = 0
        this.velocityY = -PLAYER_VELOCITY

        this.animation.count = 1
    }
    moveUpRight() {
        this.velocityX = PLAYER_VELOCITY
        this.velocityY = -PLAYER_VELOCITY

        this.animation.count = 2
    }
    moveRight() {
        this.velocityX = PLAYER_VELOCITY
        this.velocityY = 0

        this.animation.count = 2
    }
    moveBottomRight() {
        this.velocityX = PLAYER_VELOCITY
        this.velocityY = PLAYER_VELOCITY

        this.animation.count = 2
        this.boostersAnimation.count = 3
    }
    moveBottom() {
        this.velocityX = 0
        this.velocityY = PLAYER_VELOCITY

        this.animation.count = 1
        this.boostersAnimation.count = 3
    }
    moveBottomLeft() {
        this.velocityX = -PLAYER_VELOCITY
        this.velocityY = PLAYER_VELOCITY

        this.animation.count = 0
        this.boostersAnimation.count = 3
    }
    moveLeft() {
        this.velocityX = -PLAYER_VELOCITY
        this.velocityY = 0

        this.animation.count = 0
    }
    moveUpLeft() {
        this.velocityX = -PLAYER_VELOCITY
        this.velocityY = -PLAYER_VELOCITY

        this.animation.count = 0
    }
}


class AlanRing {
    constructor(parent) {
        this.parent = parent
        this.radius = ALAN_RING_RADIUS
        this.color = ALAN_RING_COLOR
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.arc(this.parent.x + CELL / 2, this.parent.y + CELL / 2, this.radius, 0, 2 * Math.PI)
        ctx.lineWidth = 1
        ctx.strokeStyle = this.color
        ctx.stroke()
    }
}


class Enemy {
    constructor (x, y, type) {
        this.x = x
        this.y = y
        this.size = CELL
        this.type = type
        this.shootInterval = null

        switch (type) {
            case ENEMY_TYPES.BonBon:
                this.velocityX = BON_BON_VELOCITY_X
                this.velocityY = BON_BON_VELOCITY_Y

                this.health = 2

                this.animation = new Animation(CELL, CELL, bonBonAnimationFrames)
                this.animation.image = bonBonSpriteSheet
                break
            case ENEMY_TYPES.Alan:
                this.velocityX = ALAN_VELOCITY_X
                this.velocityY = ALAN_VELOCITY_Y

                this.health = 10

                this.alanRing = new AlanRing(this)

                this.animation = new Animation(CELL, CELL, alanAnimationFrames)
                this.animation.image = alanSpriteSheet
                break
            case ENEMY_TYPES.Lips:
                this.velocityX = LIPS_VELOCITY_X
                this.velocityY = LIPS_VELOCUTY_Y

                this.health = 20

                this.animation = new Animation(CELL, CELL, lipsAnimationFrames)
                this.animation.image = lipsSpriteSheet
                break
        }

        initAnimation(this, ANIMATION_DURATION)
    }
}

function bonBonMovementLogic(bonBon) {
    bonBon.x += bonBon.velocityX
    bonBon.y += bonBon.velocityY
}

function alanMovementLogic(alan) {
    alan.x += alan.velocityX
    alan.y += alan.velocityY
}

function lipsMovementLogic(lips) {
    if (lips.x + lips.velocityX <= 0 || lips.x + lips.size + lips.velocityX >= GAME.width) lips.velocityX *= -1

    lips.x += lips.velocityX
    lips.y += lips.velocityY
}


function enemiesMovementLogic(enemies) {
    enemies.forEach(e => {
        switch (e.type) {
            case ENEMY_TYPES.BonBon:
                bonBonMovementLogic(e)
                break

            case ENEMY_TYPES.Alan:
                alanMovementLogic(e)
                break

            case ENEMY_TYPES.Lips:
                lipsMovementLogic(e)
                break
        }

        if (e.y > GAME.height) {
            player.increaseScore(-100)
            enemies.splice(enemies.indexOf(e), 1)
        }
    })
}

class Projectile {
    constructor(x, y, vX, vY, type) {
        this.x = x
        this.y = y
        this.velocityX = vX
        this.velocityY = vY
        this.type = type
        this.damage = 0
        this.velocityMultiplyer = 1

        this.isHostile = (type !== PROJECTILE_TYPES.PlayerBeam || type !== PROJECTILE_TYPES.PlayerChargedBeam)

        switch (this.type) {
            case PROJECTILE_TYPES.PlayerBeam:
                this.damage = 1

                this.animation = new Animation(CELL, CELL, playerBeamFrames)
                this.animation.image = playerBeamSpriteSheet
                break
            case PROJECTILE_TYPES.PlayerChargedBeam:
                this.damage = 2

                this.animation = new Animation(CELL, CELL, playerChargedBeamFrames)
                this.animation.image = playerChargedBeamSpriteSheet
                break
            case PROJECTILE_TYPES.LipsBall:
                this.animation = new Animation(CELL, CELL, enemyProjectileFrames)
                this.animation.image = enemyProjectileSpriteSheet
                break
            default:
                break
        }

        initAnimation(this, ANIMATION_DURATION)
    }
}


class PowerItem {
    constructor(x, y) {
        this.x = x
        this.y = y

        this.animation = new Animation(CELL, CELL, powerItemFrames)
        this.animation.image = powerItemSpriteSheet

        initAnimation(this, ANIMATION_DURATION * 2)
    }
}

class Explosion {
    constructor(x, y, type) {
        this.x = x
        this.y = y


        switch (type) {
            case EXPLOSION_TYPES.Default:
                this.animation = new Animation(CELL, CELL, explosionFrames)
                this.animation.image = explosionSpriteSheet
                break
            case EXPLOSION_TYPES.Sparkle:
                this.animation = new Animation(CELL, CELL, sparkleFrames)
                this.animation.image = sparkleSpriteSheet
                break
        }

        initAnimation(this, ANIMATION_DURATION / 3)
    }
}