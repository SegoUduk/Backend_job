const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const { validateJobId, validateAdmin } = require('../middlewares/jobMiddleware'); // Import middleware

// Log setiap request yang masuk
router.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Route untuk mendapatkan semua pekerjaan yang telah disetujui
router.get('/', jobController.getAllJobs);

router.post('/jobs', jobController.addJob)

// Route untuk mendapatkan detail pekerjaan berdasarkan ID
router.get('/:id', validateJobId, jobController.getJobById);

// Route untuk menambahkan pekerjaan baru (User)
router.post('/', jobController.addJob);

// Route untuk menyetujui pekerjaan (Admin)
router.put('/:id/approve', validateJobId, validateAdmin, jobController.approveJob);

// Route untuk memperbarui status pekerjaan (Admin)
router.put('/:id/status', validateJobId, validateAdmin, jobController.updateJobStatus);

// Route untuk menghapus pekerjaan (Admin)
router.delete('/:id', validateJobId, validateAdmin, jobController.deleteJob);

module.exports = router;
