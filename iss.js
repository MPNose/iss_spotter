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

const fetchISSFlyoverTimes = function(coords, callback) {
  needle.get(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status code ${response.statusCode} when fetching Times: ${body}`), null)
      return;
    }
    
    const data = body.response;
    callback(null, data);
  });
};

const nextISSTimesForMyLocation = function(callback) {
 fetchMyIP((error, ip) => {
   if (error) {
    return callback(error, null);
   }
   fetchCoordsByIP(ip, (error, coordinates) => {
    if (error) {
      return callback(error, null);
    }
    fetchISSFlyoverTimes(coordinates, (error, data) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, data);
    });
   });
 });
};


// { latitude: 48.4284207, longitude: -123.3656444 }
//IP:  24.69.150.78
// { risetime: 1729906927, duration: 666 },
//   { risetime: 1729943327, duration: 114 },
//   { risetime: 1729979727, duration: 222 },
//   { risetime: 1730016127, duration: 629 },
//   { risetime: 1730052527, duration: 638 }




module.exports = {nextISSTimesForMyLocation};