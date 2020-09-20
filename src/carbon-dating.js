const CustomError = require("../extensions/custom-error");

const MODERN_ACTIVITY = 15;
const HALF_LIFE_PERIOD = 5730;

module.exports = function dateSample(sampleActivity) {
  // check inadequate values
  if (sampleActivity > MODERN_ACTIVITY || sampleActivity < 1) {
    return false;
  // check correct type 
  } else if (typeof (sampleActivity) !== 'string') {
    return false;
  // check if can be parsed to float
  } else if (isNaN(parseFloat(sampleActivity))) {
    return false;
  } else {
    // convert string number to float
    sampleActivity = parseFloat(sampleActivity);
    // use formula from example at https://chem.libretexts.org/Bookshelves/Physical_and_Theoretical_Chemistry_Textbook_Maps/Supplemental_Modules_(Physical_and_Theoretical_Chemistry)/Nuclear_Chemistry/Nuclear_Kinetics/Half-Lives_and_Radioactive_Decay_Kinetics#section_2
    let k = 0.693 / HALF_LIFE_PERIOD;
    // round up the result
    let t = Math.ceil(Math.log(MODERN_ACTIVITY / sampleActivity) / k);
    return t;
  }
};
