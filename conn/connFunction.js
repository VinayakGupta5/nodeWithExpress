const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const connectToDb = async (dbName) => {
  console.log("databaseName", dbName);
  const connection = await mongoose.connect(
    dbName,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  return connection;
};

module.exports = connectToDb;
