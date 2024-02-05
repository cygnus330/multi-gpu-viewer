const express = require('express');
const morgan = require('morgan');
const path = require('path');
const expressEjsLayouts = require('express-ejs-layouts');

const app = express();
app.set('port', process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('layout', path.join(__dirname, 'views/layout.ejs'));
app.set('layout extractScripts', true);
app.set('layout extractStyles', true);
app.use(expressEjsLayouts);

app.get('/', (req, res) => {
    res.render("mainpage", {});
})

app.use((req, res, next) => {
    const err = new Error(`no ${req.method} ${req.url} router`);
    err.status = 404;
    next(err);
})

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
})

app.listen(app.get('port'), () => {
    console.log('launched at port ' + app.get('port'))
})