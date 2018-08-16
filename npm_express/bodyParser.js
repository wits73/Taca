const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.listen(3000);

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.post('/', (req, res) => {
    let title = req.body.title;
    let message = req.body.message;

    res.send('title : ' + title + 'message : ' + message);
})