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

PostControllers.addNewPost = async (req,res) => {
	var {title, content, descriptions} = req.body;
	var user = req.user;
	try {
		var post = new Post({
		title: title,
		content: content,
		descriptions: descriptions,
		author: user.name
	    })
	    if (req.files.image.originalFilename !== '') {
	    	var timeUpload = new Date;
	    	var tmp_path = req.files.image.path;
	    	var target_path = ('./public/img/'+ timeUpload + req.files.image.name).replace(/ /g,'');
	    	var data = fs.readFileSync(tmp_path);
	    	fs.writeFileSync(target_path, data);
	    	post.imageUrl = ('img/'+ timeUpload+ req.files.image.name).replace(/ /g,'');
	    }
	    await post.save();
	    req.flash('message', 'You created a post');
	    res.redirect('/admin/all-post');

	} catch (err) {
		console.log(err);
		req.flash('error', 'An error occured trying to create a post');
		return res.redirect('/admin/add');
	}
}

PostControllers.editPost = async function (req,res) {
	var {title, content, descriptions, postId} = req.body;

	try {
		var post = await Post.findById(postId).exec();
		post.title = title;
		post.content = content;
		post.descriptions = descriptions;
		if (req.files.image.originalFilename !== '') {
	    	var timeUpload = new Date;
	    	var tmp_path = req.files.image.path;
	    	var target_path = ('./public/img/'+ timeUpload + req.files.image.name).replace(/ /g,'');
	    	var oldImagePath = './public/'+ post.imageUrl;
	    	
	    	var data = fs.readFileSync(tmp_path);
	    	fs.writeFileSync(target_path, data);
	    	post.imageUrl = ('img/'+ timeUpload+ req.files.image.name).replace(/ /g,'');

	    	if (oldImagePath !== './public/img/bg-post.jpg') {
	    		fs.unlinkSync(oldImagePath);
	    	}
	    }
		await post.save()
		return res.redirect('/admin/all-post')
	} catch (err) {
		console.log(err);
		req.flash('error', 'An error occured trying to update a post');
		return res.redirect(`/admin/all-post/${postId}/edit`)
	}
}
module.exports = PostControllers
