const { v4: uuidv4 } = require('uuid');
const User = require('../models/user');
const { setUser } = require('../service/auth');

async function handleUserSignUp(req, res) {
    const { name, email, password } = req.body;
    await User.create({ name, email, password });
    return res.redirect('/');
}

async function handleUserLogIn(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
        return res.render('login', {
            error: 'Invalid Email or Password'
        })
    }
    const sesssionId = uuidv4();
    setUser(sesssionId, user);
    res.cookie('uuid', sesssionId);
    return res.redirect('/');
}

module.exports = {
    handleUserSignUp,
    handleUserLogIn,

}