const bcrypt = require('bcrypt');
const db = require('../config/database');

// Mendaftarkan pengguna baru
exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Semua field wajib diisi.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password
    const query = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';

    db.query(query, [name, email, hashedPassword, role || 'user'], (err, result) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ message: 'Gagal mendaftarkan pengguna.' });
      }

      res.status(201).json({ message: 'Pengguna berhasil didaftarkan.', userId: result.insertId });
    });
  } catch (error) {
    console.error('Error hashing password:', error.message);
    res.status(500).json({ message: 'Terjadi kesalahan saat mendaftarkan pengguna.' });
  }
};

// Login pengguna
exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email dan password wajib diisi.' });
  }

  const query = 'SELECT * FROM users WHERE email = ?';

  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ message: 'Gagal melakukan login.' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Email tidak ditemukan.' });
    }

    const user = results[0];

    // Verifikasi password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Password salah.' });
    }

    res.json({ message: 'Login berhasil.', user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  });
};
