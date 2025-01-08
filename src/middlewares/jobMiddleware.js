// Middleware untuk validasi job ID dan admin role

// Validasi ID pekerjaan
const validateJobId = (req, res, next) => {
  const { id } = req.params;

  // Memastikan ID valid dan merupakan angka
  if (!id || isNaN(id)) {
    return res.status(400).json({ message: 'Invalid job ID. ID harus berupa angka.' });
  }

  next();
};

// Validasi admin role tanpa token
const validateAdmin = (req, res, next) => {
  const { email, role } = req.body; // Ambil email dan role dari body request

  // Pastikan email dan role ada
  if (!email || !role) {
    return res.status(400).json({ message: 'Email dan role harus disediakan.' });
  }

  // Cek apakah role adalah admin
  if (role !== 'admin') {
    return res.status(403).json({ message: 'Akses ditolak: hanya untuk admin.' });
  }

  next();
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
