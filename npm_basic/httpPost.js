const http = require('http');
const querystring = require('querystring');

let movieList = [{title:'StarWars', director:'Lucas'}]

let server = http.createServer((req,res) => {
    if (req.method.toLowerCase() == 'post'){

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
    res.end()
}