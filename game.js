
alert("Rules of game is simple: A particular colour block will be highlighted on each level, you have to memorize the order in which each block is highlighed starting form level 1, and have to click each block in same order.")


var userClickedPattern=[];
var gamePattern=[];
var buttomColours=["red","blue","green","yellow"];

var randomNumber=999;
var level=0;
started=false;


$(document).keypress(function(){
    if(!started){
        nextSequence();
        started=true;     
        
    }
});

$(".start").click(function(){
    
    if(!started){
        nextSequence();
        started=true;     
        
    }
    
})



$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    // console.log(userChosenColour);
    userClickedPattern.push(userChosenColour)
    animatePress(userChosenColour);
    
    // console.log("userclicked "+ userClickedPattern);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length);
    // console.log(gamePattern);
});

function nextSequence(){
    userClickedPattern=[];
    level+=1
    $("#level-title").text("level "+level);
    randomNumber= Math.floor(Math.random()*4);
    var randomChosenColour=buttomColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);   
    // console.log("game_new");
    // console.log(gamePattern);
    
}

function playSound(name){
    var audio = new Audio('sounds/'+name+'.mp3');
    audio.play();  

}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){$("#"+currentColour).removeClass("pressed");},100);
}

function checkAnswer(currentLevel){
    // console.log("gamelevel " + gamePattern.length);
    if(userClickedPattern[currentLevel-1]===gamePattern[currentLevel-1]){
        if(currentLevel===gamePattern.length){
            userClickedPattern=[];
            setTimeout(function(){nextSequence();},1000);
        }
        // console.log("success");
    }
    else{
        // console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over");},200);
        $("#level-title").text("Game Over, Press any key to restart");
        startOver();
    }
    

} 

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}
