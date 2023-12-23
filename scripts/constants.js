const GAME = {
    width: 448,
    height: 896,
}

const CELL = 64

const PLAYER_VELOCITY = 5
const PLAYER_PROJECTILE_VELOCITY = -10

const ENEMIES_SPAWN_RATE = 2000

const BON_BON_VELOCITY_X = 0
const BON_BON_VELOCITY_Y = 5

const ALAN_VELOCITY_X = 0
const ALAN_VELOCITY_Y = 0.5
const ALAN_RING_RADIUS = CELL * 2
const ALAN_RING_COLOR = "cyan"

const LIPS_VELOCITY_X = 2.5
const LIPS_VELOCUTY_Y = 0.3
const LIPS_FIRE_RATE = 300

const FUCKING_PADDING = 4
const ANIMATION_DURATION = 150

const ENEMY_TYPES = {
    BonBon: "BonBon",
    Alan: "Alan",
    Lips: "Lips",
}

const PROJECTILE_TYPES = {
    PlayerBeam: "PlayerBeam",
    PlayerChargedBeam: "PlayerChargedBeam",
    LipsBall: "LipsBall",
}