const express = require('express');
const morgan = require('morgan');
const path = require('path');
const expressEjsLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');

const app = express();
app.set('port', process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('layout', path.join(__dirname, 'views/layout.ejs'));
app.use(expressEjsLayouts);

app.use(cookieParser());

app.use(express.urlencoded());

app.use(expressSession({
    secret: 'key',
    resave: true,
    saveUninitialized: true
}));

const login = require('./routes/login');

app.use('/login', login);

app.get('/', (req, res) => {
    res.render("mainpage", {
        gpu_num: 10,
        cuda: [0, 10, 20, 30, 4, 46, 2, 75, 15, 39, 6],
        vram: [80, 95, 60, 50, 10, 12, 72, 40, 10, 20, 10],
        useable: [true, false, true, false, true, false, true, false, true, false]
    });
});

app.get('/rent', (req, res) => {
    if(req.session.user) {
        res.render("rent");
    } else {
        res.redirect('/login');
    }
});

app.use((req, res, next) => {
    const err = new Error(`no ${req.method} ${req.url} router`);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get('port'), () => {
    console.log('launched at port ' + app.get('port'))
});