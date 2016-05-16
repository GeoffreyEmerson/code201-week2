var store_names = ['Hillsboro', 'Pearl', 'DowntownPDX', 'Buckman', 'PDXairport', 'Clackamas'];
var stores = [];

// Store constructor
var Store = function(name_input) {
  this.name = name_input;

  this.generate_random_pizzas = function(hour) {
    var projected = [
      [0, 4, 0, 4],
      [0, 7, 0, 4],
      [2, 15, 1, 4],
      [15, 35, 3, 8],
      [12, 31, 5, 12],
      [5, 20, 5, 11]
    ];
    // Possible pizzas made per hour depends on the range of the hour chosen
    var range_set = Math.floor(hour / 3);
    var range_this_hour = projected[range_set][1] - projected[range_set][0];
    var pizzas_over_min = Math.floor(Math.random() * range_this_hour);
    var pizzas_this_hour = projected[range_set][0] + pizzas_over_min;

    // Deliveries possible depends on the hour and the total pizzas for that hour
    var max_deliveries_this_hour;
    if (pizzas_this_hour < projected[range_set][3]) {
      max_deliveries_this_hour = pizzas_this_hour;
    } else {
      max_deliveries_this_hour = projected[range_set][3];
    }
    var delivery_range_this_hour = max_deliveries_this_hour - projected[range_set][2];
    var deliveries_over_min = Math.floor(Math.random() * delivery_range_this_hour);
    var deliveries_this_hour = projected[range_set][2] + deliveries_over_min;

    return [pizzas_this_hour, deliveries_this_hour];
  };
};

// Initialize store object array
for (var i = 0; i < store_names.length; i++) {
  stores.push(new Store(store_names[i]));
}
