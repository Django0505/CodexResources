var express = require('express');
var app = express();
var http = require('http').Server(app);
var exphbs  = require('express-handlebars'),
    MongoClient = require('mongodb').MongoClient,
    session = require('express-session'),
    bodyParser = require('body-parser');

var auth = require('./routes/authorization');


app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(session({secret: "bookworms", cookie: {maxAge: 1000000}, resave:true, saveUninitialized: false}));
app.use(express.static('public'));


app.get(['/', '/login'], function(req, res, next){
    res.render('login');
});

app.post('/login', auth.loginUser)

app.get('/signup', function(req, res, next){
    res.render('signup');
});

app.post('/signup', auth.addNewUser);

app.get('/home', function(req, res, next){
    res.render('home');
});

app.get('/posts', function(req, res, next){
    res.render('posts');
});

http.listen(3000, function(){
    console.log('listening on *: 3000');
});
