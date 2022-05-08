const width = 28;
const grid = document.querySelector(".grid");
const scoreDisplay = document.querySelector("#score");
let pacmanCurrentIndex = 490;
  
  
let squares = [];
let score = 0;
scoreDisplay.innerHTML = score;
//28 * 28 = 784
// 0 - pac-dots
// 1 - wall
// 2 - ghost-lair
// 3 - power-pellet
// 4 - empty
const layout = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0,
  1, 1, 1, 1, 0, 1, 1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1,
  1, 0, 1, 1, 1, 1, 3, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1,
  1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4,
  4, 4, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1,
  1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4,
  4, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0,
  1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,
  1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1,
  1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0,
  0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1,
];

// create board

function createBoard() {
  for (let i = 0; i < layout.length; i++) {
    //create a square
    const square = document.createElement("div");
    //put square in grid
    grid.appendChild(square);
    //put squre in squares array
    squares.push(square);

    if (layout[i] == 0) {
      squares[i].classList.add("pac-dot");
    } else if (layout[i] == 1) {
      squares[i].classList.add("wall");
    } else if (layout[i] == 2) {
      squares[i].classList.add("ghost-lair");
    } else if (layout[i] == 3) {
      squares[i].classList.add("power-pellet");
    }
  }
}

createBoard();

// starting position of pacman

function control(e) {
  e.stopPropagation();
  squares[pacmanCurrentIndex].classList.remove("pacman");
  switch (e.key) {
    case "ArrowDown":
      
      if (
        !squares[pacmanCurrentIndex + width].classList.contains("wall") &&
        !squares[pacmanCurrentIndex + width].classList.contains("ghost-lair") &&
        pacmanCurrentIndex + width < width * width
      ) {
        pacmanCurrentIndex += width;
      }
      break;
    case "ArrowUp":
      
      if (
        !squares[pacmanCurrentIndex - width].classList.contains("wall") &&
        !squares[pacmanCurrentIndex - width].classList.contains("ghost-lair") &&
        pacmanCurrentIndex - width >= 0
      ) {
        pacmanCurrentIndex -= width;
      }

      break;
    case "ArrowRight":
      
      if (pacmanCurrentIndex === 391) {
        pacmanCurrentIndex = 364;
      } else if (
        !squares[pacmanCurrentIndex + 1].classList.contains("wall") &&
        !squares[pacmanCurrentIndex + 1].classList.contains("ghost-lair") &&
        pacmanCurrentIndex % width < width - 1
      ) {
        pacmanCurrentIndex++;
      }
      break;
    case "ArrowLeft":
      
      if (pacmanCurrentIndex === 364) {
        pacmanCurrentIndex = 391;
      } else if (
        !squares[pacmanCurrentIndex - 1].classList.contains("wall") &&
        !squares[pacmanCurrentIndex - 1].classList.contains("ghost-lair") &&
        pacmanCurrentIndex % width !== 0
      ) {
        pacmanCurrentIndex--;
      }

      break;
  }
  squares[pacmanCurrentIndex].classList.add("pacman");
  pacDotEaten();
  powerPelletEaten();
  checkForWin();
  checkForGameOver();
  
}



function pacDotEaten() {
  if (squares[pacmanCurrentIndex].classList.contains("pac-dot")) {
    squares[pacmanCurrentIndex].classList.remove("pac-dot");
    score++;
    scoreDisplay.innerHTML = score;
  }
}

function powerPelletEaten() {
  if (squares[pacmanCurrentIndex].classList.contains("power-pellet")) {
    squares[pacmanCurrentIndex].classList.remove("power-pellet");
    score += 10;
    scoreDisplay.innerHTML = score;
    ghosts.forEach((ghost) => (ghost.isScared = true));
    setTimeout(unScareGhosts, 10000);
  }
}

function unScareGhosts() {
  ghosts.forEach((ghost) => (ghost.isScared = false));
}
class Ghost {
  constructor(className, startIndex, speed) {
    this.className = className;
    this.startIndex = startIndex;
    this.speed = speed;
    this.currentIndex = startIndex;
    this.isScared = false;
    this.timerId = NaN;
  }
}

let ghosts = [
  new Ghost("blinky", 348, 250),
  new Ghost("pinky", 376, 400),
  new Ghost("inky", 351, 300),
  new Ghost("clyde", 379, 500),
];


function moveGhost(ghost) {
  const directions = [-1, +1, -width, +width];
  let direction = directions[Math.floor(Math.random() * directions.length)];

  ghost.timerId = setInterval(function () {
    if (
      !squares[ghost.currentIndex + direction].classList.contains("wall") &&
      !squares[ghost.currentIndex + direction].classList.contains("ghost")
    ) {
      squares[ghost.currentIndex].classList.remove(ghost.className);
      squares[ghost.currentIndex].classList.remove("ghost", "scared-ghost");
      ghost.currentIndex += direction;
      squares[ghost.currentIndex].classList.add(ghost.className);
      squares[ghost.currentIndex].classList.add("ghost");
    } else direction = directions[Math.floor(Math.random() * directions.length)];
    if (ghost.isScared) {
      squares[ghost.currentIndex].classList.add("scared-ghost");
    }
    if (
      ghost.isScared &&
      squares[ghost.currentIndex].classList.contains("pacman")
    ) {
      squares[ghost.currentIndex].classList.remove(
        ghost.className,
        "ghost",
        "scared-ghost"
      );
      ghost.currentIndex = ghost.startIndex;
      score += 100;
      scoreDisplay.innerHTML = score;
      squares[ghost.currentIndex].classList.add(
        ghost.className,
        "ghost",
        "scared-ghost"
      );
    }
    checkForGameOver();
  }, ghost.speed);
}
 //Check for game over
 function checkForGameOver() {
  if (
    squares[pacmanCurrentIndex].classList.contains("ghost") &&
    !squares[pacmanCurrentIndex].classList.contains("scared-ghost")
  ) {
    //Stop moving ghosts
    ghosts.forEach((ghost) => clearInterval(ghost.timerId));
    //remove eventlistener from our control function
    document.removeEventListener("keyup", control);
    scoreDisplay.innerHTML = "Vous avez perdu 😫";
    document.getElementById("startGame").disabled = false
    endGame()
  }
  
}

//check for win
function checkForWin() {
  if (score === 150) {
    //stop each ghost
    ghosts.forEach((ghost) => clearInterval(ghost.timerId));
    //remove the eventlistener for the control function
    document.removeEventListener("keyup", control);
    //tell our user we have won
    scoreDisplay.innerHTML = "Vous avez gagné 🚀";
    document.getElementById("startGame").disabled = false
    endGame()
  }
  
}
function endGame(){
  ghosts.forEach((ghost) => {
    squares[ghost.currentIndex].classList.remove(ghost.className);
    squares[ghost.currentIndex].classList.remove("ghost");
    squares[pacmanCurrentIndex].classList.remove("pacman");
  });
}
function initalize(){
  createBoard();
  score = 0
  pacmanCurrentIndex = 490;
squares[pacmanCurrentIndex].classList.add("pacman");
document.addEventListener("keyup", control);
ghosts = [
  new Ghost("blinky", 348, 250),
  new Ghost("pinky", 376, 400),
  new Ghost("inky", 351, 300),
  new Ghost("clyde", 379, 500),
];
  ghosts.forEach((ghost) => {
    squares[ghost.currentIndex].classList.add(ghost.className);
    squares[ghost.currentIndex].classList.add("ghost");
  });
  ghosts.forEach((ghost) => moveGhost(ghost))
}
function startGame(){
  
  
initalize()
// draw my ghosts onto my grid

  
  
  window.addEventListener("keydown", function(e) {
    if(e.key == "ArrowDown"  || e.key == "ArrowUp" || e.key == "ArrowLeft" || e.key == "ArrowRight" /* Down arrow */) {
      e.preventDefault(); // prevents the "default" action from happening, in this case, scrolling down.
    }
  }, false);



}
document.getElementById("startGame").addEventListener("click",()=>{
  
  startGame()

})