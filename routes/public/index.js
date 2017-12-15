var router = require('express').Router()
var PostControllers = require('../../controllers/PostControllers')
var Post = require('../../models/Post');
var nodemailer = require('nodemailer');

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
  	if (err || !post) {
  		return res.render('public/notfound')
  	}
  	return res.render('public/post', {
  		post: post
  	})
  })
  
})
router.get('/q', PostControllers.getAllPosts)
router.post('/sendmail', function (req,res,next) {
	var {userEmail, userName, userMessage, userPhone } = req.body;
	var transporter = nodemailer.createTransport('smtps://ngovanhuong21994%40gmail.com:anhhuong@smtp.gmail.com');

	const mailOptions = {
		from: userEmail,
		to: 'ngovanhuong21994@gmail.com',
		subject: 'Question from mail:'+ userEmail+' user Name: '+  userName +' with phone: '+ userPhone,
		html: `<p>${userMessage}</p>`
	}

	transporter.sendMail(mailOptions, (err, info) => {
		if (err) {
			return res.status(400).send({ message: 'An error occured trying to send mail'});
		} else {
			return res.status(200).send({ message: 'You sent a message'})
		}

	})
})

router.get('*', function (req,res) {
	res.render('public/notfound')
})

module.exports = router
