const GAME = {
    width: 448,
    height: 896,
}

const CELL = 64

const PLAYER_VELOCITY = 6
const PLAYER_PROJECTILE_VELOCITY = -10
const MAX_PLAYER_HEALTH = 5
const MAX_SCORE_STR_LENGTH = 7
const KILLS_AMOUNT_TO_HEAL = 25
const PLAYER_INVINCIBILITY_TIMER = 500

const ENEMIES_SPAWN_RATE = 1300

const BON_BON_VELOCITY_X = 0
const BON_BON_VELOCITY_Y = 5
const BON_BON_REWARD = 25

const ALAN_VELOCITY_X = 0
const ALAN_VELOCITY_Y = 1.2
const ALAN_RING_RADIUS = CELL * 2
const ALAN_RING_COLOR = "cyan"
const ALAN_REWARD = 50

const LIPS_VELOCITY_X = 2.5
const LIPS_VELOCUTY_Y = 0.3
const LIPS_FIRE_RATE = 300
const LIPS_REWARD = 200

const FUCKING_PADDING = 4
const ANIMATION_DURATION = 150

const POWER_ITEM_VELOCITY = 3
const POWER_ITEM_SPAWN_RATE = 20000

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

const EXPLOSION_TYPES = {
    Default: "Default",
    Sparkle: "Sparkle",
}