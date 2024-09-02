const { Worker, workerData, parentPort, isMainThread } = require('worker_threads');

if(isMainThread) {
  console.log(`This is the main thread ${process.pid}`);
  new Worker(__filename, {
    workerData: [7,5,0,8,4,1,5,7]
  });
  new Worker(__filename, {
    workerData: [7,9,0,8,3,1,5,0]
  });
} else {
  console.log(`This is a worker thread ${process.pid}`);
  console.log(`Worker Data: ${workerData.sort((a,b) => a - b)}`);
  
}