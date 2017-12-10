var router = require('express').Router()
var passport = require('passport')

router.get('/', (req,res) => {
  res.render('admin/admin')
})

router.get('/login', (req,res) => {
  res.render('admin/login')
})

router.get('/add', (req,res) => {
  res.render('admin/add')
})

router.get('/all-post', (req,res) => {
  res.render('admin/allpost')
})

router.post('/login', passport.authenticate('local', {
	successRedirect: '/admin',
	failureRedirect: '/admin/login',
	failureFlash: true
}))
module.exports = router;
