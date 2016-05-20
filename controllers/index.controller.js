// Build data for use in the index view

function calculate_weekly_total(stores) {
  var result = 0;

  for (var store = 0; store < stores.length; store++) {
    result += stores[store].weekly_total_sales;
  }
  return result;
}

var weekly_total = calculate_weekly_total(stores);

// pass data to the index view
display_weekly_total(weekly_total);

// activate index view js animation
scroll_billboard();
