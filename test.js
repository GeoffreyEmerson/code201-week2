var numTests = 0;
var numCorrect = 0;

var locations = ['Hillsboro', 'Pearl', 'DowntownPDX', 'Buckman', 'PDXairport', 'Clackamas'];

// Test object array creation
if (typeof store != 'undefined') {
  if (typeof store === 'object') {
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
  if (typeof store[i] != 'undefined') {
    if (store[i].name === locations[i]) {
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

// if (typeof sum != 'undefined') {
//   var y = sum(-10, 10);
//   if (0 === y) {
//     console.log('PASS!');
//     numCorrect++;
//   }
//   else {
//     console.log('fail. Wrong answer');
//   }
// }
// else {
//   console.log('fail. No such function');
// }
//
// numTests++;
// console.log('You got ' + numCorrect + ' out of ' + numTests);
