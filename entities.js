class Player {
    constructor(x, y, image, vx, vy) {
        this.x = x
        this.y = y
        this.size = CELL
        this.velocityX = vx
        this.velocityY = vy
        this.animation = new Animation(CELL, CELL, 2)
        this.animation.image.src = image.src
    }

    stop() {
        this.velocityX = 0
        this.velocityY = 0
    }
    moveUp() {
        this.velocityX = 0
        this.velocityY = -PLAYER_VELOCITY
    }
    moveUpRight() {
        this.velocityX = PLAYER_VELOCITY
        this.velocityY = -PLAYER_VELOCITY
    }
    moveRight() {
        this.velocityX = PLAYER_VELOCITY
        this.velocityY = 0
    }
    moveBottomRight() {
        this.velocityX = PLAYER_VELOCITY
        this.velocityY = PLAYER_VELOCITY
    }
    moveBottom() {
        this.velocityX = 0
        this.velocityY = PLAYER_VELOCITY
    }
    moveBottomLeft() {
        this.velocityX = -PLAYER_VELOCITY
        this.velocityY = PLAYER_VELOCITY
    }
    moveLeft() {
        this.velocityX = -PLAYER_VELOCITY
        this.velocityY = 0
    }
    moveUpLeft() {
        this.velocityX = -PLAYER_VELOCITY
        this.velocityY = -PLAYER_VELOCITY
    }
}

class Enemy {
    constructor (x, y, velocity, type) {
        this.x = x
        this.y = y
        this.size = CELL
        this.velocity = velocity
        this.type = type

        switch (type) {
            case ENEMY_TYPES.BonBon:
                console.log("bb")
                this.animation = new Animation(CELL, CELL, bonBonAnimationFrames)
                this.animation.image = bonBonSpriteSheet
                break
            case ENEMY_TYPES.Alan:
                console.log("anal")
                this.animation = new Animation(CELL, CELL, alanAnimationFrames)
                this.animation.image = alanSpriteSheet
                break
            case ENEMY_TYPES.Lips:
                console.log("ayo")
                this.animation = new Animation(CELL, CELL, lipsAnimationFrames)
                this.animation.image = lipsSpriteSheet
                break
        }
    }
}

class Projectile {
    constructor(x, y, velocity, type) {
        this.x = x
        this.y = y
        this.velocity = velocity
        this.type = type

        this.isHostile = (type !== PROJECTILE_TYPES.PlayerBeam || type !== PROJECTILE_TYPES.PlayerChargedBeam)

        switch (type) {
            case PROJECTILE_TYPES.PlayerBeam:
                this.animation = new Animation(CELL, CELL, playerBeamFrames)
                this.animation.image = playerBeamSpriteSheet
                break
            case PROJECTILE_TYPES.PlayerChargedBeam:
                this.animation = new Animation(CELL, CELL, playerChargedBeamFrames)
                this.animation.image = playerChargedBeamSpriteSheet
                break
            case PROJECTILE_TYPES.LipsBall:
                this.animation = new Animation(CELL, CELL, enemyProjectileFrames)
                this.animation.image = enemyProjectileSpriteSheet
                break
        }
    }
}