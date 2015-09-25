var MongoClient = require('mongodb').MongoClient;

//Connect to mongodb [ConnectionURL]
var url = 'mongodb://localhost:27017/resource';


exports.postArticle = function(req, res, next){

	var inputData = JSON.parse(JSON.stringify(req.body));


	MongoClient.connect(url, function(err, db){
		if(err){
			console.log(err,"\n");
		}

		var collection = db.collection('articles');
		// Insert some documents
		collection.insert(
			{heading : inputData.heading, content: inputData.content}
			, function(err, result) {
			console.log("Inserted new post into the articles collection");
			// console.log(result);

			db.close();

			res.redirect('/posts')
		});
	});
};
