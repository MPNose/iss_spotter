const {fetchMyIP, fetchCoordsByIP, fetchISSFlyoverTimes} = require('./iss');





// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log("It worked! Returned IP: ", ip);
// })


// fetchCoordsByIP('24.69.150.78', (error, coordinates) => {
//   if (error) {
//     console.log("it didin't work", error);
//     return;
//   }
//   console.log('it worked, returned data: ', coordinates);
// });

// fetchISSFlyoverTimes({ latitude: 48.4284207, longitude: -123.3656444 }, (error, data) => {
//   if (error) {
//     console.log("it didn't work!", error);
//     return;
//   }
//   console.log("It worked! Returned flyover times: ", data);
// });

