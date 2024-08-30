
const path = require('path');

const friends = require('../models/friends.model');
function home(req, res) {
  res.sendFile(path.join(__dirname, '../public/images/Screenshot-2024-08-27-2.png'));
}
function addFriend(req, res) {
  const friend = {
    id: friends.length + 1,
    name: req.body.name
  };
  friends.push(friend);
  res.json(friend);
}
function getFriends(req, res) {
  res.json(friends);
}
function  getFriend(req, res) {
  const id = req.params.id;
  const friend = friends.find(friend => friend.id === parseInt(id))
  if (!friend) {
    res.status(404).send(`The friend with the given ID ${id} was not found`);
  }
  res.json(friend);
}

module.exports = {
  home,
  addFriend,
  getFriends,
  getFriend
};
