const { getLaunches, addNewLaunch, abortLaunch, elementExists } = require("../../models/launches.model");

function httpAbortLaunch(req, res) {
  const launchId = +req.params.id;
  if(!elementExists(launchId)) {
    return res.status(404).json({
      error: 'Launch not found'
    });
  }
  return res.status(200).json(abortLaunch(launchId));
}
function getAllLaunches(req, res) {
  return res.status(200).json(getLaunches());
}
function httpAddNewLaunch(req, res) {
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
  
  const launch = addNewLaunch({...req.body, launchDate});
  res.status(201).json(launch);
}

module.exports = {
  getAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch
};