const CustomError = require("../extensions/custom-error");


module.exports = class DepthCalculator {
  calculateDepth(arr) {
    this.arrDepth = 1; // depth of the flat array
    if (arr.some(elem => Array.isArray(elem))) { // 1. if any element of the array is array then "flat the array" by one level
      this.calculateDepth(arr.reduce( // 2. call the function again with the new array
        (result, element) => result.concat(element), []
      ));
      this.arrDepth++; // 3 increment depth counter
    }
    return this.arrDepth;
  }
};