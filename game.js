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
bgImage.src = "images/background.png";
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

// Goodies images below

var blueberryReady = false;
var blueberryImage = new Image(); 
blueberryImage.src = "images/Goodies/blueberry.png"; 
blueberryImage.onload = function () {
    blueberryReady = true; 
};
var carrotReady = false;
var carrotImage = new Image(); 
carrotImage.src = "images/Goodies/carrot.png"; 
carrotImage.onload = function () {
    carrotReady = true; 
};
var cherryReady = false;
var cherryImage = new Image(); 
cherryImage.src = "images/Goodies/cherry.png"; 
cherryImage.onload = function () {
    cherryReady = true; 
};
var greenAppleReady = false;
var greenAppleImage = new Image(); 
greenAppleImage.src = "images/Goodies/green-apple.png"; 
greenAppleImage.onload = function () {
    greenAppleReady = true; 
};
var rottenBlueberryReady = false;
var rottenBlueberryImage = new Image(); 
rottenBlueberryImage.src = "images/Goodies/rotten-blueberry.png"; 
rottenBlueberryImage.onload = function () {
    rottenBlueberryReady = true; 
};
var rottenCherryReady = false;
var rottenCherryImage = new Image(); 
rottenCherryImage.src = "images/Goodies/rotten-cherry.png"; 
rottenCherryImage.onload = function () {
    rottenCherryReady = true; 
};
var rottenGreenAppleReady = false;
var rottenGreenAppleImage = new Image(); 
rottenGreenAppleImage.src = "images/Goodies/rotten-green-apple.png"; 
rottenGreenAppleImage.onload = function () {
    rottenGreenAppleReady = true; 
};

// Create global game objects 
var player = {
    speed: 7, // movement in pixels per tick 
    width: 100,
    height: 100,
};

let numOfFruits = 10;

let fruitsList = ['blueberry', 'carrot', 'cherry', 'green-apple', 'rotten-blueberry', 'rotten-cherry', 'rotten-green-apple'];
function randomFruitGenerator() {
    // Assign different probabilities for each fruit
    const probabilities = [0.1, 0.05, 0.3, 0.3, 0.05, 0.05, 0.01];
    
    // Generate a random number to determine the fruit based on probabilities
    const randomProbability = Math.random();
    let cumulativeProbability = 0;

    for (let i = 0; i < probabilities.length; i++) {
        cumulativeProbability += probabilities[i];
        if (randomProbability <= cumulativeProbability) {
            // Return the selected fruit
            return { width: 50, height: 50, type: fruitsList[i] };
        }
    }

    // Default to blueberry if none of the probabilities match
    return { width: 50, height: 50, type: 'blueberry' };
}
var goodies = [ 
    { width: 50, height: 50, type: 'blueberry' }, 
];
while (goodies.length < numOfFruits) {
    goodies.push(randomFruitGenerator());
}


// Velocity variables
var vX = 0;
var vY = 0;
// game variables
let score = 0;

let row = 0;

let fruitCaught;

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

    if (blueberryReady) {
        for (var i in goodies) {
            // ctx.drawImage creates objects in the canvas based on the rendered images and the created objects
            if (goodies[i].type == 'blueberry') {
                ctx.drawImage(blueberryImage, goodies[i].x, goodies[i].y);
            } else if (goodies[i].type == 'carrot') {
                ctx.drawImage(carrotImage, goodies[i].x, goodies[i].y);
            } else if (goodies[i].type == 'cherry') {
                ctx.drawImage(cherryImage, goodies[i].x, goodies[i].y);
            } else if (goodies[i].type == 'green-apple') {
                ctx.drawImage(greenAppleImage, goodies[i].x, goodies[i].y);
            } else if (goodies[i].type == 'rotten-blueberry') {
                ctx.drawImage(rottenBlueberryImage, goodies[i].x, goodies[i].y);
            } else if (goodies[i].type == 'rotten-cherry') {
                ctx.drawImage(rottenCherryImage, goodies[i].x, goodies[i].y);
            } else if (goodies[i].type == 'rotten-green-apple') {
                ctx.drawImage(rottenGreenAppleImage, goodies[i].x, goodies[i].y);
            }
            
        }
    }

    //Label
    ctx.fillStyle = "rgb(250, 250, 250)";

    ctx.font = "50px serif";

    // change this fill text for debugging
    ctx.fillText("Score: " + score, 32, 92); 
    ctx.fillText("You just caught: " + fruitCaught, 132, 192);
};

//Generic function to check for collisions 
var checkCollision = function (obj1,obj2) {
    if (obj1.x < (obj2.x + obj2.width) && 
        (obj1.x + obj1.width) > obj2.x && 
        obj1.y < (obj2.y + obj2.height) && 
        (obj1.y + obj1.height) > obj2.y
        ) {
            if (obj2.type == 'carrot'){
                player.speed += 3;
            }
            console.log('collision!', obj2.type);
            fruitCaught = obj2.type;
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