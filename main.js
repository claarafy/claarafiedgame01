var timer;
var game = {
  player01: {name: "", score: 0},
  player02: {name: "", score: 0},
  time: 15
}
var currentPlayer;
var $p01Name = $("input[name='p01-name']");
var $p02Name = $("input[name='p02-name']");
var correct = [
    { name:'head', img: "Head_Correct.png" },
    { name:'face', img: "Face_Correct.png"},
    { name:'upper', img: "Upper_Correct.png"},
    { name:'lower', img: "Lower_Correct.png"},
    { name:'feet', img: "Feet_Correct.png"}
  ];

//when "jQuery link" button is clicked, redo the titles
var $body = $('body');
var $container = $('.container');
var $titleButton = $('#title-button');
var $title = $('#title-heading');
var $titlePage = $('#title-page');

$titleButton.on('click', function() {
  redoTitle();
});
//clear everything in the body
function clearAll() {
  $('*').off();
  $container.empty();
  $('*').off();
}

function redoTitle() {
  $title.css({fontSize: '40px'});
  $titlePage.css({marginTop: '10px'});
  $titleButton.remove();
  $('#p01-input').text('Player 1:  ' + $p01Name.val() );
  $('#p02-input').text('Player 2:  ' + $p02Name.val() );
  $container.append("<div id='how-box'><button id='how'>How to Play</button></div>");
  $('#how').one('click', showIns);
}
//when "how to play button" is clicked show Instructions
function showIns() {
  $container.append("<div id='instructions'><p>Instructions</p><ol><li>REMEMBER!!!!</li><li>WHICH HEAD?</li><li>WHICH FACE?</li><li>WHICH UPPER?</li><li>WHICH LOWER?</li><li>WHICH FEET?</li><li>NAME?</li><ol></div>");
  $container.append("<div id='start-box'><button id='start'>START</button></div>");
  $('#start').on('click', function() {
    clearAll();
    startGame();
  });
}
//when start button clicked, expose main picture
function startGame() {
  clearAll();
  $('#main').removeClass('hidden');//show the picture
  countdown00();
};
//countdown main screen
function countdown00() {
  timer = 3;
  $('.timer').text('Time: ' + timer);
  var startCountdown = setInterval(function() {
    if (timer == 0) {
      $('.timer').text('0');
      $('#main').addClass('hidden'); //when timer hits 0, hide the #main
      clearInterval(startCountdown);
      firstRound();//when the countdown finishes, go on to first round
    }
    else {
    $('.timer').text('Time: ' + (timer -=  1));
    }
  }, 1000);
}

//first round: pick heads
function firstRound() {
  $('#first').removeClass('hidden'); //reveal first round (html tag)
  player02Turn(); //player 2's playing
  countdown01(); //run the clock
  showScore01();
  displayHeads();
  storeHeadChoices();
}

//who's turn is it
function player01Turn() {
  currentPlayer = $p01Name.val();
  $('#p01-input').css({fontSize: '40px', color: 'tomato', fontWeight: '800'});
}
function player02Turn() {
  currentPlayer = $p02Name.val();
  $('#p02-input').css({fontSize: '40px', color: 'tomato', fontWeight: '800'});
}

//countdown first round
function countdown01() {
  timer = 3;
  $('.timer').text('Time: '+timer);
  var startCountdown = setInterval(function() {
    if (timer == 0) {
      $('.timer').text('0');
      clearInterval(startCountdown);
    }
    else {
    $('.timer').text('Time: ' + (timer -=  1));
    }
  }, 1000);
}
//view score
function showScore01() {
  $('#title-page').append('<div id="player01-score">' + $p01Name.val()+ "'s score: " + game.player01.score + '</div>');
  $('#title-page').append('<div id="player02-score">' + $p02Name.val() + "'s score: " + game.player02.score + '</div>');
  $('#title-page').append('<button id="check">Check</button>');
  $('#check').one('click', checkHeads)
}
//display head options to pick from
function displayHeads() {
  $('#first').append('<div id="correct-head" class="head-option"><img src="Head_Correct.png"</div>');
  $('#first').append('<div class="head-option"><img src="Head_01.png"</div>');
  $('#first').append('<div class="head-option"><img src="Head_02.png"</div>');
  $('#first').append('<div class="head-option"><img src="Head_03.png"</div>');
  $('#first').append('<div class="head-option"><img src="Head_04.png"</div>');
  $('#first').append('<div class="head-option"><img src="Head_05.png"</div>');
}
//check if the clicked head is the correct answer
var playerChoices = [];
var playerHeadChoices = [];
function storeHeadChoices() {
  $('.head-option').on('click', function() {
    if (timer != 0) {
    playerHeadChoices.push($(this).children().attr('src'));
    console.log(playerHeadChoices);
    }
  })
}
//
function checkHeads() { //when check button is clicked, check if the last click was correct, either correct or wrong, append the item and store it to the choices array
    console.log("clicked!")
    if ( playerHeadChoices[playerHeadChoices.length-1] == correct[0].img && currentPlayer == $p02Name.val()) { //if player 2 is playing, and picks the correct answer add score
      console.log('CORRECTTT!!!');
      $('#head').html('<div><img src= ' + playerHeadChoices[playerHeadChoices.length-1] + '></div>');
      game.player02.score = game.player02.score + 1;
      $('#player02-score').text($p02Name.val()+ "'s score: " + game.player02.score);
      playerChoices.push(playerHeadChoices[playerHeadChoices.length-1]);
      console.log(playerChoices)
    } else if ( playerHeadChoices[playerHeadChoices.length-1] != correct[0].img && currentPlayer == $p02Name.val()) { //if player 2 is playing, and picks the wrong answer minus score
      console.log('NOOOOOO!');
      $('#head').html('<div><img src= ' + playerHeadChoices[playerHeadChoices.length-1] + '></div>');
      game.player02.score = game.player02.score - 2;
      $('#player02-score').text($p02Name.val()+ "'s score: " + game.player02.score);
    }
}
