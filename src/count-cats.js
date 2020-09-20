const CustomError = require("../extensions/custom-error");

module.exports = function countCats(arr) {
  let earsCount = 0;  
  for (let key of arr) {
    for (let item in key) {
      // console.log(key[item]);
      if (key[item] === '^^') {
        earsCount++;
      }
    }
  }
  return earsCount;
};

