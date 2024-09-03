
const mongoose = require('mongoose');
const MONGO_URL = 'mongodb+srv://obioraimah:MxG9fOn87gYDI9O6@node-learn-mongo.erni7.mongodb.net/nasa?retryWrites=true&w=majority&appName=node-learn-mongo'

// await mongoose.connect(MONGO_URL);
mongoose.connection.once('open', () => {
  console.log('Mongoose connected!');
});

mongoose.connection.on('error', (err) => {
  console.error(err);
});

async function dbConnection() {
  await mongoose.connect(MONGO_URL);
}
async function dbDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  dbConnection,
  dbDisconnect
};