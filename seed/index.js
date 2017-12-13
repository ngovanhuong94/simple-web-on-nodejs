/*
seed:
  - remove all data in database
  - load default data
*/
require('dotenv').config()
var mongoose = require('mongoose')
var DB_URI = process.env.DB_URI
mongoose.connect(DB_URI)

var User = require('../models/User')
var Post = require('../models/Post')


User.remove({}, function (err){
	if (err) throw err;
	console.log("Removed all data")
	var user = new User({
	name: 'admin',
	email: 'admin@gmail.com',
	password: '123456'
	})

	user.save(function (err){
		if (err) throw err;
		console.log('Added admin')
	})

	var user2 = new User({
		name: 'user',
		email: 'test@gmail.com',
		password: '123456'
	})

	user2.save(function (err) {
		if (err) throw err;
		console.log('Added user')
	})
})

Post.remove({}, function (err) {
	if (err) throw err;
	console.log("removed all posts")
	var post = new Post({
	"title": "Man must explore, and this is exploration at its greatest part 1",
	"descriptions": "Problems look mighty small from 150 miles up",
	"content": "Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory."
    })
    var post2 = new Post({
	"title": "Man must explore, and this is exploration at its greatest part 2",
	"descriptions": "Problems look mighty small from 150 miles up",
	"content": "Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory."
    })

	post.save(function (err) {
		if (err) throw err;
		console.log('Added a post')
	})

	post2.save(function (err) {
		if (err) throw err;
		console.log('Added a post')
	})
})

