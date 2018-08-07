const querystring = require('querystring');

let str = 'group=EXID&name=honey&since=2018';
let parsed = querystring.parse(str);
console.log(parsed);

console.log('group : ' , parsed.group);
console.log('name : ' , parsed.name);
console.log('since : ' , parsed.since);
console.log('friend : ' , parsed.friend);
