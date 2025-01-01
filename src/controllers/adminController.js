const db = require('../config/database');

// Mendapatkan semua pekerjaan dengan status "pending"
exports.getPendingJobs = (req, res) => {
  const query = 'SELECT * FROM jobs WHERE status = "pending"';

  db.query(query, (err, results) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ message: 'Gagal memuat data pekerjaan.' });
    }
    res.json(results);
  });
};

// Memperbarui status pekerjaan
exports.updateJobStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const query = 'UPDATE jobs SET status = ? WHERE id = ?';

  db.query(query, [status, id], (err, result) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ message: 'Gagal memperbarui status pekerjaan.' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Pekerjaan tidak ditemukan.' });
    }

    res.json({ message: 'Status pekerjaan berhasil diperbarui.' });
  });
};

// Menghapus pekerjaan oleh admin
exports.deleteJobAsAdmin = (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM jobs WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ message: 'Gagal menghapus pekerjaan.' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Pekerjaan tidak ditemukan.' });
    }

    res.json({ message: 'Pekerjaan berhasil dihapus.' });
  });
};
