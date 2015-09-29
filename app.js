var express = require('express');
var app = express();
var http = require('http').Server(app);
var exphbs  = require('express-handlebars'),
    MongoClient = require('mongodb').MongoClient,
    session = require('express-session'),
    bodyParser = require('body-parser');

var auth = require('./routes/authorization'),
    post = require('./routes/postsFunctions');


app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(session({secret: "bookworms", cookie: {maxAge: 600000}, resave:true, saveUninitialized: false}));
app.use(express.static('public'));


app.get(['/', '/login'], function(req, res, next){
    res.render('login');
});

app.post('/login', auth.loginUser);

app.get('/logout', auth.logoutUser)

app.get('/signup', function(req, res, next){
    res.render('signup');
});

app.post('/signup', auth.addNewUser);

app.get('/home', auth.checkUser, post.showPosts);

app.get('/post/:heading', auth.checkUser, post.fullPost);
app.post('/post/:heading', auth.checkUser, post.commentOnPost);
// app.get('/posts', auth.checkUser, post.getPost);

app.get('/posts/new', auth.checkUser, function(req, res, next){
    res.render('newPost',{user: req.session.user});
});

app.post('/posts/new', auth.checkUser, post.postArticle);

http.listen(3000, function(){
    console.log('listening on *: 3000');
});
