require('dotenv').config()

var express = require("express");
var bodyParser = require('body-parser')
var session = require('express-session')
var passport = require('passport')
var mongoose = require('mongoose')
var flash = require('connect-flash')
var MongoStore = require('connect-mongo')(session)
var cookieParser = require('cookie-parser')
// setup mongoose and passport

require('./config/mongoose');
require('./config/passport');

// setup express Server
var app = express()

// setup template and views folder
app.set("view engine", "ejs");
app.set("views", "./views");
// setup static files
app.use('/static', express.static("public"));

// setup middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({ mongooseConnection: mongoose.connection})
}))

app.use(flash())
app.use(passport.initialize())
app.use(passport.session())


// routes
var adminRoutes = require('./routes/admin')
var publicRoutes = require('./routes/public')

app.use('/', publicRoutes)
app.use('/admin', adminRoutes)




// run server on port
app.listen(process.env.PORT || 8080, () => console.log("Server is running"))
