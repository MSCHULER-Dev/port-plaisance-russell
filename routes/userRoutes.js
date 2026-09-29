const express = require('express');
const router = express.Router();
const { login, logout, getUsers, createUser, deleteUser } = require('../controllers/userController');
const { protect } = require('../middlewares/auth');

// Routes publiques
router.post('/login', login);
router.get('/logout', logout);

// Routes protégées par jeton JWT
router.get('/users', protect, getUsers);
router.post('/users', protect, createUser);
router.delete('/users/:email', protect, deleteUser);

module.exports = router;