//Creates all the quiz questions as objects
var question01 = {words: "In Javascript, which character is used to terminate each statement?", choice1: "a period", choice2: "an ampersand", choice3: "a tilde", choice4: "a semicolon", correctAns: "a semicolon"};
var question02 = {words: "Which of the following keywords does not initiate a loop?", choice1: "goto", choice2: "if", choice3: "while", choice4: "switch", correctAns: "goto"};
var question03 = {words: "An array is a type of what?", choice1: "keyword", choice2: "loop", choice3: "object", choice4: "function", correctAns: "object"};
var question04 = {words: "When defining a function, you must enclose its content with what characters?", choice1: "greater than / less than", choice2: "curly brackets", choice3: "quotation marks", choice4: "pipe symbols", correctAns: "curly brackets"};
var question05 = {words: "Which of these is not an example of a primitive value type?", choice1: "number", choice2: "string", choice3: "object", choice4: "undefined", correctAns: "object"};
var question06 = {words: "A variable that has not been assigned a value has which of the following as its value?", choice1: "empty", choice2: "0", choice3: "false", choice4: "undefined", correctAns: "undefined"};
var question07 = {words: "You can pass data back to a parent function or context by using what keyword", choice1: "return", choice2: "callback", choice3: "var", choice4: "while", correctAns: "return"};
var question08 = {words: "What built-in method displays data to your browser's developer window and assists with debugging code?", choice1: "this.indexof()", choice2: "console.log()", choice3: "window.document()", choice4: "print.browser()", correctAns: "console.log()"};
var question09 = {words: "Adding an ___________ to an element allows you to detect interactions and changes within a browser window and then execute certain code in response.", choice1: "expression", choice2: "undefined variable", choice3: "event listener", choice4: "object model", correctAns: "event listener"};
var question10 = {words: "Which of these keywords is not used to invoke an interactive pop-up window in the browser", choice1: "inform()", choice2: "alert()", choice3: "prompt()", choice4: "confirm()", correctAns: "inform()"};

//Contain all the questions in a single array
var questionCollection = [question01, question02, question03, question04, question05, question06, question07, question08, question09, question10];

var score = 0;
var challengeIndex = 0;
var timeRemaining = 90;
var question = questionCollection[0];
var replyCorrect = "Correct Answer!";
var replyWrong = "Wrong Answer!";

//Initiates and starts the quiz timer
var clock = setInterval(quizTimer, 1000);
quizTimer();

//Listening for player to submit initials
$("button[id*='submitInits']").click(function(){
    registerScore();
    return;
})

//Listening for player to click on an answer
$("button[id*='spot']").click(function(){
    event.preventDefault();
 
    //Grab the text corresponding to their choice
    var choice = $(this).text();
        console.log(choice);

    //Comparing their choice's text with the correct answer    
    if (choice === question["correctAns"]) {
        score++;
        console.log(score);
        $('#response').css('color', 'yellowgreen');
        $('#response').text(replyCorrect);
    }
    else {
        var response = $("<p></p>").text("Wrong Answer!");
        $('#response').css('color', 'orangered');
        $("#response").text(replyWrong);
    }

    //Advance to the next question and update the screen
    if ( challengeIndex < 9 ) {
        challengeIndex++;
        question = questionCollection[challengeIndex]
        setTimeout(poseChallenge, 600);
    }
    else { 
        setTimeout(quizEnd, 600);
    }

})


//Operates the quiz timer
function quizTimer() {
    timeRemaining--;
    $("#timeNumber").text(timeRemaining);

    if(timeRemaining === 0) {
        clearInterval(clock);
        confirm("Time's Up!");
        quizEnd();
    }

}

//Alters the words displayed on the screen for any given challenge question
function poseChallenge() {
    $('#response').text('');
    $('#questionArea').text(question["words"]);
    $('#spot1').text(question["choice1"]);
    $('#spot2').text(question["choice2"]);
    $('#spot3').text(question["choice3"]);
    $('#spot4').text(question["choice4"]);
}

//Records score and ends the quiz program
function quizEnd() {
    clearInterval(clock);
    if ( $("#timeNumber").text() == 0) { 
        $("#timeNumber").css('color', 'orangered'); 
    }
    else { 
        $("#timeNumber").css('color', 'yellowgreen');
    }
    
    $('#challengeDiv').empty();
    $('#challengeDiv').append('<h1>All done!</h1>');
    $('#challengeDiv').append('<p>Your score is <strong>' + score + '</strong>.</p>');
    $('#registerForm').css('display', 'block');
}

function registerScore() {
    var inits = $('#input').val();
    localStorage.setItem(inits, score);
    console.log("Initials: " + inits);
    console.log("Score: " + score);

}

