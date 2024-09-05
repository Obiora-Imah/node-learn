const http = require('http');
require('dotenv').config()
const cluster = require('cluster');
const os = require('os');
const app = require('./app');
const {dbConnection} = require('./services/mongo');
const {loadPlanetsData} = require('./models/planets.models');
const {loadLaunchesData} = require('./models/launches.model');
const server = http.createServer(app);
const PORT = process.env.PORT;

const startServer = async () => {
  await dbConnection();
  await loadPlanetsData();
  await loadLaunchesData();
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
startServer();