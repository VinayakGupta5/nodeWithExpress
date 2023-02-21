const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const connectToDb = (dbName) => {
  return new Promise(async (resolve, reject) => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(
        dbName,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      )
        .then(connection => {
          console.log('Connected to MongoDB!')
          resolve(connection)
        })
    }
    else if (mongoose.connection.readyState === 1) {
      // If the state is "connected," log a message to the console
      console.log('Already connected to MongoDB!');
      resolve()
    } else if (mongoose.connection.readyState === 2) {
      // If the state is "connecting," log a message to the console
      console.log('Connecting to MongoDB...');
      return
    } else if (mongoose.connection.readyState === 3) {
      // If the state is "disconnecting," log a message to the console
      console.log('Disconnecting from MongoDB...');

    }
  }
  )
};

module.exports = connectToDb;
