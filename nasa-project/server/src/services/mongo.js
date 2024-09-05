
const mongoose = require('mongoose');
require('dotenv').config();
const MONGO_URL = process.env.MONGO_URL;
console.log("MONGO_URL", process.env.MONGO_URL);

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