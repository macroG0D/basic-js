const CustomError = require("../extensions/custom-error");

module.exports = function transform(arr) {
  let resultArr = [];

  // if not array throw error
  if (!Array.isArray(arr)) {
    throw 'Not array!';
  }

  // execute the commands and push items into new array
  for (let i = 0; i < arr.length; i++) {
    // if "--discard-next" command used, just increment the index and continue iterating through the array
    if (arr[i] == '--discard-next') {
      i++;
    } // if used command --discard-prev but previously used "--discard-next", prevent from pop wrong item
    else if (arr[i] == '--discard-prev') {
      // if command "--discard-next" not used previously, then pop
      if (arr[i - 2] != '--discard-next') {
        resultArr.pop();
      }
    } else if (arr[i] == '--double-next') {
      // check if "next" exists in the array
      if (i < arr.length - 1) {
        resultArr.push(arr[i + 1]);
      }
    } else if (arr[i] == '--double-prev') {
      // check if "prev" exists in the array, and
      // check if "--discard-next" command previously used, and if so — prevent push wrong item
      if (resultArr.length > 0 && arr[i - 2] != '--discard-next') {
        resultArr.push(resultArr[resultArr.length - 1]);
      }
    } else {
      resultArr.push(arr[i]);
    }
  }

  return resultArr;
};


