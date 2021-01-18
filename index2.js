const { nextISSTimesForMyLocation } = require('./iss_promised');
const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    let datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime.toLocaleDateString()} for ${duration} seconds!`);
  }
};
nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });