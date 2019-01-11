/** Put user model here */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
    },
    password: {
        type: String,
        select: false,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    nameList: {
        type: Array,
    },
});

// Must use function here! ES6 => functions do not bind this!
UserSchema.pre('save', function (next) {
    // Set createdAt and updatedAt
    const now = new Date();
    this.updatedAt = now;
    if (!this.createdAt) {
        this.createdAt = now;
    }

    // Encrypt Password
    const user = this;
    if (!user.isModified ('password')) {
        return next ();
    }
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            user.password = hash;
            next();
        });
    });
});

// Need to use function to enable this.password
UserSchema.methods.comparePassword = function(password, done) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        done(err, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
