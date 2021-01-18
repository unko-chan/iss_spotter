const request = require('request');

const fetchMyIP = function (callback) {
  const ip = 'https://api.ipify.org?format=json';

  request(ip, function (error, response, body) {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const data = JSON.parse(body).ip;
    return callback(null, data);
  });
};

const fetchCoordsByIP = function (ip, callback) {
  const geoAPI = `https://freegeoip.app/json/${ip}`;
  request(geoAPI, function (error, response, body) {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching geo location. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const { latitude, longitude } = JSON.parse(body);
    const coords = { latitude, longitude };
    return callback(null, coords);
  });
};

const fetchISSFlyOverTimes = function (coords, callback) {
  const issPass = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(issPass, function (error, response, body) {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS timings. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const timings = JSON.parse(body).response;
    return callback(null, timings);
  });
};

const nextISSTimesForMyLocation = function (callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(coords, (error, timings) => {
        if (error) {
          return callback(error, null);
        }
        callback(error, timings);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };
