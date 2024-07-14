const JWT = require('jsonwebtoken');
const salt = '@C1212ic1#@Gr1stie#';

function createTokenForUser(user) {
    const playload = {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        profilePhoto: user.profilePhoto,
    }
    const token = JWT.sign(playload, salt);
    return token;
}

function validateToken(token) {
    const payload = JWT.verify(token, salt);
    return payload;
}

module.exports = {
    createTokenForUser,
    validateToken,
}