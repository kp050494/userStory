var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UsrerSchema = new Schema({
	
	name: String,
	username: { type: String , required: true , index: {unique: true}},
	password: { type: String , required: true, select: true}
});


UsrerSchema.pre('save', function(next){
	var user = this;
	
	if(!user.isModified('password')) return next();
	bcrypt.hash(user.password, null, null, function(err ,hash){
		if(err) return next(err);

		user.password = hash;
		next();
	});

});

UsrerSchema.methods.comparedPassword = function(password){
	var user = this;
	return bcrypt.compareSync(password, user.password);
}


module.exports = mongoose.model('User' , UsrerSchema);