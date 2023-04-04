var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;


function handleH1() {
    $("h1").text("Level " + level);
}


function nextSequence() {

    userClickedPattern = [];

    level++;
    
    handleH1();

    var randomNr = Math.floor(Math.random()*4);
    var randomBtn = $(".btn")[randomNr];
    //play sound / fade animation
    var name = $(randomBtn).attr("id");
    gamePattern.push(name);

    $(randomBtn).fadeOut(100).fadeIn(100);
    playSound(name);


    
}



jQuery(document).keypress(function () {
    if(!started){
        handleH1();
        nextSequence();
        started = true;
    };
})

//animate on click
$(".btn").on("click", function (btn) {

    var userChosenColour = btn.currentTarget.id;
    animatePress(userChosenColour);

    

    userClickedPattern.push(userChosenColour);
    checkAnswer( userClickedPattern.length - 1 );
    playSound(userChosenColour);

})

function checkAnswer( currentIteration ) {
    if( gamePattern[currentIteration]==userClickedPattern[currentIteration] ){
        if( currentIteration == ( gamePattern.length - 1 )){
            //end of sequence
            setTimeout(function () {
                nextSequence();
            } ,700);
        }
    }else {
        //reset
        gameOver();
    }
}

function animatePress(currentColour) {
    currentColour = "#" + currentColour;
    $(currentColour).toggleClass("pressed");
    setTimeout( function () {
        $(currentColour).toggleClass("pressed")
    }, 100);
}
function gameOver() {
    playSound("wrong")
    $("body").toggleClass("game-over");
    setTimeout( function () {
        $("body").toggleClass("game-over")
    }, 100);
    //reset
    started = false;
    $("h1").text("You reached level " + level + " press any key to try again!")
    level = 0;
    gamePattern = [];
    userClickedPattern = [];

}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3")
    audio.play();
}