var router = require('express').Router()
var PostControllers = require('../../controllers/PostControllers')

router.get('/', function (req,res) {
	res.redirect('/q?page=1')
})
router.get('/about', (req,res) => {
  res.render('public/about')
})
router.get("/contact", (req,res) => {
  res.render('public/contact')
})
router.get('/post', (req, res) => {
  res.render('public/post')
})
router.get('/q', PostControllers.getAllPosts)



module.exports = router
