const express = require('express');
const {
  getPendingJobs,
  updateJobStatus,
  deleteJobAsAdmin,
  approveJob,
  rejectJob,
} = require('../controllers/AdminController');

const router = express.Router();

// Mendapatkan semua pekerjaan dengan status "pending"
router.get('/pending-jobs', getPendingJobs);

// Memperbarui status pekerjaan
router.put('/jobs/:id/status', updateJobStatus);

// Menghapus pekerjaan oleh admin
router.delete('/jobs/:id', deleteJobAsAdmin);

// Menyetujui pekerjaan
router.put('/jobs/:id/approve', approveJob);

// Menolak pekerjaan
router.put('/jobs/:id/reject', rejectJob);

module.exports = router;
