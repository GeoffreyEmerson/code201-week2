var store_names = ['Hillsboro', 'Pearl', 'DowntownPDX', 'Buckman', 'PDXairport', 'Clackamas'];
var stores = [];
var opening = 8;
var hours_open = 18;
var projected = [
  [0, 4, 0, 4],
  [0, 7, 0, 4],
  [2, 15, 1, 4],
  [15, 35, 3, 8],
  [12, 31, 5, 12],
  [5, 20, 5, 11]
];

// Check for sales-data page
var output_div = document.getElementById('stores_div');
if (output_div) {
  // Initialize store object array
  for (var i = 0; i < store_names.length; i++) {
    stores.push(new Store(store_names[i], opening, hours_open, projected));
  }
  display_tables(stores, output_div);
}

// Check for index
var output_span = document.getElementById('weekly_pizzas');
if (output_span) {
  var weekly_total = 0;
  for (var i = 0; i < store_names.length; i++) {
    stores.push(new Store(store_names[i], opening, hours_open, projected));
    var day = 0;
    do {
      for (var j = 0; j < stores[i].estimates.length; j++) {
        weekly_total += stores[i].estimates[j].pizzas;
      }
      day++;
      stores[i].populate_estimates();
    } while (day < 7);
  }
  output_span.innerText = weekly_total;
}
