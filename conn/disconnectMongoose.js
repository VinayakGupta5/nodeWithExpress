const mongoose = require('mongoose');

module.exports = () => {
  return new Promise((resolve, reject) => {
    mongoose.disconnect((err) => {
      if (err) return reject(err);
      console.log('MongoDB connection closed.');
      resolve();
    });
  });
};