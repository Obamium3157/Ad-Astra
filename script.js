//TODO: добавть модель игрока с анимациями

const context = document.getElementById("canvas")
const ctx = context.getContext("2d")

const BG_SCALE_FACTOR = 7

var GAME = {
    width: 64 * BG_SCALE_FACTOR,
    height: 128 * BG_SCALE_FACTOR,
}

canvas.width = GAME.width
canvas.height = GAME.height

ctx.webkitImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;


// Set background
class Background {
    constructor (x, y, height, image) {
        this.x = x
        this.y = y
        this.height = height
        this.image = image
    }
}

const backgroundImg = new Image()
backgroundImg.src = "./resources/MiniPixelPack/background.png"
backgroundImg.onload = loadImages

const backgrounds = [
    new Background(0, 0, backgroundImg.height, backgroundImg),
    new Background(0, -backgroundImg.height, backgroundImg.height, backgroundImg)
]

// Number of images in JS file
let numOfImages = 1
function loadImages() {
    if (--numOfImages > 0) return

    ctx.scale(BG_SCALE_FACTOR, BG_SCALE_FACTOR)
}


function update() {
    backgrounds.forEach(element => {
        var backgroundVelocity = 2
        element.y += backgroundVelocity

        if (element.y > element.height) {
            element.y = -element.height
        }
    });
}

function draw() {
    backgrounds.forEach(element => {
        ctx.drawImage(element.image, element.x, element.y)
    });
}

// Main cycle
function play() {
    update()
    draw()

    requestAnimationFrame(play)
}

play()