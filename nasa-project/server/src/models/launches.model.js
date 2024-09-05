const launchesSchema = require('./launches.mongo');
const planetsSchema = require('./planets.mongo');
const axios = require('axios');
const SPACEX_HOST = 'https://api.spacexdata.com/v4'


const elementExists = async  (key) => {
  return await launchesSchema.exists({ flightNumber: key});
}
const planetExists = async (planetName) => {
  return await  planetsSchema.exists({ keplerName: planetName});
}
async function loadLaunchesData() {
  const launchExist =  await findLaunch({
    flightNumber: 1,
    rocket: 'Falcon 1',
    mission: 'FalconSat',
  })
  if(launchExist) {
    console.log('launch data already loaded');
    
    return;
  }
  const response = await getSpacexLaunches();
  response.data.docs.map(launch => {
    const mapLaunch = {
      flightNumber: launch.flight_number,
      launchDate: new Date(launch.date_local),
      mission: launch.name,
      rocket: launch.rocket.name,
      customers: launch.payloads.reduce((acc, curr) => [...acc, ...curr.customers], []),
      upcoming: launch.upcoming,
      success: launch.success,
    }
    saveLaunch(mapLaunch);
  })
}

async function getSpacexLaunches() {
  return await axios.post(`${SPACEX_HOST}/launches/query`, {
    query: {},
    options: {
      pagination: false,
      populate: [
        {
          path: 'rocket',
          select: {
            name: 1
          }
        },
        {
          path: 'payloads',
          select: {
            customers: 1
          }
        },
      ]}
  });
}
async function findLaunch(filter, options = {}) {
  return await launchesSchema.findOne(filter, options);
}
async function addNewLaunch(newLaunch) {

  if (!(await planetExists(newLaunch.target))) {
    throw new Error('Planet does not exist');
  }
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

const getLaunches = async (limit = 0, page=1) => {
  const passedLimit = Math.abs(limit);
  return await launchesSchema
  .find({}, {__v: 0, _id: 0})
  .skip(passedLimit * (Math.abs(page) - 1))
  .limit(passedLimit)
  .sort({flightNumber: 1});
}
const getSingleLaunches = async (key) => {
  return await findLaunch({ flightNumber: key}, {__v: 0, _id: 0});
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
  elementExists,
  loadLaunchesData
};