const net = require('net');

const ip = '127.0.0.1';
const port = 3000;

const socket = new net.Socket();
socket.connect({host:ip, port:port}, () => {
    console.log('Connecting server');

    socket.write('Hello Socket Server \n');
    socket.end();

    socket.on('data', (chunk) => {
        console.log('Sent by Server : ', chunk.toString());
    });

    socket.on('end', () => {
        console.log('Connection terminated');
    });

})