const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to fetch all users
router.get('/', userController.getAllUsers);

// Route to register a new user
router.post('/register', userController.registerUser);

// Route for user login
router.post('/login', userController.loginUser);

// Route to update user profile
router.put('/:id', userController.updateProfile);

// Route to delete a user
router.delete('/:id', userController.deleteUser);

module.exports = router;
