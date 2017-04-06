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
    { name:'head', img: "images/Head_Correct.png" },
    { name:'face', img: "images/Face_Correct.png"},
    { name:'upper', img: "images/Upper_Correct.png"},
    { name:'lower', img: "images/Lower_Correct.png"},
    { name:'feet', img: "images/Feet_Correct.png"}
  ];
var playerChoices = [];

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
  $('#p01-input').css({fontSize: '40px', color: 'tomato', fontWeight: '800'});//emphasize p01
  $('#p02-input').css({fontSize: '25px', color: 'black', fontWeight: '200'});
}
function player02Turn() {
  currentPlayer = $p02Name.val();
  $('#p02-input').css({fontSize: '40px', color: 'tomato', fontWeight: '800'});//emphasize p02
  $('#p01-input').css({fontSize: '25px', color: 'black', fontWeight: '200'});
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
  $('#title-page').append('<button id="next">Next Round!</button>');
  $('#check').one('click', checkHeads);
  $('#next').one('click', secondRound);
}
//display head options to pick from
function displayHeads() {
  $('#first').append('<div id="correct-head" class="head-option"><img src="images/Head_Correct.png"</div>');
  $('#first').append('<div class="head-option"><img src="images/Head_01.png"</div>');
  $('#first').append('<div class="head-option"><img src="images/Head_02.png"</div>');
  $('#first').append('<div class="head-option"><img src="images/Head_03.png"</div>');
  $('#first').append('<div class="head-option"><img src="images/Head_04.png"</div>');
  $('#first').append('<div class="head-option"><img src="images/Head_05.png"</div>');
}
//check if the clicked head is the correct answer
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
    console.log("checkHeads running!")
    if ( playerHeadChoices[playerHeadChoices.length-1] == correct[0].img && currentPlayer == $p02Name.val()) { //if player 2 is playing, and picks the correct answer add score
      console.log('CORRECTTT!!!');
      $('.head').html('<div><img src= ' + playerHeadChoices[playerHeadChoices.length-1] + '></div>');
      game.player02.score = game.player02.score + 1;
      $('#player02-score').text($p02Name.val()+ "'s score: " + game.player02.score);
      playerChoices.push(playerHeadChoices[playerHeadChoices.length-1]);
      console.log(playerChoices)
    } else if ( playerHeadChoices[playerHeadChoices.length-1] != correct[0].img && currentPlayer == $p02Name.val()) { //if player 2 is playing, and picks the wrong answer minus score
      console.log('NOOOOOO!');
      $('.head').html('<div><img src= ' + playerHeadChoices[playerHeadChoices.length-1] + '></div>');
      game.player02.score = game.player02.score - 2;
      $('#player02-score').text($p02Name.val()+ "'s score: " + game.player02.score);
      playerChoices.push(playerHeadChoices[playerHeadChoices.length-1]);
      console.log(playerChoices);
    }
}

function secondRound() {
  $('#first').addClass('hidden');
  $('#second').removeClass('hidden');
  $('.head').html('<div><img src= ' + playerChoices[0] + '></div>')
  player01Turn();
  countdown01();
  showScore02();
  displayFaces();
  storeFaceChoices();
}
function showScore02() {
  // $('#title-page').append('<div id="player01-score">' + $p01Name.val()+ "'s score: " + game.player01.score + '</div>');
  // $('#title-page').append('<div id="player02-score">' + $p02Name.val() + "'s score: " + game.player02.score + '</div>');
  // $('#title-page').append('<button id="check">Check</button>');
  // $('#title-page').append('<button id="next">Next Round!</button>');
  $('#check').off('click', checkHeads);
  $('#check').one('click', checkFaces);
  $('#next').off('click', secondRound);
  $('#next').one('click', thirdRound);
}

function displayFaces() {
  $('#second').append('<div id="correct-face" class="face-option"><img src="images/Face_Correct.png"</div>');
  $('#second').append('<div class="face-option"><img src="images/Face_01.png"</div>');
  $('#second').append('<div class="face-option"><img src="images/Face_02.png"</div>');
  $('#second').append('<div class="face-option"><img src="images/Face_03.png"</div>');
  $('#second').append('<div class="face-option"><img src="images/Face_04.png"</div>');
  $('#second').append('<div class="face-option"><img src="images/Face_05.png"</div>');
}

var playerFaceChoices = [];
function storeFaceChoices() {
  $('.face-option').on('click', function() {
    if (timer != 0) {
    playerFaceChoices.push($(this).children().attr('src'));
    console.log(playerFaceChoices);
    }
  })
}

function checkFaces() { //when check button is clicked, check if the last click was correct, either correct or wrong, append the item and store it to the choices array
    console.log("checkFaces running!")
    if ( playerFaceChoices[playerFaceChoices.length-1] == correct[1].img && currentPlayer == $p01Name.val()) {
      console.log('CORRECTTT!!!');
      $('.face').html('<div><img src= ' + playerFaceChoices[playerFaceChoices.length-1] + '></div>');
      game.player01.score = game.player01.score + 1;
      $('#player01-score').text($p01Name.val()+ "'s score: " + game.player01.score);
      playerChoices.push(playerFaceChoices[playerFaceChoices.length-1]);
      console.log(playerChoices)
    } else if ( playerFaceChoices[playerFaceChoices.length-1] != correct[1].img && currentPlayer == $p01Name.val()) {
      console.log('NOOOOOO!');
      $('.face').html('<div><img src= ' + playerFaceChoices[playerFaceChoices.length-1] + '></div>');
      game.player01.score = game.player01.score - 2;
      $('#player01-score').text($p01Name.val()+ "'s score: " + game.player01.score);
      playerChoices.push(playerFaceChoices[playerFaceChoices.length-1]);
      console.log(playerChoices);
    }
}

function thirdRound() {
  $('#second').addClass('hidden');
  $('#third').removeClass('hidden');
  $('.head').html('<div><img src= ' + playerChoices[0] + '></div>');
  $('.face').html('<div><img src= ' + playerChoices[1] + '></div>');
  player02Turn();
  countdown01();
  showScore03();
  displayUppers();
  storeUpperChoices();
}

function showScore03() {
  $('#check').off('click', checkFaces);
  $('#check').one('click', checkUppers);
  $('#next').off('click', thirdRound);
  $('#next').one('click', fourthRound);
}

function displayUppers() {
  $('#third').append('<div id="correct-upper" class="upper-option"><img src="images/Upper_Correct.png"</div>');
  $('#third').append('<div class="upper-option"><img src="images/Upper_01.png"</div>');
  $('#third').append('<div class="upper-option"><img src="images/Upper_02.png"</div>');
  $('#third').append('<div class="upper-option"><img src="images/Upper_03.png"</div>');
  $('#third').append('<div class="upper-option"><img src="images/Upper_04.png"</div>');
  $('#third').append('<div class="upper-option"><img src="images/Upper_05.png"</div>');
}

var playerUpperChoices = [];
function storeUpperChoices() {
  $('.upper-option').on('click', function() {
    if (timer != 0) {
    playerUpperChoices.push($(this).children().attr('src'));
    console.log(playerUpperChoices);
    }
  })
}

function checkUppers() { //when check button is clicked, check if the last click was correct, either correct or wrong, append the item and store it to the choices array
  console.log("checkUppers running")
  if ( playerUpperChoices[playerUpperChoices.length-1] == correct[2].img && currentPlayer == $p02Name.val()) {
    console.log('CORRECTTT!!!');
    $('.upper').html('<div><img src= ' + playerUpperChoices[playerUpperChoices.length-1] + '></div>');
    game.player02.score = game.player02.score + 1;
    $('#player02-score').text($p02Name.val()+ "'s score: " + game.player02.score);
    playerChoices.push(playerUpperChoices[playerUpperChoices.length-1]);
    console.log(playerChoices)
  } else if ( playerUpperChoices[playerUpperChoices.length-1] != correct[2].img && currentPlayer == $p02Name.val()) {
    console.log('NOOOOOO!');
    $('.upper').html('<div><img src= ' + playerUpperChoices[playerUpperChoices.length-1] + '></div>');
    game.player02.score = game.player02.score - 2;
    $('#player02-score').text($p02Name.val()+ "'s score: " + game.player02.score);
    playerChoices.push(playerUpperChoices[playerUpperChoices.length-1]);
    console.log(playerChoices);
  }
}

function fourthRound() {
  $('#third').addClass('hidden');
  $('#fourth').removeClass('hidden');
  $('.head').html('<div><img src= ' + playerChoices[0] + '></div>');
  $('.face').html('<div><img src= ' + playerChoices[1] + '></div>');
  $('.upper').html('<div><img src= ' + playerChoices[2] + '></div>');
  player02Turn();
  countdown01();
  showScore04();
  displayLowers();
  storeLowerChoices();
}

function showScore04() {
  $('#check').off('click', checkUppers);
  $('#check').one('click', checkLowers);
  $('#next').off('click', fourthRound);
  $('#next').one('click', fifthRound);
}

function displayLowers() {
  $('#fourth').append('<div id="correct-lower" class="lower-option"><img src="images/Lower_correct.png"</div>');
  $('#fourth').append('<div class="lower-option"><img src="images/Lower_01.png"</div>');
  $('#fourth').append('<div class="lower-option"><img src="images/Lower_02.png"</div>');
  $('#fourth').append('<div class="lower-option"><img src="images/Lower_03.png"</div>');
  $('#fourth').append('<div class="lower-option"><img src="images/Lower_04.png"</div>');
  $('#fourth').append('<div class="lower-option"><img src="images/Lower_05.png"</div>');
}

var playerLowerChoices = [];
function storeLowerChoices() {
  $('.lower-option').on('click', function() {
    if (timer != 0) {
    playerLowerChoices.push($(this).children().attr('src'));
    console.log(playerLowerChoices);
    }
  })
}
function checkLowers() {
  console.log("checkLowers running")
  if ( playerLowerChoices[playerLowerChoices.length-1] == correct[3].img && currentPlayer == $p02Name.val()) {
    console.log('CORRECTTT!!!');
    $('.lower').html('<div><img src= ' + playerLowerChoices[playerLowerChoices.length-1] + '></div>');
    game.player02.score = game.player02.score + 1;
    $('#player02-score').text($p02Name.val()+ "'s score: " + game.player02.score);
    playerChoices.push(playerLowerChoices[playerLowerChoices.length-1]);
    console.log(playerChoices)
  } else if ( playerLowerChoices[playerLowerChoices.length-1] != correct[3].img && currentPlayer == $p02Name.val()) {
    console.log('NOOOOOO!');
    $('.lower').html('<div><img src= ' + playerLowerChoices[playerLowerChoices.length-1] + '></div>');
    game.player02.score = game.player02.score - 2;
    $('#player02-score').text($p02Name.val()+ "'s score: " + game.player02.score);
    playerChoices.push(playerLowerChoices[playerLowerChoices.length-1]);
    console.log(playerChoices);
  }
}
function fifthRound() {
  $('#fourth').addClass('hidden');
  $('#fifth').removeClass('hidden');
  $('.head').html('<div><img src= ' + playerChoices[0] + '></div>');
  $('.face').html('<div><img src= ' + playerChoices[1] + '></div>');
  $('.upper').html('<div><img src= ' + playerChoices[2] + '></div>');
  $('.lower').html('<div><img src= ' + playerChoices[3] + '></div>');
}
