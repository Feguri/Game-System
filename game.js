// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = document.querySelector("#gameBox").clientWidth;
canvas.height = document.querySelector("#gameBox").clientHeight;
document.querySelector("#gameBox").appendChild(canvas);

// let dataBox = document.getElementById('data');
let delivery = document.getElementById('delivery');
let inventoryBox = document.getElementById('inventory');
let inventory = [];

let playerLost = false;

document.onclick= function(event) {
    console.log('clicked!');
    console.log(bgAudioPlaying);
};

//Load sprites
// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.src = "images/background.png";
bgImage.onload = function () {
    bgReady = true; 
};

// lose image
var loseReady = false;
var loseImage = new Image(); 
loseImage.src = "images/win.jpg"; 
loseImage.onload = function () {
    loseReady = true; 
};

// Player image
var playerReady = false;
var playerImage = new Image(); 
playerImage.src = "images/spritesheetBIG.png"; 
playerImage.onload = function () {
    playerReady = true; 
};

// invisible image
var invisibleReady = false;
var invisibleImage = new Image(); 
invisibleImage.src = "images/invisible.png"; 
invisibleImage.onload = function () {
    invisibleReady = true; 
};

// pine baddie image
var pineReady = false;
var pineImage = new Image(); 
pineImage.src = "images/baddies/pineTree.png"; 
pineImage.onload = function () {
    pineReady = true; 
};
// apple tree baddie image
var appleReady = false;
var appleImage = new Image(); 
appleImage.src = "images/baddies/appleTree.png"; 
appleImage.onload = function () {
    appleReady = true; 
};

// fruit basket
var basketReady = false;
var basketImage = new Image(); 
basketImage.src = "images/basket.png"; 
basketImage.onload = function () {
    basketReady = true; 
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

// SOUNDS SYSTEM
//Prepare sound clips
var basketAudioReady = false;
var basketAudio = document.getElementById("basket-delivery");
basketAudio.oncanplay = function () {
    basketAudioReady = true;
}

var backgroundAudioReady = false;
var backgroundAudio = document.getElementById("background-music");
 backgroundAudio.oncanplay = function () {
   backgroundAudioReady = true;
   backgroundAudio.volume = 0.35;
   backgroundAudio.loop = true;
}
 
var carrotAudioReady = false;
var carrotAudio = document.getElementById("carrot-win");
carrotAudio.oncanplay = function () {
   carrotAudioReady = true;
   carrotAudio.volume = 0.8;
}

var fruitCollectAudioReady = false;
var fruitCollectAudio = document.getElementById("fruit-collect");
fruitCollectAudio.oncanplay = function () {
   fruitCollectAudioReady = true;
   fruitCollectAudio.volume = 0.8;
}

var hit3AudioReady = false;
var hit3Audio = document.getElementById("hit3");
hit3Audio.oncanplay = function () {
   hit3AudioReady = true;
   hit3Audio.volume = 0.8;
}

var gameOverAudioReady = false;
var gameOverAudio = document.getElementById("game-over");
gameOverAudio.oncanplay = function () {
   gameOverAudioReady = true;
   gameOverAudio.volume = 0.8;
}

var hitAudioReady = false;
var hitAudio = document.getElementById("hit");
hitAudio.oncanplay = function () {
   hitAudioReady = true;
}

var walkAudioReady = false;
var walkAudio = document.getElementById("walk");
walkAudio.oncanplay = function () {
   walkAudioReady = true;
   walkAudio.volume = 0.8;
   walkAudio.loop = true;
}

var hit2AudioReady = false;
var hit2Audio = document.getElementById("hit2");
hit2Audio.oncanplay = function () {
   hit2AudioReady = true;
   hit2Audio.volume = 0.8;
}
var bgPlaying = false;


// Function to start the countdown
function startTimer(duration, display) {
let timer = duration, minutes, seconds;
const intervalId = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
    clearInterval(intervalId); // Clear the interval when timer reaches 0
    timer = duration;
    displayWin();
    }
}, 1000);
}

// Set the duration of the countdown in seconds
const countdownDuration = 100;

let livesLeft = 3;

// Get the element where the timer will be displayed
const display = document.getElementById('timer');

// Start the countdown
startTimer(countdownDuration, display);

function countFruits(fruitsArray) {
    // Define the list of    all possible fruits
    const allFruits = ["cherry", "blueberry", "green-apple", "rotten-cherry", "rotten-blueberry", "rotten-green-apple"];
  
    // Initialize an object with all fruits and initial count set to 0
    const fruitCount = {};
    allFruits.forEach(fruit => {
      fruitCount[fruit] = 0;
    });
  
    // Loop through the array and update counts
    for (const fruit of fruitsArray) {
      // If the fruit is in the list, update its count accordingly
      if (fruitCount.hasOwnProperty(fruit)) {
        // Check if it's a rotten fruit
        if (fruit.startsWith("rotten-")) {
          fruitCount[fruit]--;
        } else {
          fruitCount[fruit]++;
        }
      }
      // Otherwise, it's not in the list and can be ignored
    }
  
    // Return the object with fruit counts
    return fruitCount;
  }


function displayWin() {
    let countedFruits = countFruits(totalFruitsCaught);
    let fruitsHtmlList = document.querySelectorAll('.display-fruit');
    let totalScore = 0;
    console.log(fruitsHtmlList);
    for (let fruit of fruitsHtmlList){
        fruit.innerHTML = countedFruits[fruit.id];
        let calculatedScore = countedFruits[fruit.id] * 15;
        totalScore += calculatedScore;
        document.getElementById(`${fruit.id}-calculated-score`).innerHTML = calculatedScore;
    }
    document.getElementById('final-score').innerHTML = totalScore;

    let scoreBox = document.getElementById('final-score-container');
    scoreBox.style.display = 'block';
    document.getElementById('restart').addEventListener('click', function(){
        location.reload()
    });
}
// Create global game objects 
var player = {
    speed: 7, // movement in pixels per tick 
    width: 100,
    height: 100,
};

var basket = {
    width: 100,
    height: 100,
    type: 'basket',
}

var pineTree = {
    width: 200,
    height: 200,
    type: 'tree',
}

var appleTree = {
    width: 200,
    height: 200,
    type: 'tree',
}

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

];
while (goodies.length < numOfFruits) {
    goodies.push(randomFruitGenerator());
}

let totalFruitsCaught = [];
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

let bgAudioPlaying = false;
// Handle keyboard controls
addEventListener("keydown", function (e) {
    if (!bgAudioPlaying){
        if (backgroundAudioReady){
            backgroundAudio.play();
            bgAudioPlaying = true;
        }
    }

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

function randomNum(min, max, excludeMin, excludeMax) {
    let randomNumber;
  
    do {
      randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (randomNumber >= excludeMin && randomNumber <= excludeMax);
  
    return randomNumber;
  }
  
  // Example: Generate a random number between 0 and 1000, excluding the range 450 to 550
  const result = randomNum(0, 1000, 450, 550);
  console.log(result);

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
    // place baddies at random locations
    pineTree.x = randomNum(0, canvas.width, ((canvas.width/2)-250), ((canvas.width/2)+250));
    pineTree.y = (Math.random() * (canvas.width - pineTree.height));

    
    // Using the randomeNum function makes sure that the trees don't spawn in line with the player or the basket 
    appleTree.x = randomNum(0, canvas.width, ((canvas.width/2)-250), ((canvas.width/2)+250));
    appleTree.y = (Math.random() * (canvas.width - appleTree.height));

    // Place the basket object at the top center, right below the 'deliver' sign
    basket.x = canvas.width/2-basketDimension/2;
    basket.y = 0;

};

let clickedStart = false;


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
                } else if (checkCollision(player, basket)){
    
                }
                else if (checkCollision(player, pineTree)) {
    
                }
                else if (checkCollision(player, appleTree)) {

                }
            }
            // respawn fruit
            while (goodies.length < numOfFruits) {
                goodies.push(randomFruitGenerator());
                console.log(goodies);
            }
    

            render();
            window.requestAnimationFrame(main);
        
    }

};


let basketDimension = 100;
// Draw everything
function addFruitImg(src){
    let newInventoryItem = document.createElement('img');
    newInventoryItem.className = 'inventory-img';
    newInventoryItem.src = src;
    inventoryBox.appendChild(newInventoryItem); 
}
var render = function () {
    if (bgReady) {
        ctx.fillStyle = ctx.createPattern(bgImage, 'repeat');
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }
    if (playerReady) {
			//ANIM Paint current frame of goodie, see anim() function below for managing the loop across spritesheet
            if (playerVisible){
                if(currKey == 'down'){
                    ctx.drawImage(playerImage, gFrames*player.width, row, 100, 100, player.x, player.y, 100, 100);
                } else {
    
                    ctx.drawImage(playerImage, 0*player.width, row, 100, 100, player.x, player.y, 100, 100);
                }
            } else {
                ctx.drawImage(invisibleImage, gFrames*player.width, row, 100, 100, player.x, player.y, 100, 100);
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
    if (basketReady) {
        // puts the basket in the top center
        ctx.drawImage(basketImage, canvas.width/2-basketDimension/2, 0, basketDimension, basketDimension);
    }
    if (pineReady && appleReady) {
        ctx.drawImage(pineImage, pineTree.x, pineTree.y);
        ctx.drawImage(appleImage, appleTree.x, appleTree.y);
    }

    //Label
    ctx.fillStyle = "rgb(250, 250, 250)";

    ctx.font = "50px serif";
    // ctx.filltext here
    // ctx.fillText(pineTree.y, 50, 50);
    // dataBox.innerHTML = fruitCaught;
};

let gracePeriod = false;
let playerVisible = true;

function hitCharacter() {

  if (!gracePeriod) {
    // Character is hit, perform hit logic

    if (hit3Audio){
        try {
            hit3.play();
        } catch(err) {

        }
        
        console.log('hit audio');
    }
    player.speed -= 2;
    livesLeft--;
    if (livesLeft === -1){

        playerLost = true;
        document.getElementById('ncaps').remove();
        document.getElementById('bod').style.backgroundColor = 'black';
        document.getElementById('bod').innerHTML = '<div class="center2"><img src="images/gameOver.png" id="animated" alt=""></div><div class="center2"><div class="btn-container"><a href="index.html"><button type="button" title="start button">RESTART</button></a></div></div>   <audio id="game-over">     <source src="sounds/game-over.mp3" type="audio/mp3">    </audio>';
        var audio = new Audio('sounds/game-over.mp3');
        audio.play();
    }
    try {
        document.querySelectorAll('.heart')[0].remove();
        document.getElementById('expression').src = 'images/luckyExpressions/sadLucky.png';
        document.getElementById('expression-container').style.backgroundColor = '#40425A';
    } catch(err){

    }
    

    // Set grace period to true
    gracePeriod = true;

    // Set the duration of the grace period (in milliseconds)
    const gracePeriodDuration = 2000; // 2000 milliseconds (adjust as needed)
    
    // Set the interval to toggle visibility every half second
    const intervalId = setInterval(() => {

      // Toggle visibility
      playerVisible = (playerVisible === false) ? true : false;
    }, 50); // 500 milliseconds (half second)

    // Use setTimeout to reset the grace period and clear the interval
    setTimeout(() => {
      gracePeriod = false;
      clearInterval(intervalId); // Clear the interval to stop toggling visibility
      // Grace period is over, you can perform additional logic here if needed
      playerVisible = true;
      try {
        document.getElementById('expression').src = 'images/luckyExpressions/normalLucky.png';
        document.getElementById('expression-container').style.backgroundColor = '#BEE6F6';
      } catch(err) {

      }

    }, gracePeriodDuration);
  }
}

let inventorySize = 5;
//Generic function to check for collisions 
var checkCollision = function (obj1,obj2) {
    if (obj1.x < (obj2.x + obj2.width) && 
        (obj1.x + obj1.width) > obj2.x && 
        obj1.y < (obj2.y + obj2.height) && 
        (obj1.y + obj1.height) > obj2.y
        ) {
            if (obj2.type == 'carrot'){
                player.speed += 3;
                document.getElementById('expression').src = 'images/luckyExpressions/powerLucky.png';
                document.getElementById('expression-container').style.backgroundColor = '#FEE85F';

                if (carrotAudioReady){
                    carrotAudio.play();
                }
            } else if (obj2.type == 'basket'){
                if(inventory.length == inventorySize){
                    if (basketAudioReady){
                        basketAudio.play();
                    }
                    delivery.classList.remove('animation');
                    delivery.classList.add('transparent');
                    
                    // for some funching reason, it doesn't delete it all in one for loop
                    while (inventoryBox.children.length > 0){
                        for (let el of inventoryBox.children){
                            el.remove();
                        }
                    }
                    // Place goodies at random locations 
                    for (var i in goodies) {
                        goodies[i].x = (Math.random() * (canvas.width - goodies[i].width  ));
                        goodies[i].y = (Math.random() * (canvas.height - goodies[i].height));
                    
                    }
                    // place baddies at random locations
                    pineTree.x = randomNum(0, canvas.width, ((canvas.width/2)-250), ((canvas.width/2)+250));
                    pineTree.y = (Math.random() * (canvas.width - pineTree.height));

                    
                    // Using the randomeNum function makes sure that the trees don't spawn in line with the player or the basket 
                    appleTree.x = randomNum(0, canvas.width, ((canvas.width/2)-250), ((canvas.width/2)+250));
                    appleTree.y = (Math.random() * (canvas.width - appleTree.height));

                    totalFruitsCaught = totalFruitsCaught.concat(inventory);
                    inventory = [];
                    
                }
               
            } else if(obj2.type == 'tree'){
                hitCharacter();
            }
             else {
                // if you have a full inventory, it will not count as a collision
                if (inventory.length == inventorySize){
                    return false;
                }
                if (fruitCollectAudioReady){
                    fruitCollectAudio.play();
                }
                if (inventory.length == inventorySize-1){
                    delivery.classList.add('animation');
                    delivery.classList.remove('transparent');
                }
                fruitCaught = obj2.type;
                inventory.push(fruitCaught);
                addFruitImg(`images/Goodies/${fruitCaught}.png`);
            }

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



