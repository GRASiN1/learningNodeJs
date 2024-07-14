const { Schema, model } = require('mongoose');
const { createHmac, randomBytes } = require('crypto');
const { createTokenForUser } = require('../services/auth');

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    profilePhoto: {
        type: String,
        default: '/images/defaultProfilePic.jpg'
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER',
    }
}, { timestamps: true });

userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) return;
    const salt = randomBytes(16).toString();
    const hashedPassowrd = createHmac('sha256', salt).update(user.password).digest('hex');

    this.salt = salt;
    this.password = hashedPassowrd;
    next();
})

userSchema.static('matchPasswordAndGenerateToken', async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error('User not found');
    const salt = user.salt;
    const hashedPassowrd = user.password;
    const userProvidedPassword = createHmac('sha256', salt).update(password).digest('hex');
    if (hashedPassowrd !== userProvidedPassword) throw new Error('Invalid password');
    const token = createTokenForUser(user);
    return token;
})

const User = model('users', userSchema);

module.exports = User;