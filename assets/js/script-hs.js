//Checks local storage for high scores data and displays any results
var hiScores = JSON.parse(localStorage.getItem("localScores"));
if ( hiScores !== null ) {
    for (var [key, value] of Object.entries(hiScores)) {
        $('#scoresTable').append('<p>' + key + " --- " + value + '</p');
        console.log(`${key}: ${value}`);
      }
}


//Listening for a click on the Clear Scores button
$("button[id*='clear']").click(function(){
    event.preventDefault();
    hiScores = null;
    $('p').remove();
    window.localStorage.clear();
})