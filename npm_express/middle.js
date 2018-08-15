const express = require('express');
const app = express();

app.use(express.static(__dirname + '/images'));

app.use((req, res, next) => {
    let now = new Date();
    console.log(now.toDateString() + ' - url : '+ req.url);
    next();
});

app.use((req, res) => {
    res.send('Hello Express!!')
});

app.listen(3000);