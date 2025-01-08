const express = require('express');
const { approveJob, rejectJob } = require('../controllers/jobController');

const router = express.Router();

// Menyetujui pekerjaan
router.put('/jobs/:id/approve', approveJob);

// Menolak pekerjaan
router.put('/jobs/:id/reject', rejectJob);

module.exports = router;
