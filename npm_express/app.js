const express = require('express');
const app = express();

app.use(require('./greetingRouter'));


app.listen(3000);

app.get('/:value', work);
app.use(errorHandler);

function work(req, res, next){
    let val = parseInt(req.params.value);

    if(!val){
        let error = new Error('Not Number');
        next(error);
        return; 
    }

    res.send('Result : ' + val);
}

function errorHandler(err, req, res, next){
    res.send('Caused Error');
}
