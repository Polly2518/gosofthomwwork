var http = require('http');

var server = http.createServer(function(req, res) {

    let ts = Date();
    res.writeHead(200, { 'Content-Type': 'text/html' });
    console.log('Sasirapol phasuktoy')
    console.log(ts);
    res.end('Sasirapol phasuktoy   ' + ts);


});

server.listen(2337);

console.log('Node.js web server at port 2337 is running..')