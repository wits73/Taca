const util = require('util');

function Parent(){

}

Parent.prototype.sayHello = () => {console.log('Hellow World, Parent class')}

function Child(){

}

let obj = new Parent();
obj.sayHello();


util.inherits(Child, Parent);

// error without util.inherits
let obj2 = new Child();
obj2.sayHello();