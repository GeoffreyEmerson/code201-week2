// Build data for use in the index view

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

// pass data to the index view
display_weekly_total(weekly_total);

// activate index view js animation
scroll_billboard();
