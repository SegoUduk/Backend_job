const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route untuk login pengguna
router.post('/login', userController.loginUser);

// Route untuk mendapatkan semua pengguna (hanya untuk admin)
router.get('/', userController.getAllUsers);

// Route untuk mendaftarkan pengguna baru
router.post('/register', userController.registerUser);

// Route untuk memperbarui profil pengguna
router.put('/:id', userController.updateProfile);

// Route untuk menghapus pengguna (hanya untuk admin)
router.delete('/:id', userController.deleteUser);

module.exports = router;