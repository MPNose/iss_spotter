const needle = require('needle');

const fetchMyIP = function(callback) {
  needle.get('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
       return callback(error, null);
    } 
    if (response.statusCode !== 200) {
      callback(Error(`Status code ${response.statusCode} when fetching IP: ${body}`), null)
    }
    const ip = body.ip;
    callback(null, ip)
  });
};










module.exports = {fetchMyIP};