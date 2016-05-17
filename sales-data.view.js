// Build tables
function display_tables(store_array, output_div) {
  for (var i = 0; i < store_array.length; i++) {
    var current_store = store_array[i];

    // build h2 with store name
    var store_header = document.createElement('h2');
    store_header.appendChild(document.createTextNode(current_store.name));
    output_div.appendChild(store_header);

    //start table with header row
    var table = document.createElement('table');
    var header_row = document.createElement('thead');
    var table_row = document.createElement('tr');
    var headers = ['Hour', 'Total Pizzas Made', 'Deliveries Made', 'Recommended Drivers'];
    for (var j = 0; j < headers.length; j++) {
      var th_col = document.createElement('th');
      th_col.appendChild(document.createTextNode(headers[j]));
      table_row.appendChild(th_col);
    }
    header_row.appendChild(table_row);
    table.appendChild(header_row);

    // now build tbody
    var tbody = document.createElement('tbody');
    for (var j = 0; j < current_store.estimates.length; j++) {
      var table_row = document.createElement('tr');
      var cells = [current_store.estimates[j].time,
                   current_store.estimates[j].pizzas,
                   current_store.estimates[j].deliveries,
                   current_store.estimates[j].drivers];
      for (var k = 0; k < cells.length; k++) {
        var th_col = document.createElement('th');
        th_col.appendChild(document.createTextNode(cells[k]));
        table_row.appendChild(th_col);
      }
      tbody.appendChild(table_row);
    }

    // done with tbody; that completes this table
    table.appendChild(tbody);

    // output the table as a sibling to the h2
    output_div.appendChild(table);
  }
}
