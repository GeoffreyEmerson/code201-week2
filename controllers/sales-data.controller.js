// Initialize store object array
for (var i = 0; i < store_names.length; i++) {
  stores.push(new Store(store_names[i], opening, hours_open, projections[i]));
}

// put together the hour by hour totals for all locations
var hourly_totals = {};

function calculate_totals() {
  hourly_totals = {};
  for (var i = 0; i < stores.length; i++) {
    var current_store_estimates = stores[i].estimates;
    for (var j = 0; j < current_store_estimates.length; j++) {
      if (current_store_estimates[j].time in hourly_totals) {
        hourly_totals[current_store_estimates[j].time][0] += current_store_estimates[j].pizzas;
        hourly_totals[current_store_estimates[j].time][1] += current_store_estimates[j].deliveries;
      } else {
        hourly_totals[current_store_estimates[j].time] = [current_store_estimates[j].pizzas,current_store_estimates[j].deliveries];
      }
    }
  }
}

// send data to sales-data view
display_tables(stores);
calculate_totals();
display_hourly_totals(hourly_totals);
render_add_store_form();

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
  console.info(event);
  stores.push(new Store(event.target[1].value,
                        parseInt(event.target[2].value),
                        parseInt(event.target[3].value),
                        pull_projections_from_event(event)));
  calculate_totals();
  display_tables(stores);
  display_hourly_totals(hourly_totals);
  render_add_store_form();
}
