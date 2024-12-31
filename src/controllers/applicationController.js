const db = require('../config/database');

// Get applications by job ID
exports.getApplicationsByJob = (req, res) => {
  const { jobId } = req.params;

  db.query(
    'SELECT a.id, a.user_id, u.name AS user_name, u.email, a.status, a.created_at ' +
      'FROM applications a JOIN users u ON a.user_id = u.id WHERE a.job_id = ?',
    [jobId],
    (err, results) => {
      if (err) {
        console.error('Error fetching applications for job:', err);
        return res.status(500).json({ message: 'Error fetching applications', error: err.message });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: 'No applications found for this job' });
      }
      res.status(200).json({ message: 'Applications fetched successfully', data: results });
    }
  );
};

// Create a new application
exports.createApplication = (req, res) => {
  const { user_id, job_id, status } = req.body;

  if (!user_id || !job_id) {
    return res.status(400).json({ message: 'User ID and Job ID are required' });
  }

  const applicationStatus = status || 'pending'; // Default status is "pending"

  db.query(
    'INSERT INTO applications (user_id, job_id, status) VALUES (?, ?, ?)',
    [user_id, job_id, applicationStatus],
    (err, result) => {
      if (err) {
        console.error('Error creating application:', err);
        return res.status(500).json({ message: 'Error creating application', error: err.message });
      }
      res.status(201).json({ message: 'Application created successfully', applicationId: result.insertId });
    }
  );
};

// Update the status of an application
exports.updateApplicationStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['pending', 'approved', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  db.query(
    'UPDATE applications SET status = ? WHERE id = ?',
    [status, id],
    (err, result) => {
      if (err) {
        console.error('Error updating application status:', err);
        return res.status(500).json({ message: 'Error updating application status', error: err.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Application not found' });
      }
      res.status(200).json({ message: 'Application status updated successfully' });
    }
  );
};
