var store_names = ['Hillsboro', 'Pearl', 'DowntownPDX', 'Buckman', 'PDXairport', 'Clackamas'];
var stores = [];
var opening = 8;
var hours_open = 18;

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

    // Recommended number of delivery drivers
    var recommended_drivers = Math.ceil(deliveries_this_hour / 3);
    return {
      pizzas: pizzas_this_hour,
      deliveries: deliveries_this_hour,
      drivers: recommended_drivers
    };
  };
};

var output_div = document.getElementById('stores_div');

// Initialize store object array
for (var i = 0; i < store_names.length; i++) {
  stores.push(new Store(store_names[i]));

  var store_header = document.createElement('h2').appendChild(document.createTextNode(stores[i].name));
  output_div.appendChild(store_header);

  var table_el = document.createElement('table');
  var header_row = document.createElement('thead');
  var table_row = document.createElement('tr');
  var headers = ['Hour', 'Total Pizzas Made', 'Deliveries Made', 'Recommended Drivers'];
  for (var j = 0; j < headers.length; j++) {
    var th_col = document.createElement('th');
    th_col.appendChild(document.createTextNode(headers[j]));
    table_row.appendChild(th_col);
  }
  header_row.appendChild(table_row);
  table_el.appendChild(header_row);

  // build tbody
  var tbody = document.createElement('tbody');
  for (var hour = 0; hour < hours_open; hour++) {
    var random_obj = stores[i].generate_random_pizzas(hour);
    var time = new Date();
    time.setHours(opening + hour);
    var table_row = document.createElement('tr');
    var cells = [format_time(time), random_obj.pizzas, random_obj.deliveries, random_obj.drivers];
    for (var j = 0; j < cells.length; j++) {
      var th_col = document.createElement('th');
      th_col.appendChild(document.createTextNode(cells[j]));
      table_row.appendChild(th_col);
    }
    tbody.appendChild(table_row);
  }

  table_el.appendChild(tbody);

  output_div.appendChild(table_el);
}

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
