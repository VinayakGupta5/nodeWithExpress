const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const connectToDb = (dbName) => {
  return new Promise(async (resolve, reject) => {
    console.log("dbName", dbName.split('/')[3].split('?')[0])

    console.log("mongoose state: ", mongoose.connection.readyState )
    console.log("mongoose name: ", mongoose.connection.name )

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



// async function mongooseDiscon() {
//   try {
//     await mongooseDisconnect();
//   } catch (err) {
//     console.error('Error disconnecting from MongoDB:', err);
//     return;
//   }

//   // console.log("now run")

// }
// mongooseDiscon();
