const express = require('express');
const router = express.Router();

router.get('/hello', sayHello);
router.get('/how/:who', sayThankYou);

function sayHello(req,res){
    res.send('Hello router');
}

function sayThankYou(req, res) {
    let who = req.params.who;
    res.send('Fine Thank you ' + who)
}

module.exports = router;