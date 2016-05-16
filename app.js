var store_names = ['Hillsboro', 'Pearl', 'DowntownPDX', 'Buckman', 'PDXairport', 'Clackamas'];
var stores = [];

// Store constructor
var Store = function(name_input) {
  this.name = name_input;
};

// Initialize store object array
for (var i = 0; i < store_names.length; i++) {
  stores.push(new Store(store_names[i]));
}
