var router = require('express').Router()


router.get('/', (req,res) => {
  res.render('public/index')
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

module.exports = router
