const launches = new Map();
let latestFlightNumber = 100;
let launch = {
  mission: 'Kepler Exploration X',
  rocket: 'Explorer IS1',
  launchDate: new Date('December 27, 2030'),
  target: "Kepler-442 b",
  flightNumber: 100,
  customers: ['ZTM', 'NASA'],
  upcoming: false,
  success: true,
}
launches.set(launch.flightNumber, launch);
function addNewLaunch(newLaunch) {
  console.log(
    'newLaunch', newLaunch
  );
  
  latestFlightNumber++;
  Object.assign(
    newLaunch, {
      customers: ['ZTM', 'NASA'],
      upcoming: true,
      success: false,
      flightNumber: latestFlightNumber
    })
  launches.set(
    latestFlightNumber,
    newLaunch
  );
  return newLaunch;
}

const getLaunches = () => {
  return Array.from(launches.values());
}
const getSingleLaunches = (key) => {
  return Array.from(launches.get(key).values());
}
const abortLaunch = (key) => {
  const aborted =  launches.get(key);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}

const elementExists = (key) => {
  return launches.has(key);
}

module.exports = {
  launches,
  getLaunches,
  addNewLaunch,
  getSingleLaunches,
  abortLaunch,
  elementExists
};