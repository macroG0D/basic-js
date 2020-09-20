const CustomError = require("../extensions/custom-error");

module.exports = function createDreamTeam(members) {
  let firstLetterArr = [];

  // if not array — return false 
  if (!Array.isArray(members)) {
    return false;
  }

  // iterate throught members 
  for (let i = 0; i < members.length; i++) {
    // check if correct type
    if (typeof(members[i]) == 'string') {
      // iterate throught the symbols of the string and push the first found letter
      for (let k = 0; k < members[i].length; k++) {
        // check if char is letter with regexp
        if (members[i][k].match(/[a-z]/i)) {
          firstLetterArr.push(members[i][k].toUpperCase());
          // if first letter found, exit from the loop
          break;
        }
      }
    }
  }

  // return sorted array's string
  return firstLetterArr.sort().join('');
};
