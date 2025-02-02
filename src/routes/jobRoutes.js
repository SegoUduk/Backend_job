const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const { validateJobId, validateAdmin } = require('../middlewares/jobMiddleware'); // Import middleware

// Log setiap request yang masuk
router.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Route untuk mendapatkan semua pekerjaan (dengan filter opsional)
router.get('/', jobController.getAllJobs);

// Route untuk menambahkan pekerjaan baru (User)
router.post('/', jobController.addJob);

// Route untuk mendapatkan detail pekerjaan berdasarkan ID
router.get('/:id', validateJobId, jobController.getJobById);

// Route untuk menyetujui pekerjaan (Admin)
router.put('/:id/approve', validateJobId, validateAdmin, jobController.approveJob);

// Route untuk memperbarui status pekerjaan (Admin)
router.put('/:id/status', validateJobId, validateAdmin, jobController.updateJobStatus);

// Route untuk menghapus pekerjaan (Admin)
router.delete('/:id', validateJobId, validateAdmin, jobController.deleteJob);

// Route untuk mendapatkan pekerjaan yang diunggah oleh pengguna tertentu
router.get('/uploaded', jobController.getUploadedJobs);

module.exports = router;