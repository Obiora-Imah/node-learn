const express = require('express');
const cluster = require('cluster');
const os = require('os');
const app = express();

function delay(duration) {
  const startTime = Date.now();

  while (Date.now() < startTime + duration) {
    // do nothing
  }
}
app.get('/', (req, res) => {
  res.send(`Performance Test ${process.pid}`);
});

app.get('/timer', (req, res) => {
  delay(3000);
  res.send(`Beep beep beep ${process.pid}`);
});

// if(cluster.isMaster) {
//   console.log(`Master ${process.pid} is running`);
//   const cpus = os.cpus().length;
//   // Fork workers
//   for (let i = 0; i < cpus; i++) {
//     cluster.fork();
//   }

//   // cluster.on('exit', (worker, code, signal) => {
//   //   console.log(`Worker ${worker.process.pid} died`);
//   // });
// } else {
//   console.log(`Worker ${process.pid} started`);
  
//   // Workers can share any TCP connection
//   // In this case it is an HTTP server
//   app.listen(3000, () => {
//     console.log(`Worker ${process.pid} started`);
//   });
// }
app.listen(3000, () => {
  console.log('Server running on port 3000');
});