const http = require('http');
const fs = require('fs');

const data = fs.readFileSync('./movieData.json');
const movieList = JSON.parse(data);

const server = http.createServer((req, res) => {
    let method = req.method.toLowerCase();
    switch(method){
        case 'get':
            handleGetRequest(req, res);
            return;
        case 'post':
            handlePostRequest(req, res);
            return;
        case 'put':
            handlePutRequest(req, res);
            return;
        case 'delete':
            handleDeleteRequest(req, res);
            return;
        default:
            res.statucCode = 404;
            res.end('Wrong Request');
            return;
    }
}).listen(3000);

function handlePostRequest(req, res){
    let url = req.url;
    if(url == '/movies'){
        let id = movieList.length;
        let buffer = '';
        req.on('data', (chunk) => {
            buffer += chunk;
        });
        req.on('data', ()=>{
            let parsed = JSON.parse(buffer);

            movieList.push({id:id,
                            title:parsed.title, 
                            director:parsed.director,
                            year:parsed.year,
                            synopsis:parsed.synopsis
                        });   
        })
        res.statusCode = 302;
        res.setHeader('Location', '/movies');
        res.end();

    }
}

function handleGetRequest(req, res) {
    let url = req.url;
    if (url == '/movies') {
        // Make Moie List
        let list = [];
        for (let i = 0; i < movieList.length; i++) {
            let movie = movieList[i];
            list.push({ id: movie.id, title: movie.title });
        }
        
        // Info. & counts for Movies       
        var result = {
            count: list.length,
            data: list
        }

        res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' });
        res.end(JSON.stringify(result));
    }
    else {
        // Extract detatil for movie /movies/0
        var id = url.split('/')[2];
        var movie = null;
        // Search moive
        for (var i = 0; i < movieList.length; i++) {
            var item = movieList[i];
            if (id == item.id) {
                movie = item;
                break;
            }
        }
        // 검색된 영화 정보 제공
        if (movie) {
            res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8'});
            res.end(JSON.stringify(movie));
        }
        else {
            // No Info.
            res.writeHead(404, { 'Content-Type': 'application/json;charset=utf-8' });
            var message = {
                error : {
                    code : 404,
                    message : 'No Info. for a movie'                    
                }
            }
            res.end(JSON.stringify(message));
        }
    }
}