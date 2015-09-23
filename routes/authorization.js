exports.addNewUser = function(req, res, next){

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
      collection.insert(
        {username : inputData.username, password : inputData.new_password}
      , function(err, result) {
        console.log("Inserted new user into the students collection");
        console.log(result);
        
        res.redirect('/login')

      });

        db.close();
    });
  }
  else{
    res.render("signup", {msg : "Passwords must match!"});
  }

};