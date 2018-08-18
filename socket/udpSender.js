const dgram = require('dgram');
let socket = dgram.createSocket('udp4');

let msg = new Buffer('Hello UDP Receiver');
socket.send(msg, 0, msg.length, 3000, '127.0.0.1',
    function(err) {
        console.log(err);
        if ( err ) {
            console.log('UDP message send error', err);
            return;
        }
        console.log('Success sending message');
        socket.close();        
    }
);