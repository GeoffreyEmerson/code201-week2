var output_div = document.getElementById('stores_div');

// Build tables
function display_tables(store_array) {
  output_div.innerHTML = '';
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
      // Iterate over each hour and make that data into a table row
      var table_row = document.createElement('tr');
      var cells = [current_store.estimates[j].time,
                   current_store.estimates[j].pizzas + ' (' + current_store.daily_projections[Math.floor(j / 3)][0] + ',' + current_store.daily_projections[Math.floor(j / 3)][1] + ')',
                   current_store.estimates[j].deliveries + ' (' + current_store.daily_projections[Math.floor(j / 3)][2] + ',' + current_store.daily_projections[Math.floor(j / 3)][3] + ')',
                   current_store.estimates[j].drivers];
      for (var k = 0; k < cells.length; k++) {
        var th_col = document.createElement('td');
        th_col.appendChild(document.createTextNode(cells[k]));
        if (k == 0) {
          th_col.setAttribute('class', 'no-wrap');
        }
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

function display_hourly_totals(hourly_totals) {
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

function render_add_store_form() {
  // create heading
  var add_store_heading = document.createElement('h3');
  add_store_heading.appendChild(document.createTextNode('Add New Location'));

  // create form
  var add_store_form = document.createElement('form');
  var add_store_fieldset = document.createElement('fieldset');
  var paragraph = document.createElement('p');
  var label = document.createElement('label');
  label.setAttribute('for', 'store_name_field');
  label.appendChild(document.createTextNode('Store name: '));
  var input = document.createElement('input');
  input.setAttribute('name', 'store_name_field');
  input.setAttribute('id', 'store_name_field');
  input.setAttribute('autocomplete', 'off');
  input.setAttribute('placeholder', 'Location or Name');
  input.setAttribute('required', 'required');
  paragraph.appendChild(label);
  paragraph.appendChild(input);
  add_store_fieldset.appendChild(paragraph);

  // create labels and data fields
  paragraph = document.createElement('p');
  label = document.createElement('label');
  label.setAttribute('for', 'opening_time_field');
  label.appendChild(document.createTextNode('Opening time: '));

  // create the spinner for opening hour, which can be from midnight to 11pm
  select = document.createElement('select');
  select.setAttribute('name', 'opening_time_field');
  select.setAttribute('id', 'opening_time_field');
  var option;
  for (var hour = 0; hour < 24; hour ++) {
    var time = new Date();
    time.setHours(hour);
    option = document.createElement('option');
    option.setAttribute('value', hour);
    if (hour == 8) {
      option.setAttribute('selected', 'selected');
    }
    select.appendChild(option);
    option.appendChild(document.createTextNode(format_time(time)));
  }
  paragraph.appendChild(label);
  paragraph.appendChild(select);
  add_store_fieldset.appendChild(paragraph);

  paragraph = document.createElement('p');
  label = document.createElement('label');
  label.setAttribute('for', 'hours_open_field');
  label.appendChild(document.createTextNode('Hours open per day: '));
  select = document.createElement('select');
  select.setAttribute('name', 'hours_open_field');
  select.setAttribute('id', 'hours_open_field');
  var option;
  for (var hour = 1; hour <= 24; hour ++) {
    option = document.createElement('option');
    option.setAttribute('value', hour);
    if (hour == 18) {
      option.setAttribute('selected', 'selected');
    }
    select.appendChild(option);
    option.appendChild(document.createTextNode(hour));
  }
  paragraph.appendChild(label);
  paragraph.appendChild(select);
  add_store_fieldset.appendChild(paragraph);
  // select.addEventListener('change', render_projections_table);

  // create table for new store projected sales
  var projections_table = document.createElement('table');
  projections_table.setAttribute('id', 'projections_table');
  //thead
  var projections_thead = document.createElement('thead');
  //row
  var projections_tr = document.createElement('tr');
  //th's
  var projections_th;
  var headers = ['Shift', 'Pizza Min', 'Pizza Max', 'Delivery Min', 'Delivery Max'];
  for (var i = 0; i < headers.length; i++) {
    projections_th = document.createElement('th');
    projections_th.appendChild(document.createTextNode(headers[i]));
    projections_tr.appendChild(projections_th);
  }
  projections_thead.appendChild(projections_tr);
  projections_table.appendChild(projections_thead);

  //tbody
  var projections_tbody = document.createElement('tbody');
  var projections_td;
  var projections_input;
  for (var row = 0; row < projections[0].length; row++) {
    projections_tr = document.createElement('tr');
    projections_td = document.createElement('td');
    projections_td.appendChild(document.createTextNode('Shift ' + row));
    projections_tr.appendChild(projections_td);
    for (var col = 0; col < projections[0][row].length; col++) {
      projections_td = document.createElement('td');
      projections_input = document.createElement('input');
      projections_input.setAttribute('type', 'number');
      projections_input.setAttribute('name', 'input_' + row + '_' + col);
      projections_input.setAttribute('autocomplete', 'off');
      projections_input.setAttribute('min', '0');
      projections_input.setAttribute('max', '999');
      projections_input.setAttribute('value', projections[0][row][col]);
      projections_td.appendChild(projections_input);
      projections_tr.appendChild(projections_td);
    }
    projections_tbody.appendChild(projections_tr);
  }
  projections_table.appendChild(projections_tbody);
  add_store_fieldset.appendChild(projections_table);

  // create the button
  paragraph = document.createElement('p');
  var button = document.createElement('button');
  button.appendChild(document.createTextNode('Create Store'));
  paragraph.appendChild(button);
  add_store_fieldset.appendChild(paragraph);

  // complete the form
  add_store_form.appendChild(add_store_fieldset);
  add_store_form.addEventListener('submit', add_store);

  // append form to div
  var add_store_div = document.createElement('div');
  add_store_div.setAttribute('class', 'add_store_div');
  add_store_div.appendChild(add_store_heading);
  add_store_div.appendChild(add_store_form);
  // append div to output_div
  output_div.appendChild(add_store_div);

  // document.getElementById('create_store_button')
}
