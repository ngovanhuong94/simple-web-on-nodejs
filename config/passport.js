var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var User  = require('../models/User')



passport.serializeUser(function (user, done){
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user)
  })
})


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function (req, email, password, done) {
    User.findOne({ email: email}, function (err, user) {
      if (er) return done(err)
      if (!user) return done(null, false, {message: 'email or password was invalid'})
      var validPassword = user.comparePassword(password);
      if (validPassword) return done(null, user);
      return done(null, false, {message: 'email or password was invalid'})
    })
}))
