var router = require('express').Router()
var passport = require('passport')
var PostControllers = require('../../controllers/PostControllers')
var multipart = require('connect-multiparty');
var isAuthenticated = require('../../policies/isAuthenticated');
var Post = require('../../models/Post')
var User = require('../../models/User')

// render dashboard page
router.get('/', isAuthenticated, async (req,res) => {
  var message = req.flash('message')
  var error = req.flash('error');
  var posts = await Post.find().sort({created: -1}).limit(5).exec();
  var count = await Post.count();
  var countUser = await User.count();
  res.render('admin/admin', {
    message: message,
    error: error,
    posts: posts,
    count: count,
    countUser: countUser
  })
})

// render login page
router.get('/login', (req,res) => {
  res.render('admin/login', {
  	message: req.flash('message')
  })
})

// render add page
router.get('/add', isAuthenticated, (req,res) => {
  var error = req.flash('error');
  return res.render('admin/add', {
    error: error
  })
})

// redirect to all-post first page 
router.get('/all-post', function (req,res) {
  return res.redirect('/admin/all-post/1')
})

//render all-post page with parameter page
router.get('/all-post/:page', isAuthenticated, (req,res) => {
  var message = req.flash('message');
  var perPage = 6;
  var page = req.params.page || 1;

  Post.find({})
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .exec(function (err, posts) {
        Post.count().exec(function (err, count) {
          if (err) throw err;
          return res.render('admin/allpost', {
            posts: posts,
            current: page,
            message: message,
            perPage: perPage,
            count: count,
            pages: Math.ceil(count / perPage)
          })
        })
      })
})

// render edit admin
router.get('/all-post/:postId/edit', isAuthenticated, (req,res) =>  {
  var postId = req.params.postId;
  var error = req.flash('error');
  Post.findById(postId, function (err, post) {
    if (err) throw err;
    return res.render('admin/edit', {
      post: post,
      error: error
    })
  })
})
// login with passport.js
router.post('/login', passport.authenticate('local', {
	successRedirect: '/admin',
	failureRedirect: '/admin/login',
	failureFlash: true
}))

// add new post
router.post('/add', isAuthenticated ,multipart(), PostControllers.addNewPost)
// edit post
router.post('/all-post/edit', isAuthenticated, multipart(), PostControllers.editPost);
// delete post
router.post('/all-post/delete', isAuthenticated, PostControllers.deletePost);


module.exports = router;
