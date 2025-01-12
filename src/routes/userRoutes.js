const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route untuk mendapatkan semua pengguna (hanya untuk admin)
router.get('/', (req, res) => {
  const { email } = req.query; // Gunakan query parameter untuk email admin
  if (!email) {
    return res.status(400).json({ message: 'Email admin diperlukan untuk mengakses data pengguna.' });
  }
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
router.put('/:id', (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: 'ID pengguna diperlukan untuk memperbarui profil.' });
  }
  userController.updateProfile(req, res);
});

// Route untuk menghapus pengguna (hanya untuk admin)
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const { email } = req.body; // Admin email dikirim dalam body
  if (!email || !id) {
    return res.status(400).json({ message: 'Email admin dan ID pengguna diperlukan untuk menghapus pengguna.' });
  }
  userController.deleteUser(req, res);
});

module.exports = router;
