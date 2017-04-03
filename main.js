var $title_button = $('#title-button');
var $title = $('#title');
var $title_page = $('#title-page');

$title_button.on('click', redoTitle);

function redoTitle() {
  $title.css({fontSize: '40px'});
  $title_page.css({marginTop: '10px'})
  $title_button.remove();
}
