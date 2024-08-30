const http = require('http');
const list = []
const server = http.createServer((req, res) => {
 
  if (req.url === '/api') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify({Id: '1', Name: 'Obiora Nwabugwu'}));
    res.end();
  } else if (req.url === '/req') {
    req.on('data', (chunk) => {
      console.log(chunk.toString());
      
      const data = JSON.parse(chunk.toString());
      list.push(data);
      console.log(`Updated list with: ${data}`);
      console.log(`New list: ${JSON.stringify(list)}`);
      // res.end();
    });
    req.pipe(res);
  } else if (req.url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.write( "<html><body><ul><li>Id: 1</li>");
    res.write( "<li>Name: Obiora</li><ul></body></html>");
    res.end();
   
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    res.write('<h1>Page not found</h1>');
    res.end();
  }
})


server.listen(9090, () => {
  console.log('Server is running on port 9090');
})