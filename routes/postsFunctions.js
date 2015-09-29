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
			{heading : inputData.heading, content: inputData.content, user: req.session.user, date: Date()}
			, function(err, result) {
			// console.log("Inserted new post into the articles collection");
			// console.log(result);

			db.close();

			res.redirect('/home')
		});
	});
};

exports.showPosts = function(req, res, next){

	MongoClient.connect(url, function(err, db){
		if(err){
		console.log(err,"\n");
		}

		var collection = db.collection('articles');
		// Insert some documents
		collection.find().toArray(function(err, result) {
			if (err) {
				console.log(err);
			}
			// console.log(result);

			db.close();
				return res.render('home', {
					article:result,
					user:req.session.user
				});
		});
	});
};

exports.fullPost = function(req, res, next){

	MongoClient.connect(url, function(err, db){
		if(err){
		console.log(err,"\n");
		}

		var post_heading = req.params.heading;

		var collection = db.collection('articles');
		var collection2 = db.collection('comments');
		// Insert some documents
		collection.find({"heading" : post_heading}).toArray(function(err, result1) {
			if (err) {
				console.log(err);
			}
			collection2.find({"article_heading": post_heading}).toArray(function(err, result2) {
				if (err) {
					console.log(err);
				}
				// console.log(result);

				db.close();
				console.log(result2);
					res.render('post',
						{
							user: req.session.user,
							article: result1,
							comments : result2
						});
			});
		});
	});
}
exports.articleComments = function(req, res, next){

	MongoClient.connect(url, function(err, db){
		if(err){
		console.log(err,"\n");
		}

		var post_heading = req.params.heading;

		var collection = db.collection('comments');
		// Insert some documents
		collection.find({"heading" : post_heading}).toArray(function(err, result) {
			if (err) {
				console.log(err);
			}
			// console.log(result);

			db.close();
				res.render('post',
					{
						user: req.session.user,
						comments : result
					});
		});
	});
}

exports.commentOnPost = function(req, res, next){

	MongoClient.connect(url, function(err, db){
		if(err){
		console.log(err,"\n");
		}

		var inputData = JSON.parse(JSON.stringify(req.body));
		var post_heading = req.params.heading;
		var date = Date();

		var collection = db.collection('comments');
		// Insert some documents
		collection.insert(
			{"comment" : inputData.commentOnPost,"user": req.session.user, "date": date, article_heading : post_heading}
			, function(err, result) {
			if (err) {
				console.log(err);
			}
			// console.log(result);

			db.close();
				res.redirect('/post/'+post_heading);
		});
	});
}
