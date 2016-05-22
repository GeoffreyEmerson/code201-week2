// put together the hour by hour totals for all locations for a single day
var hourly_totals = calculate_hourly_totals(stores);

function calculate_hourly_totals(stores) {
  var result = {};
  for (var i = 0; i < stores.length; i++) {
    var current_store_estimates = stores[i].estimates;
    for (var j = 0; j < current_store_estimates.length; j++) {
      if (current_store_estimates[j].time in result) {
        result[current_store_estimates[j].time][0] += current_store_estimates[j].pizzas;
        result[current_store_estimates[j].time][1] += current_store_estimates[j].deliveries;
      } else {
        result[current_store_estimates[j].time] = [current_store_estimates[j].pizzas,current_store_estimates[j].deliveries];
      }
    }
  }
  return result;
}

// send data to sales-data view
display_tables(stores);
display_hourly_totals(hourly_totals);
display_weekly_totals(stores);
render_add_store_form();
set_up_modal();

function pull_projections_from_event(event) {
  var result_array = [];
  var t = event.target;
  for( var i = 0; i < 24; i += 4) {
    var num1 = Number(t[i + 4].value);
    var num2 = Number(t[i + 5].value);
    var num3 = Number(t[i + 6].value);
    var num4 = Number(t[i + 7].value);
    result_array.push([num1,num2,num3,num4]);
  }
  return result_array;
}

function add_store(event) { //store_name, opening, hours_open, projections
  event.preventDefault();
  stores.push(new Store(event.target[1].value,
                        parseInt(event.target[2].value),
                        parseInt(event.target[3].value),
                        pull_projections_from_event(event)));
  hourly_totals = calculate_hourly_totals(stores);
  display_tables(stores);
  display_hourly_totals(hourly_totals);
  display_weekly_totals(stores);
  render_add_store_form();
  set_up_modal();
  smooth_scroll_to(document.getElementById(event.target[1].value + '_div'));
}

// Custom smoothed auto-scrolling
function smooth_scroll_to(element) {
  if (element) {
    var next_jump = window.scrollY + Math.ceil((element.offsetTop - window.scrollY) / 8 );
    if ( Math.abs(window.scrollY - next_jump) > 0 ) {
      window.setTimeout(render_scroll, 50, next_jump, element);
    } else {
      console.log('scroll done.');
    }
  }
}

function render_scroll(next_jump,element) {
  window.scrollTo(0, next_jump);
  smooth_scroll_to(element);
}
