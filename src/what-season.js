const CustomError = require("../extensions/custom-error");

module.exports = function getSeason(date) {

  const seasons = {
    'winter': [11, 0, 1],
    'spring': [2, 3, 4],
    'summer': [5, 6, 7],
    'autumn|fall': [8, 9, 10]
  };

  let currentSeason = '';

  if (date == undefined) {
    return 'Unable to determine the time of year!';
  }

  // check with typeof (date.getMonth) == 'function' — fails on the "very tricky" test
  // check if argument is 100% a Date object 
  if (Object.prototype.toString.call(date) === '[object Date]') {
    for (let season in seasons) {
      for (let month of seasons[season]) {
        if (date.getMonth() == month) {
          currentSeason = season;
          return currentSeason;
        }
      }
    }
  } else {
    throw 'ERROR';
  }

};
