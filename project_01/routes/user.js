const express = require('express');

const { handleGetAllUsers, handleGetUserById, handleCreateUser, handleUpdateUserById, handleDeleteUserById } = require('../controllers/user');

const router = express.Router();

router.get('/', handleGetAllUsers);

router.get('/:id', handleGetUserById);

router.post('/', handleCreateUser);

router.patch('/:id', handleUpdateUserById);

router.delete('/:id', handleDeleteUserById);

module.exports = router;