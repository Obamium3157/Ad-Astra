var buttonPressed = Array();


document.addEventListener('keydown', function(e){
    g = String(e.key).toUpperCase()
    if ((["A", "D", "S", "W"].includes(g)) && (!buttonPressed.includes(g))){
        buttonPressed.push(g)
    }

    if (g === "P") {
        GAME.isSoundOn = !GAME.isSoundOn
        console.log("Hehe")
    }
});


document.addEventListener('keyup', function(e){
    g = String(e.key).toUpperCase()
    buttonPressed.splice(buttonPressed.indexOf(g), 1)
    if(g == 'D'){
        player.velocityX = 0
        player.animation.count = 1
    } 
    else if(g == 'A') {
        player.velocityX = 0
        player.animation.count = 1
    } 
    else if(g == 'W')  {
        player.velocityY = 0
        player.animation.count = 1
    }  
    else if(g == 'S') {
       player.velocityY = 0
       player.animation.count = 1
    } 
});

function playerMovement(){
    if (buttonPressed.includes("A") && buttonPressed.includes("W") && buttonPressed.includes("S") && buttonPressed.includes("D")){
        player.stop()
    } else if (buttonPressed.includes("A") && buttonPressed.includes("W") && buttonPressed.includes("S")){
        player.moveLeft()
    } else if (buttonPressed.includes("D") && buttonPressed.includes("W") && buttonPressed.includes("S")){
        player.moveRight()
    } else if (buttonPressed.includes("A") && buttonPressed.includes("W") && buttonPressed.includes("D")){
        player.moveUp()
    } else if (buttonPressed.includes("A") && buttonPressed.includes("S") && buttonPressed.includes("D")){
        player.moveBottom()
    } else if (buttonPressed.includes("A") && buttonPressed.includes("S")){
        player.moveBottomLeft()
    } else if (buttonPressed.includes("A") && buttonPressed.includes("W")){
        player.moveUpLeft()
    } else if (buttonPressed.includes("A") && buttonPressed.includes("D")){
        player.stop()
    } else if (buttonPressed.includes("W") && buttonPressed.includes("S")){
        player.stop()
    } else if (buttonPressed.includes("W") && buttonPressed.includes("D")){
        player.moveUpRight()
    } else if (buttonPressed.includes("S") && buttonPressed.includes("D")){
        player.moveBottomRight()
    }else if(buttonPressed.includes("D")){
        player.moveRight()
    }
    else if(buttonPressed.includes("A")) {
        player.moveLeft()
    } 
    else if(buttonPressed.includes("W"))  { 
        player.moveUp()
    }
    else if(buttonPressed.includes("S")) { 
        player.moveBottom()
    }


    if(player.velocityX || player.velocityY) {
        if (player.x + player.size + player.velocityX <= GAME.width && player.x + player.velocityX >= 0) {
            player.x += player.velocityX
        }

        if (player.y + player.size + player.velocityY <= GAME.height && player.y + player.velocityY >= 0) {
            player.y += player.velocityY
        }
    }
}