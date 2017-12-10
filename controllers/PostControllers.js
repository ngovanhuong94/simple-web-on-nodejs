var Post = require('../models/Post')


var PostControllers = {}

PostControllers.getAllPosts = (req,res) => {
	Post.find({}).sort({date: -1}).exec(function (err, posts){
		if (err) {
			console.log(err);
			return res.render('notfound');
		}

		return res.render('allpost', {
			posts: posts
		})
	})
}

PostControllers.getPostDetails = (req, res) => {
	var postId = req.params.postId;

	Post.findById(postId, function (err, post) {
		if (err) {
			console.log(err);
			return res.render('notfound')
		}
		return res.render('post', {
			post: post
		})
	})
}

module.exports = PostControllers