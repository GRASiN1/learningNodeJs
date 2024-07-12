const jwt = require('jsonwebtoken');
const salt = 'zxcvbnmqwertyuiopasdfghjkl7413698520)(*&!@#$%^';

function setUser(user) {
    return jwt.sign({
        _id: user._id,
        email: user.email,
        role: user.role,
    }, salt);
}

function getUser(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, salt);
    }
    catch (err) {
        return null;
    }
}

module.exports = {
    setUser,
    getUser,
}