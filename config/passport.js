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
     usernameField: 'email',
     passReqToCallback: true
   },
  function(req, email, password, done) {
    User.findOne({ email: email}, function (err, user) {
      if (err) return done(err);
      if (!user)  return done(null, false,req.flash('message','Invalid email or password'));
      if (!user.comparePassword) return done(null, false,req.flash('message','Invalid email or password' ));
      return done(null, user);
    })
  }
));
