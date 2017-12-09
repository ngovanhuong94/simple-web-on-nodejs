/*
seed:
  - remove all data in database
  - load default data
*/

var mongoose = require('mongoose')

var User = require('../models/User')
var Post = require('../models/Post')
var usersData = require('./users.json')
var postsData = require('./posts.json')

/*
remove all data in database
*/ 

User.remove({}, function (err){
  if (err) throw err;
  console.log("deleted all data of users in database")
})

Post.remove({}, function (err){
  if (err) throw err;
  console.log("deleted all data of posts in database")
})

// loop with userData 
usersData.forEach(data => {
	// create a new instance from User model
	User.create(function (err, user) {
		if (err) throw err;
		console.log("Added a user in database")
	})
})

// loop with postsData 
postsData.forEach(data => {
	// create a new instance from Post model
	Post.create(function (err, post) {
		if (err) throw err;
		console.log('Added a post in database')
	})
})
