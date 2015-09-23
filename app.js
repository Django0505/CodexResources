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

app.post('/login', function(req, res, next){
  console.log(req.body)
  res.redirect('/home')
})

app.get('/signup', function(req, res, next){
    res.render('signup');
});

app.post('/signup', function(req, res, next){

  var MongoClient = require('mongodb').MongoClient;
  
  //Connect to mongodb [ConnectionURL]
  var url = 'mongodb://localhost:27017/resource';

  var inputData = JSON.parse(JSON.stringify(req.body));
  
  if(inputData.new_password == inputData.confirm_password){
    
    MongoClient.connect(url, function(err, db){
      if(err){
        console.log(err,"\n");
      }

      var collection = db.collection('students');
      // Insert some documents 
      collection.insert([
        {username : inputData.username, password : inputData.new_password}
      ], function(err, result) {
        console.log("Inserted new user into the students collection");
        console.log(result);
        
        res.redirect('/login')

      });

        db.close();
    });
  }
  else{
    res.render(signup, {msg : "Passwords must match!"});
  }

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
