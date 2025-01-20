const db = require('../config/database');

// Fungsi untuk mendaftarkan pengguna
exports.registerUser = async (req, res) => {
  const { name, password, email, role, profile_picture } = req.body;

  try {
    const [result] = await db.query(
      'INSERT INTO users (name, password, email, role, profile_picture) VALUES (?, ?, ?, ?, ?)',
      [name, password, email, role, profile_picture]
    );

    console.log('Pengguna berhasil didaftarkan:', result); // Tambahkan logging untuk hasil query
    res.status(201).json({ message: 'Pengguna berhasil didaftarkan.', userId: result.insertId });
  } catch (err) {
    console.error('Error saat mendaftarkan pengguna:', err.message);
    res.status(500).json({ message: 'Gagal mendaftarkan pengguna.', error: err.message });
  }
};

// Fungsi untuk login pengguna
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const [results] = await db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful', user: results[0] });
  } catch (err) {
    console.error('Error logging in:', err.message);
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
};

// Fungsi untuk mendapatkan semua pengguna
exports.getAllUsers = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM users');

    res.status(200).json(results);
  } catch (err) {
    console.error('Error saat mengambil data pengguna:', err.message);
    res.status(500).json({ message: 'Gagal memuat data pengguna.', error: err.message });
  }
};

// Fungsi untuk memperbarui profil pengguna
exports.updateProfile = async (req, res) => {
  const { id } = req.params;
  const { name, email, role, profile_picture } = req.body;

  try {
    const [result] = await db.query(
      'UPDATE users SET name = ?, email = ?, role = ?, profile_picture = ? WHERE id = ?',
      [name, email, role, profile_picture, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
    }

    res.status(200).json({ message: 'Profil pengguna berhasil diperbarui.' });
  } catch (err) {
    console.error('Error saat memperbarui profil pengguna:', err.message);
    res.status(500).json({ message: 'Gagal memperbarui profil pengguna.', error: err.message });
  }
};

// Fungsi untuk menghapus pengguna
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
    }

    res.status(200).json({ message: 'Pengguna berhasil dihapus.' });
  } catch (err) {
    console.error('Error saat menghapus pengguna:', err.message);
    res.status(500).json({ message: 'Gagal menghapus pengguna.', error: err.message });
  }
};