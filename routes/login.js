const express = require('express');
const app = express.Router();

app.get('/', (req, res) => {
    if(req.session.user) {
        res.render('login/already_logged');
    } else {
        res.render('login/login');
    }
});

app.post('/', (req, res) => {
    const post_id = req.body.ID || req.query.ID;
    const post_pw = req.body.PW || req.query.PW;

    if(req.session.user) {
        res.render('login/already_logged');
    } else {
        req.session.user = {
            id: post_id,
            pw: post_pw,
            authorized: true
        };
        // res.render('login/now_logged');
        res.write('good');
        res.end();
    }
});

module.exports = app;