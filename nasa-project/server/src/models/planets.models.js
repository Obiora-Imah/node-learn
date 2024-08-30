
const { parse } = require('csv-parse');
const path = require('path');
const planets = []
const fs = require('fs');

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
    .on('data', (chunk) => {
      if (habitablePlanets(chunk)) {
        planets.push(chunk);
      }
    })
    .on('error', (err) => {
      console.error(err);
      reject(err);
    })
    .on('end', () => {
      console.log('Total habitable planet is ', planets.map((planet) => planet.kepler_name));
      
      console.log('Total habitable planet is ', planets.length);
      resolve();
    });
  });
}

function getAllPlanets() {
  return planets;
}

module.exports = {
  loadPlanetsData,
  getAllPlanets
}