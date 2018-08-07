const url = require('url');

let urlStr = 'https://www.youtube.com/watch?v=C2RUa4Vwxz4&index=6&list=PL9mhQYIlKEhfedWZfhcP6JCb83gDo1T9r';
let parsed = url.parse(urlStr, true);

console.log(parsed)
console.log('protocol : ', parsed.protocol)
console.log('host : ', parsed.host)
console.log('query : ', parsed.query)
