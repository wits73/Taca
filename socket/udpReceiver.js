let dgram = require('dgram');
let socket = dgram.createSocket('udp4');
socket.bind(3000);

socket.on('listening', function() {
    console.log('listening event');
});

socket.on('message', function(msg, rinfo) {
    console.log('Arriving message', rinfo.address, msg.toString()); 
});

socket.on('close', function() {
    console.log('close event');
});