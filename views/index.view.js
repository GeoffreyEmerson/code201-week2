function display_weekly_total(weekly_total, output_span) {
  output_span.innerText = weekly_total;
}

function scroll_billboard() {
  var scroller = document.getElementById('scroll');
  console.log('Scroller: ' + scroller.innerText );

  function shiftStringLeft(str) {
    return str.substr(1, str.length) + str.charAt(0);
  }

  setInterval(function() {
    var moving_string = scroller.innerText;
    moving_string = shiftStringLeft(moving_string);
    scroller.innerText = moving_string;
  }, 500);
}
