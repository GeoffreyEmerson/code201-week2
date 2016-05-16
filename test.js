var numTests = 0;
var numCorrect = 0;

var locations = ['Hillsboro', 'Pearl', 'DowntownPDX', 'Buckman', 'PDXairport', 'Clackamas'];

console.log('Pizza store variable creation test:');
if (typeof store != 'undefined') {
  for(var i = 0; i < locations.length; i++) {
    if (store[i].name === locations[i]) {
      console.log(locations[i] + ': Pass!');
      numCorrect++;
    } else {
      console.log(locations[i] + ': --- FAIL ---');
    }
    numTests++;
  }
} else {
  console.log('Fail. Undefined.');
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
