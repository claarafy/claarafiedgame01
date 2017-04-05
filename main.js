var $body = $('body');
var $container = $('.container');
var $titleButton = $('#title-button');
var $title = $('#title-heading');
var $titlePage = $('#title-page');
var $p01Name = $("input[name='p01-name']");
var $p02Name = $("input[name='p02-name']");
var timer;
var game = {
  player01: {name: "", score: 0},
  player02: {name: "", score: 0},
  time: 15
}
var currentPlayer = game.player01;

//when "jQuery link" button is clicked, redo the titles
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
  $container.append("<div id='instructions'><p>Instructions</p><ol><li>Remember!!</li><li>Wearing what?</li><li>Holding what?</li><li>Standing how?</li><li>Where?</li><li>Read the mind!</li><li>Name it!</li><ol></div>");
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
  countdown();
};
//countdown
function countdown() {
  timer = 3;
  var startCountdown = setInterval(function() {
    if (timer == 0) {
      $('.timer01').text('Time over!');
      $('#main').addClass('hidden'); //when timer hits 0, hide the #main
      clearInterval(startCountdown);
      firstRound();
    }
    else {
    $('.timer01').text('Time: ' + (timer -=  1));
    }
  }, 1000);
}

function firstRound() {
  $('#first').removeClass('hidden');
  player02Turn();
  displayHeads();
  checkHeads();
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

var correct = [
    { name:'head', img: "Head_Correct.png" },
    { name:'face', img: "Face_Correct.png"},
    { name:'upper', img: "Upper_Correct.png"},
    { name:'lower', img: "Lower_Correct.png"},
    { name:'feet', img: "Feet_Correct.png"}
  ];
function displayHeads() {
  $('#first').append('<div id="correct-head" class="head-option"><img src="Head_Correct.png"</div>');
  $('#first').append('<div class="head-option"><img src="Head_01.png"</div>');
  $('#first').append('<div class="head-option"><img src="Head_02.png"</div>');
  $('#first').append('<div class="head-option"><img src="Head_03.png"</div>');
  $('#first').append('<div class="head-option"><img src="Head_04.png"</div>');
  $('#first').append('<div class="head-option"><img src="Head_05.png"</div>');
}

function checkHeads() {
  $('.head-option').on('click', function() {
    if ($(this).children().attr('src') == correct[0].img) {
      alert('CORRECTTT!!!')
    } else {
      alert('NOOOOOO!')
    }
  })
}
