// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
document.querySelector("#gameBox").appendChild(canvas);

//Load sprites
// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.src = "images/background.jpg";
bgImage.onload = function () {
    bgReady = true; 
};

// Win frame image
var winReady = false;
var winImage = new Image(); 
winImage.src = "images/win.jpg"; 
winImage.onload = function () {
    winReady = true; 
};

// Player image
var playerReady = false;
var playerImage = new Image(); 
playerImage.src = "images/spritesheetBIG.png"; 
playerImage.onload = function () {
    playerReady = true; 
};

// Goodies image
var goodyReady = false;
var goodyImage = new Image(); 
goodyImage.src = "images/racoon.png"; 
goodyImage.onload = function () {
    goodyReady = true; 
};

// Create global game objects 
var player = {
    speed: 7, // movement in pixels per tick 
    width: 100,
    height: 100,
};

var goodies = [ // this is an array
    { width: 50, height: 50 }, // one goody
    { width: 50, height: 50 }, // two goodies
    { width: 50, height: 50 }  // three goodies
];

// Velocity variables
var vX = 0;
var vY = 0;
// game variables
let score = 0;

let row = 0;

let gAnim;

let pos = 'back';
let currKey = 'up';

var velocity = {
    x: 0,
    y: 0
};

// Handle keyboard controls
addEventListener("keydown", function (e) {
    //Keystrokes
    currKey = 'down';

    if (!gAnim) {
        gAnim = setInterval(anim,20);
    }

    if (e.keyCode == 38) { // UP
        vX = 0;
        vY = -player.speed;
        row=0;
        pos = 'back';
    }
    if (e.keyCode == 40) { // DOWN
        vX = 0;
        vY = player.speed;
        row=300;
        pos = 'front';
    }
    if (e.keyCode == 37) { // LEFT
        vX = -player.speed;
        vY = 0;
        row=200;
        pos = 'left';
    }
    if (e.keyCode == 39) { // RIGHT
        vX = player.speed;
        vY = 0;
        row=100;
        pos = 'right';
    }
    if (e.keyCode == 32) { // STOP spacebar
        vX = 0;
        vY = 0;
        
    }
}, false);

addEventListener("keyup", function (e) {
        currKey = 'up';
        vX = 0;
        vY = 0;
        clearInterval(gAnim);
        gAnim = null;
        // change to default postition
        ctx.drawImage(playerImage, 400, row);
});

// addEventListener("keyup", function (e) {
//     const myTimeout = setTimeout(check, 1000);
    
//     function check() {
//          if (
//         !(e.keyCode == 38 && vY == -player.speed) && 
//         !(e.keyCode == 40 && vY == player.speed) &&  
//         !(e.keyCode == 37 && vX == -player.speed) && 
//         !(e.keyCode == 39 && vX == player.speed)     
//     ) {
//         vX = 0;
//         vY = 0;
//         clearInterval(gAnim);
//         gAnim = null;
//     }   
//     }

// });

// Handle touch controls
addEventListener("touchstart", function (e) {
    if (e.target.id == "uArrow") { // UP
        vX = 0;
        vY = -player.speed;
    }
    else if (e.target.id == "dArrow") { // DOWN
        vX = 0;
        vY = player.speed;
    }
    else if (e.target.id == "lArrow") { // LEFT
        vX = -player.speed;
        vY = 0;
    }
    else if (e.target.id == "rArrow") { //RIGHT
        vX = player.speed;
        vY = 0;
    }
    else { // STOP This stops if you touch anywhere else
        vX = 0;
        vY = 0;
    }
});

//ANIM spritesheet frames of goodies
let gFrames = 10; //number of frames for goodies anim

const anim = function () {
	if (gFrames == 10) {
		gFrames = 0;
	}
	gFrames++;
};


//Set initial state
var init = function () {
    //Put the player in the centre
    player.x = (canvas.width - player.width) / 2; 
    player.y = (canvas.height - player.height) / 2;

    //Place goodies at random locations 
    for (var i in goodies) {
        goodies[i].x = (Math.random() * (canvas.width - goodies[i].width  ));
        goodies[i].y = (Math.random() * (canvas.height - goodies[i].height));
    }

   // gAnim = setInterval(anim,30);
};

// The main game loop
var main = function () {
    if (checkWin()) {
        //WIN display win frame
        if (winReady) {
            ctx.drawImage(winImage, (canvas.width - winImage.width)/2, 
                (canvas.height - winImage.height)/2);
        }
    }
    else {
        //Not yet won, play game
        //move player
        if (player.x > 0 && player.x < canvas.width - player.width) {
            player.x += vX;
        }
        else {
            player.x -= vX;
            vX = -vX; //bounce
        }
        if (player.y > 0 && player.y < canvas.height - player.height) {
            player.y += vY
        }
        else {
            player.y -= vY;
            vY = -vY; //bounce
        }
        //check collisions
        for (var i in goodies) {
            if (checkCollision(player,goodies[i])) {
                goodies.splice(i,1);
                score++;
            }
        }

        render();
        window.requestAnimationFrame(main);
    }
};



// Draw everything
var render = function () {
    if (bgReady) {
        ctx.fillStyle = ctx.createPattern(bgImage, 'repeat');
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }
    if (playerReady) {
			//ANIM Paint current frame of goodie, see anim() function below for managing the loop across spritesheet
            if(currKey == 'down'){
                ctx.drawImage(playerImage, gFrames*player.width, row, 100, 100, player.x, player.y, 100, 100);
            } else {

                ctx.drawImage(playerImage, 0*player.width, row, 100, 100, player.x, player.y, 100, 100);
                
            }
			
	}
    // ctx.drawImage(playerImage, 0, row, 50, 50, player.x, player.y, 100, 100);

    if (goodyReady) {
        for (var i in goodies) {
            // ctx.drawImage creates objects in the canvas based on the rendered images and the created objects

            ctx.drawImage(goodyImage, goodies[i].x, goodies[i].y);
        }
    }

    //Label
    ctx.fillStyle = "rgb(250, 250, 250)";

    ctx.font = "50px serif";

    // change this fill text for debugging
    ctx.fillText("Score: " + score, 32, 92);
    ctx.fillText("Position status:"  + pos, 132, 192);   
};

//Generic function to check for collisions 
var checkCollision = function (obj1,obj2) {
    if (obj1.x < (obj2.x + obj2.width) && 
        (obj1.x + obj1.width) > obj2.x && 
        obj1.y < (obj2.y + obj2.height) && 
        (obj1.y + obj1.height) > obj2.y
        ) {
            return true;
    }
};

//Check if we have won
var checkWin = function () {
    if (goodies.length > 0) { 
        return false;
    } else { 
        return true;
    }
};

init();
window.requestAnimationFrame(main);