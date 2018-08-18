const express = require('express');
const http = require('http');
const app = express();

const server = http.createServer(app);
server.listen(3000);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client.html');
});

const io = require('socket.io')(server);
io.on('connect', function(socket) {
   console.log('connecting client');
   
   socket.on('disconnect', function() {
      console.log('Ending connecting client'); 
   });
    setInterval(function(){
       socket.emit('message', 'message');
   }, 3000);
      
});
