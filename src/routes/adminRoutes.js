const express = require('express');
const { approveJob, rejectJob } = require('../controllers/jobController');
const { validateAdmin } = require('../middlewares/adminMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Menyetujui pekerjaan
router.put('/jobs/:id/approve', authMiddleware, validateAdmin, approveJob);

// Menolak pekerjaan
router.put('/jobs/:id/reject', authMiddleware, validateAdmin, rejectJob);

module.exports = router;
