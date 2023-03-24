const mongoose = require('mongoose')
const mongooseDisconnect = require('./disconnectMongoose')

mongoose.set('strictQuery', false)

const mongooseConnect = async (dbName, resolve, reject) => {
  await mongoose.connect(
    dbName,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
    .then(connection => {
      console.log('Connected to MongoDB! ', mongoose.connection.name)
      resolve(connection)
    })
}

const connectToDb = (dbName) => {
  return new Promise(async (resolve, reject) => {
    console.log("dbName", dbName)
    var dbNameComing = dbName.split('/')[3]?.split('?')[0]
    console.log("dbNameComing", dbNameComing)

    console.log("mongoose state: ", mongoose.connection.readyState)
    var dbNameConnected = mongoose.connection.name
    console.log("dbNameConnected ", dbNameConnected)

    if (mongoose.connection.readyState === 0) {
      mongooseConnect(dbName, resolve, reject)
    }
    else if (mongoose.connection.readyState === 1) {
      if (dbNameComing === dbNameConnected) {
        console.log('Already connected to same MongoDB!')
        resolve()
      }
      else {
        async function mongooseDiscon() {
          try {
            await mongooseDisconnect();
          } catch (err) {
            console.error('Error disconnecting from MongoDB:', err);
            return;
          }
          mongooseConnect(dbName, resolve, reject)
        }
        mongooseDiscon();

      }


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
