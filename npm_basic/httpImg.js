const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res) => {
    fs.access('./Capture.PNG', (err) => {
        if(err){
            res.statusCode = 404;
            res.end();
            return;
        }
        fs.readFile('./Capture.PNG', (err,data) => {
            res.end(data);
        })
    });
}).listen(3000)