var Post = require('../models/Post')
var fs = require('fs');


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

PostControllers.addNewPost = (req,res) => {

	try {
		var {title, descriptions, content} = req.body;
		var user = req.user;
		var post = new Post({
			title: title,
			descriptions: descriptions,
			content: content,
			author: user.name
		})
		console.log('req.files: ',req.files)
		if (req.files &&
			req.files.image &&
			req.files.image.path &&
			req.files.image.originalFilename !== '') {
			var dateUploadFile = new Date;
			var tmp_path = req.files.image.path;
			var target_path = './public/img/' + dateUploadFile +req.files.image.name;

			console.log('tmp_path: ', tmp_path);
			console.log('target_path: ', target_path);
			fs.readFile(tmp_path, function (err, data) {
				fs.writeFile(target_path, data, function (err) {
						if (err) {
							// res.status(500).send({success: 'file upload error'})
							req.flash('error', 'Failed to upload your file')
							res.redirect('/admin/add')
						} else {
							console.log('saved a file')
							post.imageUrl = 'img/' + dateUploadFile + req.files.image.name;
							post.save(function (err) {
								if (err) {
									// res.status(400).send({success: 'fail save post'})
									fs.unlinkSync(target_path);
									console.log('Delete the file')
									req.flash('error', 'Failed to save post !')
									res.redirect('/admin/add')
								} else {
									req.flash('message', 'You created a post');
									res.redirect('/admin/all-post')
								}
							})
						}
				})
			})
		} else {
			post.save(function (err) {
				if (err) {
					// res.status(400).send({success: 'fail save post'})
					req.flash('error', 'Failed to save post !')
					res.redirect('/admin/add')
				} else {
					req.flash('message', 'You created a post');
					res.redirect('/admin/all-post')
				}
			})
		}
	} catch (err) {
		req.flash('error', 'An error occured trying to create a post')
		return res.redirect('/admin/add')
	}


}

module.exports = PostControllers
