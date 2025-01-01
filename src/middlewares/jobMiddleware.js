// Middleware untuk validasi job ID dan admin role
const jwt = require('jsonwebtoken'); // Pastikan Anda menggunakan JSON Web Token untuk otentikasi

// Validasi ID pekerjaan
const validateJobId = (req, res, next) => {
  const { id } = req.params;

  // Memastikan ID valid dan merupakan angka
  if (!id || isNaN(id)) {
    return res.status(400).json({ message: 'Invalid job ID. ID harus berupa angka.' });
  }

  next();
};

// Validasi admin role
const validateAdmin = (req, res, next) => {
  // Pastikan token tersedia dari header Authorization
  const token = req.headers.authorization?.split(' ')[1]; // Mengambil token dari "Bearer {token}"

  if (!token) {
    return res.status(401).json({ message: 'Token tidak ditemukan. Harap login sebagai admin.' });
  }

  try {
    // Verifikasi token menggunakan secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
    req.user = decoded; // Menyimpan data pengguna di req.user untuk digunakan selanjutnya

    // Cek apakah peran adalah admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Akses ditolak: hanya untuk admin.' });
    }

    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token tidak valid atau sudah kedaluwarsa.' });
  }
};

// Middleware tambahan untuk validasi status pekerjaan (jika diperlukan)
const validateJobStatus = (req, res, next) => {
  const { status } = req.body;

  // Memeriksa apakah status valid
  const validStatuses = ['pending', 'approved', 'rejected'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: `Status tidak valid. Status yang diperbolehkan: ${validStatuses.join(', ')}.` });
  }

  next();
};

module.exports = { validateJobId, validateAdmin, validateJobStatus };
