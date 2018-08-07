

process.on('uncaughtException', (code) => {console.log('uncaughtException :', code)});


sayHello();

/*

process.on('exit', (code) => {console.log('exit event :', code)})

process.once('exit', (code) => {console.log('exit event with once :', code)})

process.emit('exit');
process.emit('exit',0);
process.emit('exit',1);

*/