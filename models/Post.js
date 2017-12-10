/*
model post
  - title
  - descriptions
  - content (the html code)
  - created (time created a post instance)
  - author (name of user)
*/

var mongoose = require('mongoose')

var PostSchema = new mongoose.Schema({
	title: {
		type: String,
		trim: true,
		required: true
	},
	descriptions: {
		type: String,
		trim: true,
		required: true
	},
	content: {
		type: String,
		trim: true,
		required: true
	},
	created: {
		type: Date,
		default: Date.now()
	},
	author: {
		type: String,
		ref: 'User',
		default: 'admin'
	},
	imageUrl: {
		type: String,
		default: 'img/bg-post.jpg'
	}
})



module.exports = mongoose.model('Post', PostSchema)