const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    let parsed = url.parse(req.url, true);
    let query = parsed.query;

    let start = parseInt(query.start);
    let end = parseInt(query.end);

    if(!start || !end){
        res.statusCode = 404;
        res.end('Wrong Parmeter');
    } else {
        let result = 0;
        for(var i = start ; i <= end ; i++ ){
            result += i;
        }
        res.statusCode = 200;
        res.end('Result : ' + result)
    }
}).listen(3000);

// http://127.0.0.1.:3000/cal?start=1&end=10