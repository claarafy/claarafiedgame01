var timer;
var game = {
  player01: {name: "", score: 0},
  player02: {name: "", score: 0},
  // time: 15
}
var currentPlayer;
var $p01Name = $("input[name='p01-name']");
var $p02Name = $("input[name='p02-name']");
var correctAnswers = [
    { name:'head', img: "images/Head_Correct.png" },
    { name:'face', img: "images/Face_Correct.png"},
    { name:'upper', img: "images/Upper_Correct.png"},
    { name:'lower', img: "images/Lower_Correct.png"},
    { name:'feet', img: "images/Feet_Correct.png"},
    { name: 'characterName', value: "correct"}
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
  $('#main').removeClass('hidden');
  $('.timer').removeClass('hidden');//show the picture
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
  timer = 1;
  $('.timer').text('Time: '+timer);
  var startCountdown = setInterval(function() {
    if (timer == 0) {
      $('.timer').text('0');
      clearInterval(startCountdown);
      $('#check').removeClass('hidden');
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
  $('#title-page').append('<button id="check" class="hidden">Check</button>');
  $('#title-page').append('<button id="next" class="hidden">Next Round!</button>');
  $('#check').one('click', checkHeads);
  $('#next').one('click', secondRound);
}
//display head options to pick from
function displayHeads() {
  $('#first').append('<div id="correct-head" class="head-option"><img src="images/Head_Correct.png"></div>');
  $('#first').append('<div class="head-option"><img src="images/Head_01.png"></div>');
  $('#first').append('<div class="head-option"><img src="images/Head_02.png"></div>');
  $('#first').append('<div class="head-option"><img src="images/Head_03.png"></div>');
  $('#first').append('<div class="head-option"><img src="images/Head_04.png"></div>');
  $('#first').append('<div class="head-option"><img src="images/Head_05.png"></div>');
}
//check if the clicked head is the correct answer
var playerHeadChoices = [];
function storeHeadChoices() {
  $('.head-option').on('click', function() {
    if (timer != 0) {
    playerHeadChoices.push($(this).children().attr('src'));
    $('.head').html("<img src=" + $(this).children().attr('src') + ">");
    console.log(playerHeadChoices);
    }
  })
}
//
function checkHeads() { //when check button is clicked, check if the last click was correct, either correct or wrong, append the item and store it to the choices array
  console.log("checkHeads running!");
  $('#check').addClass('hidden');
  $('#next').removeClass('hidden');
    if ( playerHeadChoices[playerHeadChoices.length-1] == correctAnswers[0].img && currentPlayer == $p02Name.val()) { //if player 2 is playing, and picks the correct answer add score
      console.log('CORRECT HEAD!!');
      $('.head').html('<div><img src= ' + playerHeadChoices[playerHeadChoices.length-1] + '></div>');
      game.player02.score = game.player02.score + 1;
      $('#player02-score').text($p02Name.val()+ "'s score: " + game.player02.score);
      playerChoices.push(playerHeadChoices[playerHeadChoices.length-1]);
      console.log(playerChoices)
    } else if ( playerHeadChoices[playerHeadChoices.length-1] != correctAnswers[0].img && playerHeadChoices.length != 0 && currentPlayer == $p02Name.val()) { //if player 2 is playing, and picks the wrong answer minus score
      console.log('WRONG HEAD!');
      $('.head').html('<div><img src= ' + playerHeadChoices[playerHeadChoices.length-1] + '></div>');
      game.player02.score = game.player02.score - 2;
      $('#player02-score').text($p02Name.val()+ "'s score: " + game.player02.score);
      playerChoices.push(playerHeadChoices[playerHeadChoices.length-1]);
      console.log(playerChoices);
    } else if ( playerHeadChoices.length == 0 && currentPlayer == $p02Name.val()) {
      console.log("You didn't pick any head!")
      $('.head').html('<div><img src="images/Head_No.png"></div>');
      game.player02.score = game.player02.score - 2;
      $('#player02-score').text($p02Name.val()+ "'s score: " + game.player02.score);
      playerChoices.push("images/Head_No.png");
      console.log(playerChoices);
    }
}
//second round
function secondRound() {
  $('#next').addClass('hidden');
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
    $('.face').html("<img src=" + $(this).children().attr('src') + ">");
    console.log(playerFaceChoices);
    }
  })
}

function checkFaces() { //when check button is clicked, check if the last click was correct, either correct or wrong, append the item and store it to the choices array
    console.log("checkFaces running!")
    $('#check').addClass('hidden');
    $('#next').removeClass('hidden');
    if ( playerFaceChoices[playerFaceChoices.length-1] == correctAnswers[1].img && currentPlayer == $p01Name.val()) {
      console.log('CORRECTTT!!!');
      $('.face').html('<div><img src= ' + playerFaceChoices[playerFaceChoices.length-1] + '></div>');
      game.player01.score = game.player01.score + 1;
      $('#player01-score').text($p01Name.val()+ "'s score: " + game.player01.score);
      playerChoices.push(playerFaceChoices[playerFaceChoices.length-1]);
      console.log(playerChoices)
    } else if ( playerFaceChoices[playerFaceChoices.length-1] != correctAnswers[1].img && playerFaceChoices.length != 0 && currentPlayer == $p01Name.val()) {
      console.log('NOOOOOO!');
      $('.face').html('<div><img src= ' + playerFaceChoices[playerFaceChoices.length-1] + '></div>');
      game.player01.score = game.player01.score - 2;
      $('#player01-score').text($p01Name.val()+ "'s score: " + game.player01.score);
      playerChoices.push(playerFaceChoices[playerFaceChoices.length-1]);
      console.log(playerChoices);
    } else if ( playerFaceChoices.length == 0 && currentPlayer == $p01Name.val()) {
      console.log("You didn't pick anything!")
      $('.face').html('<div><img src="images/Face_No.png"></div>');
      game.player01.score = game.player01.score - 2;
      $('#player01-score').text($p01Name.val()+ "'s score: " + game.player01.score);
      playerChoices.push("images/Face_No.png");
      console.log(playerChoices);
    }
}
//third round
function thirdRound() {
  $('#next').addClass('hidden');
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
    $('.upper').html("<img src=" + $(this).children().attr('src') + ">");
    console.log(playerUpperChoices);
    }
  })
}

function checkUppers() { //when check button is clicked, check if the last click was correct, either correct or wrong, append the item and store it to the choices array
  console.log("checkUppers running")
  $('#check').addClass('hidden');
  $('#next').removeClass('hidden');
  if ( playerUpperChoices[playerUpperChoices.length-1] == correctAnswers[2].img && currentPlayer == $p02Name.val()) {
    console.log('CORRECTTT!!!');
    $('.upper').html('<div><img src= ' + playerUpperChoices[playerUpperChoices.length-1] + '></div>');
    game.player02.score = game.player02.score + 1;
    $('#player02-score').text($p02Name.val()+ "'s score: " + game.player02.score);
    playerChoices.push(playerUpperChoices[playerUpperChoices.length-1]);
    console.log(playerChoices)
  } else if ( playerUpperChoices[playerUpperChoices.length-1] != correctAnswers[2].img && playerUpperChoices.length != 0 && currentPlayer == $p02Name.val()) {
    console.log('NOOOOOO!');
    $('.upper').html('<div><img src= ' + playerUpperChoices[playerUpperChoices.length-1] + '></div>');
    game.player02.score = game.player02.score - 2;
    $('#player02-score').text($p02Name.val()+ "'s score: " + game.player02.score);
    playerChoices.push(playerUpperChoices[playerUpperChoices.length-1]);
    console.log(playerChoices);
  } else if ( playerUpperChoices.length == 0 && currentPlayer == $p02Name.val()) {
    console.log("You didn't pick any upper!")
    $('.upper').html('<div><img src="images/Upper_No.png"></div>');
    game.player02.score = game.player02.score - 2;
    $('#player02-score').text($p02Name.val()+ "'s score: " + game.player02.score);
    playerChoices.push("images/Upper_No.png");
    console.log(playerChoices);
  }
}

function fourthRound() {
  $('#next').addClass('hidden');
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
  $('#fourth').append('<div id="correct-lower" class="lower-option"><img src="images/Lower_Correct.png"</div>');
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
    $('.lower').html("<img src=" + $(this).children().attr('src') + ">");
    console.log(playerLowerChoices);
    }
  })
}
function checkLowers() {
  console.log("checkLowers running")
  $('#check').addClass('hidden');
  $('#next').removeClass('hidden');
  if ( playerLowerChoices[playerLowerChoices.length-1] == correctAnswers[3].img && currentPlayer == $p02Name.val()) {
    console.log('CORRECTTT!!!');
    $('.lower').html('<div><img src= ' + playerLowerChoices[playerLowerChoices.length-1] + '></div>');
    game.player02.score = game.player02.score + 1;
    $('#player02-score').text($p02Name.val()+ "'s score: " + game.player02.score);
    playerChoices.push(playerLowerChoices[playerLowerChoices.length-1]);
    console.log(playerChoices)
  } else if ( playerLowerChoices[playerLowerChoices.length-1] != correctAnswers[3].img && playerLowerChoices.length != 0 && currentPlayer == $p02Name.val()) {
    console.log('NOOOOOO!');
    $('.lower').html('<div><img src= ' + playerLowerChoices[playerLowerChoices.length-1] + '></div>');
    game.player02.score = game.player02.score - 2;
    $('#player02-score').text($p02Name.val()+ "'s score: " + game.player02.score);
    playerChoices.push(playerLowerChoices[playerLowerChoices.length-1]);
    console.log(playerChoices);
  } else if ( playerLowerChoices.length == 0 && currentPlayer == $p02Name.val()) {
    console.log("You didn't pick any upper!")
    $('.lower').html('<div><img src="images/Lower_No.png"></div>');
    game.player02.score = game.player02.score - 2;
    $('#player02-score').text($p02Name.val()+ "'s score: " + game.player02.score);
    playerChoices.push("images/Lower_No.png");
    console.log(playerChoices);
  }
}
function fifthRound() {
  $('#next').addClass('hidden');
  $('#fourth').addClass('hidden');
  $('#fifth').removeClass('hidden');
  $('.head').html('<div><img src= ' + playerChoices[0] + '></div>');
  $('.face').html('<div><img src= ' + playerChoices[1] + '></div>');
  $('.upper').html('<div><img src= ' + playerChoices[2] + '></div>');
  $('.lower').html('<div><img src= ' + playerChoices[3] + '></div>');
  player01Turn();
  countdown01();
  showScore05();
  displayFeets();
  storeFeetChoices();
}

function showScore05() {
  $('#check').off('click', checkLowers);
  $('#check').one('click', checkFeets);
  $('#next').off('click', fifthRound);
  $('#next').one('click', sixthRound);
}

function displayFeets() {
  $('#fifth').append('<div id="correct-feet" class="feet-option"><img src="images/Feet_Correct.png"></div>');
  $('#fifth').append('<div class="feet-option"><img src="images/Feet_01.png"></div>');
  $('#fifth').append('<div class="feet-option"><img src="images/Feet_02.png"></div>');
  $('#fifth').append('<div class="feet-option"><img src="images/Feet_03.png"></div>');
  $('#fifth').append('<div class="feet-option"><img src="images/Feet_04.png"></div>');
  $('#fifth').append('<div class="feet-option"><img src="images/Feet_05.png"></div>');
}

var playerFeetChoices = [];
function storeFeetChoices() {
  $('.feet-option').on('click', function() {
    if (timer != 0) {
    playerFeetChoices.push($(this).children().attr('src'));
    $('.feet').html("<img src=" + $(this).children().attr('src') + ">");
    console.log(playerFeetChoices);
    }
  })
}
function checkFeets() {
  console.log("checkFeets running")
  $('#check').addClass('hidden');
  $('#next').removeClass('hidden');
  if ( playerFeetChoices[playerFeetChoices.length-1] == correctAnswers[4].img && currentPlayer == $p01Name.val()) {
    console.log('CORRECTTT!!!');
    $('.feet').html('<div><img src= ' + playerFeetChoices[playerFeetChoices.length-1] + '></div>');
    game.player01.score = game.player01.score + 1;
    $('#player01-score').text($p01Name.val()+ "'s score: " + game.player01.score);
    playerChoices.push(playerFeetChoices[playerFeetChoices.length-1]);
    console.log(playerChoices)
  } else if ( playerFeetChoices[playerFeetChoices.length-1] != correctAnswers[4].img && playerFeetChoices.length != 0 && currentPlayer == $p01Name.val()) {
    console.log('NOOOOOO!');
    $('.feet').html('<div><img src= ' + playerFeetChoices[playerFeetChoices.length-1] + '></div>');
    game.player01.score = game.player01.score - 2;
    $('#player01-score').text($p01Name.val()+ "'s score: " + game.player01.score);
    playerChoices.push(playerFeetChoices[playerFeetChoices.length-1]);
    console.log(playerChoices);
  } else if ( playerFeetChoices.length == 0 && currentPlayer == $p01Name.val()) {
    console.log("You didn't pick any upper!")
    $('.feet').html('<div><img src="images/Feet_No.png"></div>');
    game.player01.score = game.player01.score - 2;
    $('#player01-score').text($p01Name.val()+ "'s score: " + game.player01.score);
    playerChoices.push("images/Feet_No.png");
    console.log(playerChoices);
  }
}
function sixthRound() {
  $('#next').addClass('hidden');
  $('#fifth').addClass('hidden');
  $('#sixth').removeClass('hidden');
  $('.head').html('<div><img src= ' + playerChoices[0] + '></div>');
  $('.face').html('<div><img src= ' + playerChoices[1] + '></div>');
  $('.upper').html('<div><img src= ' + playerChoices[2] + '></div>');
  $('.lower').html('<div><img src= ' + playerChoices[3] + '></div>');
  $('.feet').html('<div><img src= ' + playerChoices[4] + '></div>');
  player01Turn();
  displayNames();
  showScore06();
  storeNameChoices();
  $('#check').removeClass('hidden');
}

function showScore06() {
  $('#check').off('click', checkFeets);
  $('#check').one('click', checkNames);
  $('#next').off('click', sixthRound);
  $('#next').one('click', scoreRound);
}

function displayNames() {
  $('#sixth').append('<div class="name-option">What was his/her name?<form><input type="radio" name="name-option" value="correct"><label for="Skaflowne">Skaflowne</label><br><input type="radio" name="name-option" value=""><label for="Skuflowne">Skuflowne</label><br><input type="radio" name="name-option" value=""><label for="Skeflowne">Skeflowne</label><br><input type="radio" name="name-option" value=""><label for="Skiflowne">Skiflowne</label><br><input type="radio" name="name-option" value=""><label for="Skflowne">Skflowne</label><br></form></div>');
}

var playerNameChoices = [];
function storeNameChoices() {
  $('.name-option').on('click', 'input', function () {
    playerNameChoices.push($(this).attr('value'));
  })
}
function checkNames() {
  $('#check').addClass('hidden');
  $('#next').removeClass('hidden');
  $('#next').text('Show Score!');
  if ( playerNameChoices[playerNameChoices.length - 1] == "correct" && currentPlayer == $p01Name.val()) {
    console.log('Correct Name!');
    game.player01.score = game.player01.score + 1;
    $('#player01-score').text($p01Name.val()+ "'s score: " + game.player01.score);
    playerChoices.push(playerNameChoices[playerNameChoices.length-1]);
    console.log(playerChoices);
  } else if ( playerNameChoices[playerNameChoices.length-1] == "" && playerNameChoices.length != 0 && currentPlayer == $p01Name.val()) {
    console.log('NOOOOOO!');
    game.player01.score = game.player01.score - 2;
    $('#player01-score').text($p01Name.val()+ "'s score: " + game.player01.score);
    playerChoices.push(playerNameChoices[playerNameChoices.length-1]);
    console.log(playerChoices);
  }
}

function scoreRound() {
  $('#sixth').addClass('hidden');
  $('#last').removeClass('hidden');
  $('#check').addClass('hidden');
  $('#next').addClass('hidden');
  $('.timer').addClass('hidden');
  $('#p01-input').text($p01Name.val() +" & " + $p02Name.val() + "'s work!");
  $('#p02-input').addClass('hidden');
  $('#player01-score').addClass('hidden');
  $('#player02-score').addClass('hidden');
  displayPlayerChoices();
  showAnswers();
  reportCard();
  reset();
}

function displayPlayerChoices() {
  $('#playerBody').append('<div><img src= ' + playerChoices[0] + '></div>');
  $('#playerBody').append('<div><img src= ' + playerChoices[1] + '></div>');
  $('#playerBody').append('<div><img src= ' + playerChoices[2] + '></div>');
  $('#playerBody').append('<div><img src= ' + playerChoices[3] + '></div>');
  $('#playerBody').append('<div><img src= ' + playerChoices[4] + '></div>');
  $('#playerBody').append("<div id='nameChecked'>Name: " + $('input:radio:checked').next('label').text() + "</div>");
}

function showAnswers() {
  $('#checkAnswerButton').on('click', function () {
    $('#solution>img').removeClass('hidden');
    $('#solution>p').removeClass('hidden');
    $('#checkAnswerButton').addClass('hidden');
    if (playerChoices[0] == correctAnswers[0].img) {
      $('#headAnswer').text($p02Name.val() + " was correct! +1")
    }
    else if (playerChoices[0] != correctAnswers[0].img) {
      $('#headAnswer').text($p02Name.val() +" was wrong! -2")
    }
    if (playerChoices[1] == correctAnswers[1].img) {
      $('#faceAnswer').text($p01Name.val() + " was correct! +1")
    }
    else if (playerChoices[1] != correctAnswers[1].img) {
      $('#faceAnswer').text($p01Name.val() +" was wrong! -2")
    }
    if (playerChoices[2] == correctAnswers[2].img) {
      $('#upperAnswer').text($p02Name.val() + " was correct! +1")
    }
    else if (playerChoices[2] != correctAnswers[2].img) {
      $('#upperAnswer').text($p02Name.val() +" was wrong! -2")
    }
    if (playerChoices[3] == correctAnswers[3].img) {
      $('#lowerAnswer').text($p02Name.val() + " was correct! +1")
    }
    else if (playerChoices[3] != correctAnswers[3].img) {
      $('#lowerAnswer').text($p02Name.val() +" was wrong! -2")
    }
    if (playerChoices[4] == correctAnswers[4].img) {
      $('#feetAnswer').text($p01Name.val() + " was correct! +1")
    }
    else if (playerChoices[4] != correctAnswers[4].img) {
      $('#feetAnswer').text($p01Name.val() +" was wrong! -2")
    }
    if (playerChoices[5] == correctAnswers[5].value) {
      $('#nameAnswer').text($p01Name.val() + " was correct! +1")
    }
    else if (playerChoices[5] != correctAnswers[5].value) {
      $('#nameAnswer').text($p01Name.val() +" was wrong! -2")
    }
    $('#finalScore').removeClass('hidden');
  })
}

function reportCard() {
  $('#checkFinalScore').one('click', function() {
  $('#p01final').append($p01Name.val()+ "'s score: " + game.player01.score);
  $('#p02final').append($p02Name.val()+ "'s score: " + game.player02.score);
  $('#resetArea').removeClass('hidden');
  })
}

function reset() {
  $('#reset').on('click', function() {
    $body.empty();
    $body.append("<div id='life'>You don't get to reset lives, so there is no reset on this game..</div>")
  })
}
