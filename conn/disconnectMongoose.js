const mongoose = require('mongoose');

module.exports = () => {
  return new Promise((resolve, reject) => {
    if (mongoose.connection.readyState === 1) {
      mongoose.disconnect((err) => {
        if (err) {
          return reject(new error_1.MongoServerClosedError(err));
        }
        console.log("DISCONNECT")
        resolve("DISCONNECT");
      });
    } else if (mongoose.connection.readyState === 3) {
      // If the state is "disconnecting," log a message to the console and reject the promis
      console.log('Already disconnecting from MongoDB!');
      return reject(new Error('Already disconnecting from MongoDB!'));
    } else {
      // If the state is anything other than "connected" or "disconnecting," reject the promise
      return reject(new Error('MongoDB connection not established.'));
    }
  });
};