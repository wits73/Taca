const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'ejs');
app.set('views','views');

app.use(bodyParser.urlencoded({extended:false}));

app.use(require('./movieRouter'));

app.get('/', (req, res) => {
    res.end('Welcome to Movies app');
});


app.use(handleError);

function handleError(err, req, res, next) {
   console.log('Error : ', err);
   res.status(err.code).send({msg:err.message});
}



app.listen(3000);