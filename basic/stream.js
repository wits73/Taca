const fs = require('fs')

const os = fs.createWriteStream('./basic/files/output.txt')

os.on('finish', () => {console.log('finish!')})

//os.write('1234')
//os.end('9')

let is = process.stdin;
is.pipe(os);