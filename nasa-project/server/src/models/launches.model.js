const launchesSchema = require('./launches.mongo');
const planetsSchema = require('./planets.mongo');
let launch = {
  launchDate: new Date('December 27, 2030'),
  target: "Kepler-442 b",
  mission: 'Kepler Exploration X',
  rocket: 'Explorer IS1',
  flightNumber: 100,
  customers: ['ZTM', 'NASA'],
  upcoming: false,
  success: true,
}

const elementExists = async  (key) => {
  return await launchesSchema.exists({ flightNumber: key});
}
const planetExists = async (planetName) => {
  return await  planetsSchema.exists({ keplerName: planetName});
}
saveLaunch(launch);
async function addNewLaunch(newLaunch) {
  const currentFlightNumber = (await launchesSchema.findOne().sort("-flightNumber"))?.flightNumber + 1;
  
  Object.assign(
    newLaunch, {
      customers: ['ZTM', 'NASA'],
      upcoming: true,
      success: false,
      flightNumber: currentFlightNumber
    })
  await saveLaunch(newLaunch);
  return newLaunch;
}

const getLaunches = async () => {
  return await launchesSchema.find({}, {__v: 0, _id: 0});
}
const getSingleLaunches = async (key) => {
  return await launchesSchema.findOne({ flightNumber: key}, {__v: 0, _id: 0});
}
const abortLaunch = async (key) => {
  const aborted =  await launchesSchema.findOneAndUpdate({ flightNumber: key}, {
    upcoming: false,
    success: false
  });
  return aborted;
}

async function saveLaunch(launchData) {
  try {
    if (!(await planetExists(launchData.target))) {
      throw new Error('Planet does not exist');
    }
    await launchesSchema.findOneAndUpdate({
      flightNumber: launchData.flightNumber
    }, {
      ...launchData
    }, {
      upsert: true
    });
  } catch (err) {
    console.error(`Could not save planet ${err}`);
  }
}

module.exports = {
  getLaunches,
  addNewLaunch,
  getSingleLaunches,
  abortLaunch,
  elementExists
};