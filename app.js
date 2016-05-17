var store_names = ['Hillsboro', 'Pearl', 'DowntownPDX', 'Buckman', 'PDXairport', 'Clackamas'];
var stores = [];
var opening = 8;
var hours_open = 18;
var projections =
  [
    [ // Hillsboro projections
      [0, 4, 0, 4],
      [0, 7, 0, 4],
      [2, 15, 1, 4],
      [15, 35, 3, 8],
      [12, 31, 5, 12],
      [5, 20, 5, 11]
    ],
    [ // Pearl projections
      [1, 7, 1, 3],
      [5, 9, 2, 8],
      [2, 13, 1, 6],
      [18, 32, 3, 9],
      [5, 12, 1, 3],
      [8, 20, 6, 16],
    ],
    [ // DowntownPDX projections
      [0, 4, 0, 4],
      [0, 7, 0, 4],
      [2, 15, 1, 4],
      [10, 26, 4, 6],
      [8, 22, 7, 15],
      [0, 8, 0, 2],
    ],
    [ // Buckman projections
      [0, 4, 0, 4],
      [0, 7, 0, 4],
      [5, 15, 0, 4],
      [25, 39, 13, 18],
      [22, 36, 5, 22],
      [16, 31, 5, 21]
    ],
    [ // PDXairport projections
      [2, 7, 0, 0],
      [3, 9, 0, 0],
      [1, 5, 0, 0],
      [5, 13, 0, 0],
      [22, 42, 0, 0],
      [15, 21, 0, 0],
    ],
    [ // Clackamas projections
      [0, 4, 0, 4],
      [0, 7, 0, 4],
      [2, 15, 1, 4],
      [6, 19, 5, 9],
      [4, 8, 2, 5],
      [2, 5, 2, 4]
    ]
  ];


// Check for sales-data page
var output_div = document.getElementById('stores_div');
if (output_div) {
  // Initialize store object array
  for (var i = 0; i < store_names.length; i++) {
    stores.push(new Store(store_names[i], opening, hours_open, projections[i]));
  }
  display_tables(stores, output_div);
}

// Check for index
var output_span = document.getElementById('weekly_pizzas');
if (output_span) {
  var weekly_total = 0;
  for (var i = 0; i < store_names.length; i++) {
    stores.push(new Store(store_names[i], opening, hours_open, projections[i]));
    var day = 0;
    do {
      for (var j = 0; j < stores[i].estimates.length; j++) {
        weekly_total += stores[i].estimates[j].pizzas;
      }
      day++;
      stores[i].populate_estimates();
    } while (day < 7);
  }
  display_weekly_total(weekly_total, output_span);
}
