// Build tables
function display_tables(store_array, output_div) {
  for (var i = 0; i < store_array.length; i++) {
    var current_store = store_array[i];

    // build h2 with store name
    var store_header = document.createElement('h3');
    store_header.appendChild(document.createTextNode(current_store.name));

    //start building table with header row
    var table_row = document.createElement('tr');
    var headers = ['Hour', 'Total Pizzas Made', 'Deliveries Made', 'Recommended Drivers'];
    for (var j = 0; j < headers.length; j++) {
      var th_col = document.createElement('th');
      th_col.appendChild(document.createTextNode(headers[j]));
      table_row.appendChild(th_col);
    }

    // build and assemble the table header
    var header_row = document.createElement('thead');
    header_row.appendChild(table_row);

    // now build tbody
    var tbody = document.createElement('tbody');
    for (var j = 0; j < current_store.estimates.length; j++) {
      var table_row = document.createElement('tr');
      var cells = [current_store.estimates[j].time,
                   current_store.estimates[j].pizzas,
                   current_store.estimates[j].deliveries,
                   current_store.estimates[j].drivers];
      for (var k = 0; k < cells.length; k++) {
        var th_col = document.createElement('td');
        th_col.appendChild(document.createTextNode(cells[k]));
        table_row.appendChild(th_col);
      }
      tbody.appendChild(table_row);
    }

    // and lastly build the table footer
    var tfoot = document.createElement('tfoot');
    var table_row = document.createElement('tr');
    var th_col = document.createElement('td');
    th_col.appendChild(document.createTextNode('Totals'));
    table_row.appendChild(th_col);
    th_col = document.createElement('td');
    th_col.appendChild(document.createTextNode(current_store.daily_total_pizzas));
    table_row.appendChild(th_col);
    th_col = document.createElement('td');
    th_col.appendChild(document.createTextNode(current_store.daily_total_deliveries));
    table_row.appendChild(th_col);
    tfoot.appendChild(table_row);

    // create and assemble the table element
    var table = document.createElement('table');
    table.appendChild(header_row);
    table.appendChild(tbody);
    table.appendChild(tfoot);

    // output the table and store name within a div per store
    var store_div = document.createElement('div');
    store_div.setAttribute('class', 'individual_store');
    store_div.appendChild(store_header);
    store_div.appendChild(table);
    output_div.appendChild(store_div);
  }
}

function display_hourly_totals(hourly_totals, output_div) {
  // build h2 for totals heading
  var store_header = document.createElement('h3');
  store_header.appendChild(document.createTextNode('Totals by Hour'));

  //start building table with header row
  var table_row = document.createElement('tr');
  var headers = ['Hour', 'Total Pizzas Made', 'Deliveries Made'];
  for (var j = 0; j < headers.length; j++) {
    var th_col = document.createElement('th');
    th_col.appendChild(document.createTextNode(headers[j]));
    table_row.appendChild(th_col);
  }

  // build and assemble the table header
  var header_row = document.createElement('thead');
  header_row.appendChild(table_row);

  // now build tbody
  var tbody = document.createElement('tbody');
  var pizza_totals = 0;
  var delivery_totals = 0;
  for (var key in hourly_totals) {
    console.log(key + ': ' + hourly_totals[key]);
    var table_row = document.createElement('tr');
    pizza_totals += hourly_totals[key][0];
    delivery_totals += hourly_totals[key][1];
    var cells = [key,
                 hourly_totals[key][0],
                 hourly_totals[key][1]];
    for (var k = 0; k < cells.length; k++) {
      var th_col = document.createElement('td');
      th_col.appendChild(document.createTextNode(cells[k]));
      table_row.appendChild(th_col);
    }
    tbody.appendChild(table_row);
  }

  // and lastly build the table footer
  var tfoot = document.createElement('tfoot');
  var table_row = document.createElement('tr');
  var th_col = document.createElement('td');
  th_col.appendChild(document.createTextNode('Totals'));
  table_row.appendChild(th_col);
  th_col = document.createElement('td');
  th_col.appendChild(document.createTextNode(pizza_totals));
  table_row.appendChild(th_col);
  th_col = document.createElement('td');
  th_col.appendChild(document.createTextNode(delivery_totals));
  table_row.appendChild(th_col);
  tfoot.appendChild(table_row);

  // create and assemble the table element
  var table = document.createElement('table');
  table.appendChild(header_row);
  table.appendChild(tbody);
  table.appendChild(tfoot);

  // output the table and store name within a div per store
  var store_div = document.createElement('div');
  store_div.setAttribute('class', 'totals');
  store_div.appendChild(store_header);
  store_div.appendChild(table);
  output_div.appendChild(store_div);
}
