//Variables and arrays
const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;

//Functionality Logic
// Function to start over and reset the game state
function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  console.log(
    "level: ",
    level,
    "gamePattern: ",
    gamePattern,
    "userList: ",
    userClickedPattern
  );
  $("#level-title").text("Press Any Key to Start");
  // Remove any existing keypress event listener before attaching a new one
  $(document).off("keypress", handleKeyPress);

  // Attach a new keypress event listener to start the game
  $(document).one("keypress", handleKeyPress);
}

// Function to handle the keypress event
function handleKeyPress() {
  nextSequence();
}

function randInt(min = 0, max = 3) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

buttonColors.forEach((color) => {
  var button = $("#" + color);
  button.on("click", function () {
    activeButton(button);
    animatePress(color);
    playAudio(color);
    userClickedPattern.push(color);
    console.log(userClickedPattern);
    checkAswer(userClickedPattern.length - 1); //Argument is the last index of the list
  });
});

function activeButton(button) {
  button.fadeOut(80).fadeIn(80).fadeOut(80).fadeIn(80);
}

function playAudio(name) {
  const audio = new Audio(`./sounds/${name}.mp3`);
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 320);
}

//Function checks the new added button against the game pattern value with the same index
function checkAswer(buttonIndex) {
  if (userClickedPattern[buttonIndex] !== gamePattern[buttonIndex]) {
    console.log("Wrong answer. Game over!");
    const audio = new Audio("./sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    //event listener to restart the program
    $(document).on("keypress", function () {
      startOver();
    });
    return;
  }
  // Check if the user has completed the entire sequence for the current level
  if (userClickedPattern.length === gamePattern.length) {
    // Wait a moment before starting the next level
    setTimeout(function () {
      nextSequence();
    }, 1000);
  }
}

function nextSequence() {
  level++;
  $("#level-title").text(`Level ${level}`);
  //Reset the user clicked buttons list
  userClickedPattern = [];
  console.log("Reset the user clicked buttons list: ", userClickedPattern);
  //Getting a Random Color
  setTimeout(function () {
    const randomChosenColor = buttonColors[randInt()];
    gamePattern.push(randomChosenColor);
    console.log(gamePattern);
    for (let i = 0; i < gamePattern.length; i++) {
      setTimeout(function () {
        var button = $("#" + gamePattern[i]);
        activeButton(button);
        animatePress(gamePattern[i]);
        playAudio(gamePattern[i]);
      }, i * 1000);
    }
  });
}

// use "one" to listen to a keypress only once
// $(document).one("keypress", function () {
//   nextSequence();
//   console.log("Keypress");
// });
$(document).one("keypress", handleKeyPress);
