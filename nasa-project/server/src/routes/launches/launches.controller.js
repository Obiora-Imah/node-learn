const { getLaunches, addNewLaunch, abortLaunch, elementExists, loadLaunchesData } = require("../../models/launches.model");
// spacex apix https://api.spacexdata.com/v4/launches
async function httpAbortLaunch(req, res) {
  const launchId = +req.params.id;
  if(!elementExists(launchId)) {
    return res.status(404).json({
      error: 'Launch not found'
    });
  }
  return res.status(200).json(await abortLaunch(launchId));
}
async function getAllLaunches(req, res) {
  console.log("params", req.params);
  
  return res.status(200).json(await getLaunches(req.query.limit, req.query.page));
}
async function httpAddNewLaunch(req, res) {
  if (!req.body.mission || !req.body.rocket || !req.body.target || !req.body.launchDate) {
    return res.status(400).json({
      error: 'Missing required launch property'
    });
  }
  const launchDate = new Date(req.body.launchDate);

  if (launchDate.toString() === 'Invalid Date') {
    return res.status(400).json({
      error: 'Launch date must be in the future'
    });
  }
  
  const launch = await addNewLaunch({...req.body, launchDate});
  res.status(201).json(launch);
}

module.exports = {
  getAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch
};