const http = require('http');
const cluster = require('cluster');
const os = require('os');
const app = require('./app');
const {dbConnection} = require('./services/mongo');
const {loadPlanetsData} = require('./models/planets.models');
const server = http.createServer(app);
const PORT = process.env.PORT || 8000;

const startServer = async () => {
  await dbConnection();
  await loadPlanetsData();
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
startServer();