const express = require('express');
const app = express();
const morgan = require('morgan');

let users = [
    { id: 1, name: 'alice' },
    { id: 2, name: 'bek' },
    { id: 3, name: 'chris' }
];

app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.json(users);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});