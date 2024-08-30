const express = require('express');
const { addFriend, getFriends, getFriend} = require('../controllers/friends.controller');
const expressRouter = express.Router();

expressRouter.use((req, res, next) => {
  console.log("Address: ", req.ip);
  
  next();
});

expressRouter.post('/',addFriend );
expressRouter.get('/', getFriends);
expressRouter.get('/:id',getFriend);

module.exports = expressRouter;