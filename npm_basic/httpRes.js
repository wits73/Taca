const http = require('http')

const server = http.createServer((req , res) => {
    res.statusCode = 200;
    res.statusMessage = 'OKOK'
    res.setHeader('content-type','text/plain')

    res.write('<html><body><h1>test</h1></body></html>')
    res.end();
}).listen(3000)