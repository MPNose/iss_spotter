const needle = require('needle');

const fetchMyIP = function(callback) {
  needle.get('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
       return callback(error, null);
    } 
    if (response.statusCode !== 200) {
      callback(Error(`Status code ${response.statusCode} when fetching IP: ${body}`), null)
      return;
    }
    const ip = body.ip;
    callback(null, ip)
  });
};

const fetchCoordsByIP = function(ip, callback) {
  needle.get(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (!body.success) {
      const message = `Success status was ${body.success}. Server message says: ${body.message} when fetching for IP ${body.ip}`;
      callback(Error(message), null);
      return;
    } 

    const latitude = body.latitude;
    const longitude = body.longitude;
    callback(null, {latitude, longitude});
  });
};
// { latitude: 48.4284207, longitude: -123.3656444 }
//IP:  24.69.150.78









module.exports = {fetchMyIP, fetchCoordsByIP};