const {nextISSTimesForMyLocation} = require('./iss_promised');
const {printPassTimes} = require('./index');
// fetchMyIP()
//   .then((ip) => fetchCoordsByIP(ip))
//   .then((coords) => fetchISSFlyoverTimes(coords))
//   .then((times) => nextISSTimesForMyLocation(fetchMyIP));
  
nextISSTimesForMyLocation()
  .then((times) => {
    printPassTimes(times);
  })
  .catch((error) => {
    console.log("it didn't work: ", error.message);
  });