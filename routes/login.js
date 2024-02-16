const express = require('express');
const app = express.Router();

const reg_mail = /^[a-zA-Z0-9._%+-]+@gs\.hs\.kr$/;
const reg_id = /^[a-zA-Z0-9_]+$/;
const reg_pw = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,24}$/;

app.get('/login', (req, res) => {
    if(req.session.user) {
        res.render('login/already_logged');
    } else {
        res.render('login/login');
    }
});

app.post('/login', (req, res) => {
    const post_id = req.body.ID || req.query.ID;
    const post_pw = req.body.PW || req.query.PW;

    if(!reg_id.test(post_id)) {
        res.write('<script>alert("wrong format: id")</script>');
        res.end('<script>window.location = "/login"</script>');
    }

    if(!reg_pw.test(post_pw)) {
        res.write('<script>alert("wrong format: pw")</script>');
        res.end('<script>window.location = "/login"</script>');
    }

    if(req.session.user) {
        res.render('login/already_logged');
    } else {
        req.session.user = {
            id: post_id,
            pw: post_pw,
            authorized: true
        };
        res.render('login/now_logged');
    }
});

app.get('/register', (req, res) => {
    if(req.session.user) {
        res.redirect('/userinfo');
    } else {
        res.render('login/register');
    }
});

app.post('/register', (req, res) => {

});

module.exports = app;