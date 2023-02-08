const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const connectToDb = async (dbName) => {
  console.log("process.env.mongoUserName",process.env.mongoUserName)
  const connection = await mongoose.connect(
    `mongodb+srv://${process.env.mongoUserName}:${process.env.mongoPass}@swindia1.17wlqvp.mongodb.net/${dbName}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

  return connection;
};

module.exports = connectToDb;
