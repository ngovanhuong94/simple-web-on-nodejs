var router = require('express').Router()
var passport = require('passport')
var PostControllers = require('../../controllers/PostControllers')
var multipart = require('connect-multiparty');
var isAuthenticated = require('../../policies/isAuthenticated');
var Post = require('../../models/Post')



router.get('/', isAuthenticated,(req,res) => {
  var message = req.flash('message')
  var error = req.flash('error');
  res.render('admin/admin', {
    message: message,
    error: error
  })
})

router.get('/login',(req,res) => {
  res.render('admin/login', {
  	message: req.flash('message')
  })
})

router.get('/add', isAuthenticated,(req,res) => {
  var error = req.flash('error');
  return res.render('admin/add', {
    error: error
  })
})

router.get('/all-post', isAuthenticated, (req,res) => {
  var message = req.flash('message')
  Post.find({}, function (err, posts) {
    if (err) throw err;
    return res.render('admin/allpost', {
      message: message,
      posts: posts
    })
  })

})


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
router.post('/login', passport.authenticate('local', {
	successRedirect: '/admin',
	failureRedirect: '/admin/login',
	failureFlash: true
}))

router.post('/add', isAuthenticated ,multipart(), PostControllers.addNewPost)
router.post('/all-post/edit', isAuthenticated, multipart(), PostControllers.editPost);
router.post('/all-post/delete', isAuthenticated, PostControllers.deletePost);


module.exports = router;
