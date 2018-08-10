const http = require('http');
var movieList = [{title:"Avarta",director:"James"}];

http.createServer((req,res)=>{
    if(req.method.toLocaleLowerCase() == 'post'){
        let buffer = '';
        req.on('data', (chunk)=>{
            buffer += chunk;
        });
        req.on('end',()=>{
            let parsed = JSON.parse(buffer);
            let titleData = parsed.title;
            let directorData  = parsed.director;

            movieList.push({title:titleData, director:directorData})
            res.writeHead(200, {'Content-Type' : 'application/json'});
            res.end(JSON.stringify({result:'success'}))
        });
    }
    else {
        let result = {
            count : movieList.length,
            data : movieList
        };
        res.writeHead(200, {'Content-Type':'application/json'});
        res.end(JSON.stringify(result));
    }
}).listen(3000);