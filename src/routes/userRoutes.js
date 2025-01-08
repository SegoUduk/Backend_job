const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route untuk mendapatkan semua pengguna (hanya untuk admin)
router.get('/users', (req, res) => {
  const { email } = req.query; // Gunakan query parameter untuk email admin
  userController.getAllUsers(req, res);
});

// Route untuk mendaftarkan pengguna baru
router.post('/register', (req, res) => {
  userController.registerUser(req, res);
});

// Route untuk login pengguna
router.post('/login', (req, res) => {
  userController.loginUser(req, res);
});

// Route untuk memperbarui profil pengguna
router.put('/users/:id', (req, res) => {
  userController.updateProfile(req, res);
});

// Route untuk menghapus pengguna (hanya untuk admin)
router.delete('/users/:id', (req, res) => {
  userController.deleteUser(req, res);
});

module.exports = router;
