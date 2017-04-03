var $body = $('body');
var $container = $('#container');
var $titleButton = $('#title-button');
var $title = $('#title-heading');
var $titlePage = $('#title-page');
var $p01Name = $("input[name='p01-name']");
var $p02Name = $("input[name='p02-name']");


//when tittle button is clicked, redo the titles
$titleButton.on('click', function() {
  redoTitle();
});

function clearAll() { //clear everything in the body
  $('*').off()
  $container.empty();
  $('*').off()
}

function redoTitle() {
  $title.css({fontSize: '40px'});
  $titlePage.css({marginTop: '10px'});
  $titleButton.remove();
  $('#p01-input').text('Player 1:  ' + $p01Name.val() );
  $('#p02-input').text('Player 2:  ' + $p02Name.val() );
  $container.append('<div id="how-box"><button id="how">How to Play</button></div>');
  $('#how').one('click', showIns);
}
//when how to play button is clicked show Instructions
function showIns() {
  $container.append("<div id='instructions'><p>Instructions</p><ol><li>Remember!!</li><li>Wearing what?</li><li>Holding what?</li><li>Standing how?</li><li>Where?</li><li>Read the mind!</li><li>Name it!</li><ol></div>");
  $container.append("<div id='start-box'><button id='start'>START</button></div>");
  $('#start').on('click', function() {
  clearAll();
  startGame();
  });
}
//Main picture shown
function startGame() {
  console.log("game started");
}
