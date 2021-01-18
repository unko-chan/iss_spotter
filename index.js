const { nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log('it worked! Returned IP:', ip);
// });

// fetchCoordsByIP(ip, (error, coords) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log('It worked! Returned coordinates:', coords);
// });

// fetchISSFlyOverTimes ({ latitude: 49.2246, longitude: -123.0711 },(error, timings) => {
//     if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log(timings)
// })

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log('it didnt work!', error);
  }
  for (const index of passTimes) {
    const unixRiseTime = index.risetime;
    const msConvert = unixRiseTime * 1000;
    const date = new Date(msConvert);
    const formatDate = date.toLocaleString('en-US', { timeZoneName: 'short' });
    console.log(`Next pass at ${formatDate} for ${index.duration} seconds!`);
  }
});
