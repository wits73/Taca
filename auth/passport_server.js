const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const session = require('express-session');
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'Secret Key'
}));

const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());


const LocalStrategy = require('passport-local').Strategy;
const strategy = new LocalStrategy(function (username, password, done) {
    console.log('test');
    if (username === 'user' && password === '1234') {
        let userinfo = { name: 'boowoo', email: 'user@mail.com' };
        done(null, userinfo);
    }
    else {
        done(null, false, 'Failed Login');
    }
});
passport.use(strategy);

passport.serializeUser(function (user, done) {
    console.log('Writing Session');
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    console.log('Reading user infor from session');
    done(null, user);
});

app.post('/login', passport.authenticate('local'), function (req, res) { res.send('success') });
app.get('/personal', showPersonal);
app.listen(3000);

function showPersonal(req, res) {
    let user = req.user;
    if (user) {
        res.send('Personal Page ' + user.name);
    }
    else {
        res.sendStatus(401);
    }
}