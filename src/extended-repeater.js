const CustomError = require("../extensions/custom-error");

module.exports = function repeater(str, options) {
  let result;
  // use String() instead of .toString() to get turn argument to string even if it is null 
  let temp = String(str);

  // default values
  let separator = "+";
  let repeat = 1;

  // if options object passed as argument
  if (options) {
    // default addition properties
    let addition;
    let additionRepeat = 1;
    let additionSep = '|';
    // define objects key values to variables, if no key in the object then set default
    options.repeatTimes ? repeat = options.repeatTimes.toString() : repeat = 1;
    options.separator ? separator = options.separator.toString() : separator = '+';
    // console.log(options.addition);
    // console.log(typeof(options.addition));
    options.addition!==undefined ? addition = String(options.addition) : addition = undefined;
    // console.log(typeof(addition));
    options.additionRepeatTimes ? additionRepeat = options.additionRepeatTimes : additionRepeat = 1;
    options.additionSeparator ? additionSep = options.additionSeparator.toString() : additionSep = '|';

    // if addition has reoeats
    if (addition && additionRepeat > 1) {
      addition = addition.split();
      for (let i = 1; i < additionRepeat; i++) {
        addition.push(String(options.addition));
      }
      addition = addition.join(additionSep);
    }

    // concatinate main string and addition string
    if (addition) {
      temp = str + addition;
    }

  }

  if (repeat > 1) {
    result = temp.split();
    for (let i = 1; i < repeat; i++) {
      result.push(temp);
    }
    result = result.join(separator);
  } else {
    result = temp;
  }

  return result;
};
  