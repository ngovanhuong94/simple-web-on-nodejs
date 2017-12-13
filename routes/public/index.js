var router = require('express').Router()
var PostControllers = require('../../controllers/PostControllers')
var Post = require('../../models/Post');


router.get('/', function (req,res) {
	res.redirect('/q?page=1')
})
router.get('/about', (req,res) => {
  res.render('public/about')
})
router.get("/contact", (req,res) => {
  res.render('public/contact')
})
router.get('/post/:slug', (req, res) => {
  var slug = req.params.slug;	
  Post.findOne({slug: slug}, function (err, post) {
  	res.render('public/post', {
  		post: post
  	})
  })
  
})
router.get('/q', PostControllers.getAllPosts)



module.exports = router
