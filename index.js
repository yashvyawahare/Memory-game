
let buttonColours = ["red", "blue", "green", "yellow"]

let gamePattern = []

let userClickedPattern = []

let randomNumber = Math.floor(Math.random()*4);

let startKeyPress =  false

let level = 0;

$(document).on("keydown" , function () {
    if(!startKeyPress){
    $('h1').text('level ' + level)
    nextSequence()
    startKeyPress = true
    }
})



function nextSequence() {
    userClickedPattern = []
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)
    $("."+ randomChosenColour).fadeIn(200).fadeOut(200).fadeIn(200);
    level += 1;
    playSound(randomChosenColour)
    $('h1').text('level ' + level)
}

$(".btn").click(function () {
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor)
    playSound(userChosenColor)
    animatePress(userChosenColor)
    checkAnswer(userClickedPattern.length - 1 )
});

const playSound = (name) => {
    let sound_link = "sounds/" + name + ".mp3"
    let audio = new Audio(sound_link)
    audio.play();
}

function animatePress(currentColor) {
    $("." +  currentColor).addClass("pressed")
    setTimeout(function() {$("." +  currentColor).removeClass("pressed")} , 100)
}
function checkAnswer(currentLevel) {
    if( gamePattern[currentLevel] == userClickedPattern[currentLevel]){
        // console.log("success")
        if(gamePattern.length == userClickedPattern.length) {
        setTimeout(nextSequence(), 1000) }
    }else{
        // console.log("failure")
        $("body").addClass("game-over")
        setTimeout(function () {$("body").removeClass("game-over")}, 200)
        $('h1').text("Game Over.\nPress Any Key To Restart")
        $(document).on("keypress" , function () {
            location.reload()
        })
    }
    }



 
