const http = require('http');

const server = http.createServer((req, res) => {
    console.log('HTTP Method : ' + req.method);
    console.log('HTTP url : ' + req.url);
    console.log('HTTP Header ');

    console.log('HTTP headers : ' + req.headers);
    
    res.end('Hello World')
}).listen(3000)
/*
const server = http.createServer();

server.on('request', (req,res) => {
    res.write('Hello World');
    res.end();
})

server.listen(3000)
*/