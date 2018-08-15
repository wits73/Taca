const fs = require('fs');
const pathUtil = require('path');
const http = require('http');
const formidable = require('formidable');

let uploadDir = __dirname + '/upload';
let imageDir = __dirname + '/image';

let paintList = [];
let server = http.createServer((req,res) => {
    // Request root
    if (req.url == '/' && req.method.toLowerCase() == 'get'){
        showList(res);
    } 
    // Request image
    else if (req.method.toLowerCase() == 'get' && req.url.indexOf('/image') == 0) {
        var path = __dirname + req.url;
        res.writeHead(200, { 'Content-Type': 'image/jpeg' })
        fs.createReadStream(path).pipe(res);
     } 
    // Request upload
    else if(req.method.toLowerCase() == 'post'){
        addNewPaint(req, res);
    }


});
server.listen(3000, () => {
    console.log('Server is running on 3000')
});

function showList(res) {
   res.writeHeader(200, { 'content-type': 'text/html' });

   var body = '<html>';
   body += '<head><meta charset="UTF-8"></head>';
   body += '<body>';
   body += '<h3>Favorite Paint</h3>';

   body += '<ul>';
   paintList.forEach(function (item, index) {
      body += '<li>';
      if (item.image) {
         body += '<img src="' + item.image + '" style="height:100pt"></img>';
      }
      body += item.title;
      body += '</li>';
   });
   body += '</ul>';

   body += '<form action="." enctype="multipart/form-data" method="post">' +
   '<div><label>작품 이름 : </label><input type="text" name="title"></div>' +
   '<div><label>작품 이미지 : </label><input type="file" name="image" value="작품 파일 선택"></div>' +
   '<input type="submit" value="upload">' +
   '</form>';
   body += '</body></html>';

   res.end(body);
}


function addNewPaint(req,res){
    let form = formidable.IncomingForm();
    form.uploadDir = uploadDir;

    form.parse(req, (err, fields, files) => {
        let title = fields.title;
        let image = files.image;

        console.log(image);
        res.end('Success');
    });
}
