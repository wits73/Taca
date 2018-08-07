const fs = require('fs');

const output = fs.createWriteStream('basic/logs/stdout.log');
const errorOutput = fs.createWriteStream('basic/logs/error.log')
const Console = require('console').Console;

let logger = new Console(output, errorOutput);

logger.info('info')
logger.log('log')
logger.warn('warn')
logger.error('error')