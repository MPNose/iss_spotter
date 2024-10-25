const needle = require('needle');


const fetchMyIP = function() {
  return needle('get','https://api.ipify.org?format=json')
  .then((response) => {
    const body = response.body; 
    const ip = body.ip; 
    return ip;
  });
};

const fetchCoordsByIP = function(ip) {
  return needle('get',`http://ipwho.is/${ip}`)
  .then((response) => {
    const body = response.body; 
    const latitude = body.latitude; 
    const longitude = body.longitude; 
    return {latitude, longitude};
  });
};

const fetchISSFlyoverTimes = function(coords) {
  return needle('get',`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`)
  .then((response) => {
    const body = response.body;
    const times = body.response;
    return times;
  })
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then((ip) => fetchCoordsByIP(ip))
    .then((coords) => fetchISSFlyoverTimes(coords))
    .then((times) => {
      return times;
    });
  
};



module.exports = {nextISSTimesForMyLocation};