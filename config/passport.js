var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var User  = require('../models/User')



passport.serializeUser(function (user, done){
  done(null, user._id)
})

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user)
  })
})


passport.use(new LocalStrategy({
     usernameField: 'email'
   },
  function(email, password, done) {
    User.findOne({ email: email}, function (err, user) {
      if (err) return done(err)
      if (!user) return done(null, false, {message: 'email or password was incorrected'})
      if (!user.comparePassword) return done(null, false, {message: 'email or password was incorrected'})
      return done(null, user)
    })
  }
));
