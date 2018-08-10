const http = require('http');
const querystring = require('querystring');

let movieList = [{title:'StarWars', director:'Lucas'}]

let server = http.createServer((req,res) => {
    if (req.method.toLowerCase() == 'post'){
        addNewMovie(req,res);
    } else {
        showList(req,res);
    }
}).listen(3000)

function showList(req,res) {
    res.writeHeader(200, {'Content-Type' : 'text/html; charset=UTF-8'});
    res.write('<html>');
    res.write('<meta charset="UTF-8">');
    res.write('<body>');
    res.write('<h3>Movies</h3>');
    res.write('<div><ul>');
    movieList.forEach((item)=>{
        res.write('<li>' + item.title + '(' + item.director + ')</li>' )
    }, this);
    res.write('</ul></div></body></html>');
    res.end();
}

function addNewMovie(req, res){
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', () => {
        let data = querystring.parse(body);
        let title = data.title;
        let director = data.director;

        movieList.push({title:title, director:director});
        
        //res.end('Success');
        res.statusCode = 302;
        res.setHeader('Location', '.');
        res.end();
    });
}