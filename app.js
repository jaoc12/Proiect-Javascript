var express = require('express');

var app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('html/index');
});
app.get('/program', function(req, res) {
    res.render('html/program');
});
app.get('/filme', function(req, res) {
    res.render('html/filme');
});
app.get('/promotii', function(req, res) {
    res.render('html/promotii');
});

app.use('/css', express.static('css'));
app.use('/imagini', express.static('imagini'));

app.listen(process.env.PORT || 8080);
console.log('Aplicatia se va deschide pe portul 8080.');