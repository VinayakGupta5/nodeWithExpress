const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const connectToDb = async (dbName) => {
  const connection = await mongoose.connect(
    dbName,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("mongoose connect success")
  return connection;
};

module.exports = connectToDb;
