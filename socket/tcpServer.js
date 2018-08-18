const net = require('net');
const server = net.createServer((socket) => {
    // connection event
    console.log('connecting client');
    socket.write('Selcome to Socket Server');

    socket.on('data', (chunk) => {
        console.log('Sending by client : ', chunk.toString());
    });

    socket.on('end', () => {
        console.log('Ending connect');
    });
})

server.on('listening', function() {
    console.log('Server is listening');
});

server.on('close', function() {
    console.log('Server closed');
});

server.listen(3000);