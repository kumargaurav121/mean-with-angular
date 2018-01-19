var mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

mongoose.Promise = global.Promise;

var Schema = mongoose.Schema;

var userSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, minlength: 6, maxlength: 30 },
    username: { type: String, required: true, unique: true, lowercase: true, trim: true, minlength: 2, maxlength: 30 },
    password: { type: String, required: true, trim: true, minlength: 4 }
});


userSchema.pre('save', function(next) {
    if(!this.isModified('password')) return next();

    bcrypt.hash(this.password, null, null, (err, hash) => {
        // Store hash in your password DB.
        if(err) return next(err);
        console.log(hash);
        this.password = hash;
        console.log(this.password);
        next();
    });
});

userSchema.methods.comparePasswords = (password) => {
    return bcrypt.compareSync(password, this.password);
}



module.exports = mongoose.model('Blog', userSchema);