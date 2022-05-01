const http = require('http');
let time = Date();

const port = 2337;
 
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n' + time);
  
});
 
server.listen(2337);

console.log('Server running at 2337');

let time1 = new Date().getTime();
let time2 = Date.now();

