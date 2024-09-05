const express = require('express');
const apiV1Router = express.Router();

const planetsRouter = require('./planets/planets.router');
const launchesRouter = require('./launches/launches.router');

apiV1Router.use('/planets', planetsRouter);
apiV1Router.use('/launches', launchesRouter);

module.exports = apiV1Router;