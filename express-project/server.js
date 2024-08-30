const express = require('express');
const path = require('path');
const expressRouter = require('./routes/friends.routes');
const {home} = require('./controllers/friends.controller');

const PORT = 4000;
const app = express();
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use((req, res, next) => {
  const starTime = Date.now();
  console.log(`Request method: ${req.method}`);
  console.log(`Request url: ${req.url}`);
  next();
  const endTime = Date.now();
  logTime = endTime - starTime;
  console.log(`Request time: ${logTime}ms`);
  
});

app.use("/sites", express.static(path.join(__dirname, 'public')));
app.get("/", (req, res) => {
  res.render('index', {
    title: 'Express Project',
    caption: 'This is a caption',
    header: 'Catch me if you can'
  });
});
app.use(express.json());
app.use('/api/friends', expressRouter);


app.get('/', home);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});