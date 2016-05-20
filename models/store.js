// The main data array
var stores = [];

// Store constructor
var Store = function(name_input, open_time, hours_per_day, daily_projections) {
  this.name = name_input;
  this.daily_projections = daily_projections;

  // Format for estimate literals:
  // {
  //   time: format_time(date),
  //   pizzas: pizzas_this_hour,
  //   deliveries: deliveries_this_hour,
  //   drivers: recommended_drivers
  // };

  this.estimates; //array that contains estimate literals for every hour in each store object
  this.daily_total_pizzas = 0;
  this.daily_total_deliveries = 0;
  this.weekly_total_sales = 0;

  this.populate_estimates = function() {
    this.estimates = []; // must be reset each time
    for (var hour = 0; hour < hours_per_day; hour++) {
      this.estimates.push(this.generate_random_pizzas(hour));
    }
  };

  this.generate_random_pizzas = function(hour) {
    // projected pizzas made per hour depends on the range of the hour chosen
    var range_set = Math.floor(hour / 3); // Chooses one of the arrays in daily_projections
    if (typeof(daily_projections[range_set]) === 'undefined') {
      daily_projections.push([0,0,0,0]); // backstop for time overflow error - this error should be impossible once I fix the projections input field renderer
    }
    var range_this_hour = daily_projections[range_set][1] - daily_projections[range_set][0];
    var pizzas_over_min = Math.floor(Math.random() * range_this_hour);
    var pizzas_this_hour = daily_projections[range_set][0] + pizzas_over_min;
    this.daily_total_pizzas += pizzas_this_hour;

    // Deliveries possible depends on the hour and the total pizzas for that hour
    var max_deliveries_this_hour = Math.min(pizzas_this_hour, daily_projections[range_set][3]);
    var delivery_range_this_hour = max_deliveries_this_hour - daily_projections[range_set][2];
    var deliveries_over_min = Math.floor(Math.random() * delivery_range_this_hour);
    var deliveries_this_hour = daily_projections[range_set][2] + deliveries_over_min;
    this.daily_total_deliveries += deliveries_this_hour;

    // Recommended number of delivery drivers
    var recommended_drivers = Math.ceil(deliveries_this_hour / 3);
    var date = new Date();
    date.setHours(open_time + hour);

    // the pizza literal!
    return {
      time: format_time(date),
      pizzas: pizzas_this_hour,
      deliveries: deliveries_this_hour,
      drivers: recommended_drivers
    };
  };

  // estimate the past week's sales - also leaves one day estimated to represent the current day
  for (var day = 0; day < 6; day ++) {
    this.populate_estimates();
    this.weekly_total_sales += this.daily_total_pizzas;
  }
};

function format_time(time) {
  if (time.getHours() < 12) {
    var period = 'AM';
  } else {
    var period = 'PM';
  }
  var hour = time.getHours() % 12;
  if (hour == 0) {
    hour = 12;
  }
  return hour + ':00 ' + period;
}
