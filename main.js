var $body = $('body');
var $title_button = $('#title-button');
var $title = $('#title-heading');
var $title_page = $('#title-page');

//when tittle button is clicked, redo the titles
$title_button.on('click', redoTitle);

function redoTitle() {
  $title.css({fontSize: '40px'});
  $title_page.css({marginTop: '10px'})
  $title_button.remove();
}
