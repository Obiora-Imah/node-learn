
const { parse } = require('csv-parse');
const path = require('path');
const fs = require('fs');
const planetSchema = require('./planets.mongo');
const planets = []

const habitablePlanets = (data) => {
  return data.koi_disposition === 'CONFIRMED' &&
  data.koi_insol > 0.36 && data.koi_insol < 1.11 &&
  data.koi_prad < 1.6;
};

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, '..',  '..', 'data', 'kepler_data.csv'))
    .pipe(parse({
      comment: '#',
      delimiter: ',',
      columns: true
    }))
    .on('data', async (chunk) => {
      if (habitablePlanets(chunk)) {
        // planets.push(chunk);
        await savePlanet(chunk);
      }
    })
    .on('error', (err) => {
      console.error(err);
      reject(err);
    })
    .on('end', async () => {
      const planets = (await getAllPlanets()).length;
      console.log('Total habitable planet is ', planets);
      resolve();
    });
  });
}

async function savePlanet(planet) {
  try {
    await planetSchema.updateOne({
      keplerName: planet.kepler_name
    }, {
      keplerName: planet.kepler_name
    }, {
      upsert: true
    });
  } catch (err) {
    console.error(`Could not save planet ${err}`);
  }
}

async function getAllPlanets() {
  return planetSchema.find({}, {__v: 0, _id: 0});
}

module.exports = {
  loadPlanetsData,
  getAllPlanets
}