const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

// Route to fetch all approved jobs
router.get('/', jobController.getAllJobs);

// Route to fetch job details by ID
router.get('/:id', jobController.getJobById);

// Route to add a new job (User)
router.post('/', jobController.addJob);

// Route to approve a job (Admin)
router.put('/:id/approve', jobController.approveJob);

// Route to update job status (e.g., approved, rejected, pending) (Admin)
router.put('/:id/status', jobController.updateJobStatus);

// Route to delete a job
router.delete('/:id', jobController.deleteJob);

module.exports = router;
