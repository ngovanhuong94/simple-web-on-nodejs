var router = require('express').Router()


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
module.exports = router;
