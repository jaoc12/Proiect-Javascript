const express = require('express');
const fs = require('fs');
const formidable = require("formidable");
const session = require('express-session');
const crypto = require('crypto');
//var bodyParser = require('body-parser');
var app = express();

app.set('view engine', 'ejs');
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded(false));
app.use('/date',express.static('date'));
app.use('/css', express.static('css'));
app.use('/imagini', express.static('imagini'));
app.use('/script', express.static('script'));


app.use(session({  
    secret: 'abcdefg',//folosit de express session pentru criptarea id-ului de sesiune
    resave: true,
    saveUninitialized: false
}));


//iau un fisier json si il formatez
function getJSON(numeFisier){
    numeFisier = 'date/' + numeFisier;
    let textFis = fs.readFileSync(numeFisier);
    return JSON.parse(textFis);
}

function setJSON(fisierJSON, numeFisier){
    numeFisier = 'date/' + numeFisier;
    let data = JSON.stringify(fisierJSON);
    fs.writeFileSync(numeFisier, data);
}

app.get('/', function(req, res) {
    res.render('html/index',{user: req.session.username});
});
app.get('/program', function(req, res) {
    let programJSON = getJSON('program.json');
    res.render('html/program',{user: req.session.username, program: programJSON});
});
app.get('/filme', function(req, res) {
    let filmeJSON = getJSON('filme.json');
    res.render('html/filme',{user: req.session.username, filme: filmeJSON});
});
app.get('/promotii', function(req, res) {
    res.render('html/promotii',{user: req.session.username});
});
app.get('/bilete', function(req, res) {
    res.render('html/bilete',{user: req.session.username});
});
app.get('/inregistrare', function(req, res){
    res.render('html/inregistrare',{user: req.session.username});
});
app.get('/logout', function(req, res) {
    req.session.destroy();//distrug sesiunea cand se intra pe pagina de logout
    res.redirect('/');
});

app.post('/', function(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        let fisierJSON = getJSON('useri.json');
        var cifru = crypto.createCipher('aes-128-cbc', 'mypassword');
		var encrParola= cifru.update(fields.parola, 'utf8', 'hex');
		encrParola+=cifru.final('hex');
        let user=fisierJSON.useri.find(function(x){
			return (x.username == fields.username && x.parola == encrParola);
        });
        if(user){
            console.log("Succes");
            req.session.username = user;
        }
        else{
            console.log("Nope");
        }
        res.render('html/index',{user: req.session.username});
    });
});

app.post('/inregistrare', function(req, res) {
    console.log("ok");
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        let fisierJSON = getJSON('useri.json');
        var cifru = crypto.createCipher('aes-128-cbc', 'mypassword');
		var encrParola= cifru.update(fields.parola, 'utf8', 'hex');
		encrParola+=cifru.final('hex');
        fisierJSON.useri.push({id:fisierJSON.lastID, username:fields.username, parola:encrParola, email:fields.email});
        fisierJSON.lastID++;
        setJSON(fisierJSON,'useri.json');
        res.redirect('/');
    });
});

app.use(function(req,res){
    res.status(404).render('html/404');
});

app.listen(process.env.PORT || 8080);
console.log('Aplicatia se va deschide pe portul 8080.');