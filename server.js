var express = require("express");
var app = express()

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");



app.get('/', (req, res) => {
    res.render('index')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/post', (req, res) => {
    res.render('post')
})

app.get('/contact', (req, res) => {
    res.render('contact')
})
app.get('/admin', (req, res) => {
    res.render('admin')
})
app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/admin/add', (req, res) => {
    res.render('add')
})

app.get('/admin/all-post', (req, res) => {
    res.render('allpost')
})



app.listen(8080, () => console.log("Server is running"))