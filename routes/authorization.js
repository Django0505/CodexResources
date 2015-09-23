var MongoClient = require('mongodb').MongoClient;

//Connect to mongodb [ConnectionURL]
var url = 'mongodb://localhost:27017/resource';

// MongoClient.connect(url, function(err, db) {
//     if(err) {
//         console.log(err);
//     }
//     else {
//          mongoInsert(db, 'user', user_default, function(user_res) { 
//             console.log(user_res);
//             db.close();
//         });
//     }

//     console.log('Disconnected from server successfully');
// });

// function mongoInsert(db, collection_name, data,cb) {
//     var collection = db.collection(collection_name);
//     collection.insert(data, function(err, res) {
//         if(err) {
//             console.log(err);
//         }
//         else {
//             console.log('Inserted into the ' + collection_name + ' collection');
//             cb(res);
//         }
//     });
// }

exports.addNewUser = function(req, res, next){

  var inputData = JSON.parse(JSON.stringify(req.body));
  
  if(inputData.new_password == inputData.confirm_password){
    
    MongoClient.connect(url, function(err, db){
      if(err){
        console.log(err,"\n");
      }

      var collection = db.collection('students');
      // Insert some documents 
      collection.insert(
        {username : inputData.username, password : inputData.new_password}
      , function(err, result) {
        console.log("Inserted new user into the students collection");
        console.log(result);
        
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

		var collection = db.collection('students');
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