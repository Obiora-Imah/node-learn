const { parse } = require('csv-parse');
const fs = require('fs');
const readStream = []
const habitablePlanets = (data) => {
  return data.koi_disposition === 'CONFIRMED' &&
  data.koi_insol > 0.36 && data.koi_insol < 1.11 &&
  data.koi_prad < 1.6;
};
fs.createReadStream('./kepler_data.csv')
.pipe(parse({
  comment: '#',
  delimiter: ',',
  columns: true
}))
.on('data', (chunk) => {
  // console.log(chunk);
  if (habitablePlanets(chunk)) {
    readStream.push(chunk);
  }
  // readStream.push(chunk);
})
.on('error', (err) => {
  console.error(err);
})
.on('end', () => {
  console.log('Total habitable planet is ', readStream.map((planet) => planet.kepler_name));
  
  console.log('Total habitable planet is ', readStream.length);
});