const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'));

app.get('/hello', (req, res) => {
    res.send('Get Request, /hello');
});
app.get('/movies', (req, res) => {
    res.send('Get Request, /movies');
});

app.listen(3000);