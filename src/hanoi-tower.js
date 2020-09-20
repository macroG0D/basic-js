const CustomError = require("../extensions/custom-error");

module.exports = function calculateHanoi(disksNumber, turnsSpeed) {
  // object for the final result
  let result = {
    'turns': 0,
    'seconds': 0
  };

  // minimum turns formula
  const minTurns = Math.pow(2, disksNumber) - 1;
  result.turns = minTurns;

  // calculate the minimum needed seconds and round down
  const secsInHour = 3600;
  let minTime = Math.floor(secsInHour / turnsSpeed * minTurns);
  result.seconds = minTime;

  return result;

};
