var $body = $('body');
var $title_button = $('#title-button');
var $title = $('#title-heading');
var $title_page = $('#title-page');
var $p01_name = $("input[name='p01-name']");
var $p02_name = $("input[name='p02-name']");


//when tittle button is clicked, redo the titles
$title_button.on('click', redoTitle);

function redoTitle() {
  $title.css({fontSize: '40px'});
  $title_page.css({marginTop: '10px'})
  $title_button.remove();
  $('#p01-input').text('Player 1:  ' + $p01_name.val() );
  $('#p02-input').text('Player 2:  ' + $p02_name.val() );
  $body.append('<button id="how">How to Play</button>');
}
