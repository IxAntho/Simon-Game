//Variables and arrays
const buttonColors = ["red", "blue", "green", "yellow"];
const gamePattern = [];
const userClickedPattern = [];

//Functionality Logic
function nextSequence() {
  function randInt(min = 0, max = 3) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
  }
  //Getting a Random Color
  const randomChosenColor = buttonColors[randInt()];
  gamePattern.push(randomChosenColor);
  var button = $("#" + randomChosenColor);
  activeButton(button);
  playAudio(randomChosenColor);
}

nextSequence();
nextSequence();
nextSequence();
nextSequence();
console.log(gamePattern);

buttonColors.forEach((color) => {
  var button = $("#" + color);
  button.on("click", function () {
    activeButton(button);
    animatePress(color);
    playAudio(color);
    userClickedPattern.push(color);
    console.log(userClickedPattern);
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
