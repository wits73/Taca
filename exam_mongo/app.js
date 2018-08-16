const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(morgan('dev'));
app.use(require('./movieRouter'));
app.use(handleError);

app.listen(3000);

function handleError(err, req, res, next) {
   res.status(err.code).send({msg:err.message});
}