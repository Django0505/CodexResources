var express = require('express');
var app = express();
var http = require('http').Server(app);
var exphbs  = require('express-handlebars'),
    mysql = require('mysql'),
    session = require('express-session'),
    myConnection = require('express-myconnection');

var dbOptions = {
      host: 'localhost',
      user: 'tarcode',
      password: 'coder123',
      port: 3306,
      database: 'codexource'
};

app.use(myConnection(mysql, dbOptions, 'pool'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(session({secret: "bookworms", cookie: {maxAge: 1000000}, resave:true, saveUninitialized: false}));
app.use(express.static('public'));


app.get('/', function(req, res, next){
    res.render('login');
});

app.get('/signup', function(req, res, next){
    res.render('signup');
});

app.get('/home', function(req, res, next){
    res.render('home');
});

app.get('/posts', function(req, res, next){
    res.render('posts');
});

http.listen(3000, function(){
    console.log('listening on *: 3000');
});
