/*
model User
  - name
  - email (will have validate)
  - password (will have validate , length 6-32 symbols)
*/

var mongoose = require('mongoose')
var bcrypt = require('bcryptjs')


var UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
		trim: true
	}
})

/*
  pre('save') - this is a function in mongoose, 
                 before user save in database , run this function
                here ,we hash password  
*/
UserSchema.pre('save', function (next) {
	var user = this

	if (!user.isModified('password')) return next()

	bcrypt.genSalt(10, function (err, salt) {
		if (err) return next(err)
		bcrypt.hash(user.password, salt, function (err, hash) {
			if (err) return next(err)
			user.password = hash
			next()
		})
	})
})
/*
 add method to user model, compare password (fontend) with hash
*/
UserSchema.methods.comparePassword = function (password) {
	bcrypt.compare(password, this.password, function (err, isMatch) {
		if (err) return null;
		if (!isMatch) return false;
		return true
	})
}

module.exports = mongoose.model('User', UserSchema)