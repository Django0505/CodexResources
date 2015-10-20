var MongoClient = require('mongodb').MongoClient;

//Connect to mongodb [ConnectionURL]
var url = 'mongodb://localhost:27017/CodeXsource';

exports.addNewUser = function(req, res, next){

  var inputData = JSON.parse(JSON.stringify(req.body));

  if(inputData.new_password == inputData.confirm_password){

    MongoClient.connect(url, function(err, db){
      if(err){
        console.log(err,"\n");
      }

      var collection = db.collection('Users');
      // Insert some documents
      collection.insert(
        {username : inputData.username, password : inputData.new_password}
      , function(err, result) {

        db.close();

        res.redirect('/login')

      });
    });
  }
  else{
    return res.render("signup", {msg : "Passwords must match!"});
  }

};

exports.loginUser = function(req, res, next){

	var inputData = JSON.parse(JSON.stringify(req.body));

	MongoClient.connect(url, function(err, db){
		if(err){
		console.log(err,"\n");
		}

		var collection = db.collection('Users');
		// Insert some documents
		collection.find({username : inputData.username, password : inputData.password}).toArray(function(err, result) {
			if (err) {
				console.log(err);
			}

			db.close();
			if(result === undefined || result.length <= 0){
				return res.redirect('/login');
			}
			else{
				req.session.user = inputData.username;
				return res.redirect('/home');
			}
		});
	});
};

exports.checkUser = function(req, res, next){
	if(req.session.user){
		next();
	}
	else{
		res.redirect('/login');
	}
}

exports.logoutUser = function(req, res, next){
  //destroy session
  delete req.session.user;

  res.redirect('login');
}
