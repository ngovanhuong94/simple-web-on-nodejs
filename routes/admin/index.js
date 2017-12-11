var router = require('express').Router()
var passport = require('passport')
var PostControllers = require('../../controllers/PostControllers')
var multipart = require('connect-multiparty');
var isAuthenticated = require('../../policies/isAuthenticated');
var Post = require('../../models/Post')



router.get('/', isAuthenticated,(req,res) => {
  res.render('admin/admin')
})

router.get('/login',(req,res) => {
  res.render('admin/login', {
  	message: req.flash('message')
  })
})

router.get('/add', isAuthenticated,(req,res) => {
  return res.render('admin/add')
})

router.get('/all-post', isAuthenticated, (req,res) => {
  console.log(req.flash('message'))
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
  Post.findById(postId, function (err, post) {
    if (err) throw err;
    return res.render('admin/edit', {
      post: post
    })
  })
})
router.post('/login', passport.authenticate('local', {
	successRedirect: '/admin',
	failureRedirect: '/admin/login',
	failureFlash: true
}))

router.post('/add', isAuthenticated ,multipart(), PostControllers.addNewPost)
module.exports = router;
