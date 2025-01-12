const db = require('../config/database');

// Mendapatkan semua pekerjaan dengan status "pending"
exports.getPendingJobs = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM jobs WHERE status = "pending"');

    if (results.length === 0) {
      return res.status(404).json({ message: 'Tidak ada pekerjaan dengan status pending.' });
    }

    res.status(200).json(results);
  } catch (err) {
    console.error('Error saat mengambil pekerjaan dengan status pending:', err.message);
    res.status(500).json({ message: 'Gagal memuat data pekerjaan.', error: err.message });
  }
};

// Memperbarui status pekerjaan
exports.updateJobStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['approved', 'rejected', 'pending'].includes(status)) {
    return res.status(400).json({ message: 'Status tidak valid. Gunakan "approved", "rejected", atau "pending".' });
  }

  try {
    const [result] = await db.query('UPDATE jobs SET status = ? WHERE id = ?', [status, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Pekerjaan tidak ditemukan.' });
    }

    res.status(200).json({ message: `Status pekerjaan berhasil diperbarui menjadi "${status}".` });
  } catch (err) {
    console.error('Error saat memperbarui status pekerjaan:', err.message);
    res.status(500).json({ message: 'Gagal memperbarui status pekerjaan.', error: err.message });
  }
};

// Menyetujui pekerjaan
exports.approveJob = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('UPDATE jobs SET status = "approved" WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Pekerjaan tidak ditemukan.' });
    }

    res.status(200).json({ message: 'Pekerjaan berhasil disetujui.' });
  } catch (err) {
    console.error('Error saat menyetujui pekerjaan:', err.message);
    res.status(500).json({ message: 'Gagal menyetujui pekerjaan.', error: err.message });
  }
};

// Menolak pekerjaan
exports.rejectJob = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('UPDATE jobs SET status = "rejected" WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Pekerjaan tidak ditemukan.' });
    }

    res.status(200).json({ message: 'Pekerjaan berhasil ditolak.' });
  } catch (err) {
    console.error('Error saat menolak pekerjaan:', err.message);
    res.status(500).json({ message: 'Gagal menolak pekerjaan.', error: err.message });
  }
};

// Menghapus pekerjaan oleh admin
exports.deleteJobAsAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM jobs WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Pekerjaan tidak ditemukan.' });
    }

    res.status(200).json({ message: 'Pekerjaan berhasil dihapus.' });
  } catch (err) {
    console.error('Error saat menghapus pekerjaan:', err.message);
    res.status(500).json({ message: 'Gagal menghapus pekerjaan.', error: err.message });
  }
};
