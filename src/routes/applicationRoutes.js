const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');

router.get('/job/:jobId', applicationController.getApplicationsByJob);
router.post('/', applicationController.createApplication);
router.put('/:id/status', applicationController.updateApplicationStatus);

module.exports = router;
