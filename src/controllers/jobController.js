const db = require('../config/database');

// Get all approved jobs
exports.getAllJobs = (req, res) => {
  db.query('SELECT * FROM jobs WHERE status = "approved"', (err, results) => {
    if (err) {
      console.error('Error fetching jobs:', err);
      return res.status(500).json({ message: 'Error fetching jobs', error: err.message });
    }
    res.status(200).json({ message: 'Jobs fetched successfully', data: results });
  });
};

// Get job details by ID
exports.getJobById = (req, res) => {
  const jobId = req.params.id;

  db.query('SELECT * FROM jobs WHERE id = ?', [jobId], (err, results) => {
    if (err) {
      console.error('Error fetching job details:', err);
      return res.status(500).json({ message: 'Error fetching job details', error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json({ message: 'Job details fetched successfully', data: results[0] });
  });
};

// Add a new job
exports.addJob = (req, res) => {
  const { user_id, title, company, description, location, salary, work_system } = req.body;

  if (!user_id || !title || !company || !description || !location || !salary || !work_system) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (!['Full time', 'Freelance', 'Part time'].includes(work_system)) {
    return res.status(400).json({ message: 'Invalid work_system value' });
  }

  db.query(
    'INSERT INTO jobs (user_id, title, company, description, location, salary, work_system, status) VALUES (?, ?, ?, ?, ?, ?, ?, "pending")',
    [user_id, title, company, description, location, salary, work_system],
    (err, result) => {
      if (err) {
        console.error('Error adding job:', err);
        return res.status(500).json({ message: 'Error adding job', error: err.message });
      }
      res.status(201).json({ message: 'Job added successfully', jobId: result.insertId });
    }
  );
};

// Approve a job (Admin)
exports.approveJob = (req, res) => {
  const jobId = req.params.id;

  db.query('UPDATE jobs SET status = "approved" WHERE id = ?', [jobId], (err, result) => {
    if (err) {
      console.error('Error approving job:', err);
      return res.status(500).json({ message: 'Error approving job', error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json({ message: 'Job approved successfully' });
  });
};

// Update job status (e.g., approved/rejected) (Admin)
exports.updateJobStatus = (req, res) => {
  const jobId = req.params.id;
  const { status } = req.body;

  if (!['approved', 'rejected', 'pending'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  db.query('UPDATE jobs SET status = ? WHERE id = ?', [status, jobId], (err, result) => {
    if (err) {
      console.error('Error updating job status:', err);
      return res.status(500).json({ message: 'Error updating job status', error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json({ message: 'Job status updated successfully' });
  });
};

// Delete a job
exports.deleteJob = (req, res) => {
  const jobId = req.params.id;

  db.query('DELETE FROM jobs WHERE id = ?', [jobId], (err, result) => {
    if (err) {
      console.error('Error deleting job:', err);
      return res.status(500).json({ message: 'Error deleting job', error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json({ message: 'Job deleted successfully' });
  });
};
