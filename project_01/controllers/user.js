const User = require('../models/user');

async function handleGetAllUsers(req, res) {
    const users = await User.find({});
    res.status(200).json(users);
}

async function handleGetUserById(req, res) {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(400).json({ status: "User not found" });
    return res.status(200), json(user);
}

async function handleCreateUser(req, res) {
    const body = req.body;
    if (!body || !body.first_name || !body.last_name || !body.email || !body.gender) {
        return res.status(400).json({ status: "All fields are required" });
    }
    const newUser = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender
    })
    return res.status(201).json({ status: "User created" });
}

async function handleUpdateUserById(req, res) {
    const user = await User.findByIdAndUpdate({ _id: req.params.id }, { lastName: "changed" });
    return res.status(202).json({ status: "User updated" });
}

async function handleDeleteUserById(req, res) {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({ status: "User deleted" });
}

module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleCreateUser,
    handleUpdateUserById,
    handleDeleteUserById
}