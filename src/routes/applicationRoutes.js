const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');

// Route untuk membuat aplikasi baru
router.post('/', applicationController.createApplication);

// Route untuk mendapatkan aplikasi berdasarkan ID pekerjaan
router.get('/job/:jobId', applicationController.getApplicationsByJob);

// Route untuk memperbarui status aplikasi pekerjaan
router.put('/:id/status', applicationController.updateApplicationStatus);

module.exports = router;