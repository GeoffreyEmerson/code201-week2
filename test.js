var numTests = 0;
var numCorrect = 0;

var locations = ['Hillsboro', 'Pearl', 'DowntownPDX', 'Buckman', 'PDXairport', 'Clackamas'];

// Test object array creation
if (typeof stores != 'undefined') {
  if (typeof stores === 'object') {
    console.log('Pizza store variable creation test: Pass!');
    numCorrect++;
  } else {
    console.log('Pizza store variable creation test: --- FAIL ---');
  }
} else {
  console.log('Fail. Undefined.');
}

numTests++;
console.log('You got ' + numCorrect + ' out of ' + numTests);

// Test names of each store
for (var i = 0; i < locations.length; i++) {
  if (typeof stores[i] != 'undefined') {
    if (stores[i].name === locations[i]) {
      console.log(locations[i] + ': Pass!');
      numCorrect++;
    } else {
      console.log(locations[i] + ': --- FAIL ---');
    }
  } else {
    console.log(locations[i] + ': --- FAIL ---');
  }
  numTests++;
}

console.log('You got ' + numCorrect + ' out of ' + numTests);
