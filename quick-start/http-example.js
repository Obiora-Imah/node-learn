const {get} = require('https');
const req = get('https://www.google.com', (response) => {

  let data = '';
  response.on('data', (chunk) => {
    console.log(`Received ${chunk} bytes of data.`);
    
    data += chunk;
  });

  response.on('end', () => {
    console.log("No more data to read.");
  });

})
// req.end();