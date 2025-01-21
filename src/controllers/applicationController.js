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

// Membuat aplikasi baru untuk pekerjaan
exports.createApplication = async (req, res) => {
  const { job_id, user_id, resume, cover_letter } = req.body;

  if (!job_id || !user_id || !resume || !cover_letter) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO applications (job_id, user_id, resume, cover_letter) VALUES (?, ?, ?, ?)',
      [job_id, user_id, resume, cover_letter]
    );
    res.status(201).json({ message: 'Application created successfully', applicationId: result.insertId });
  } catch (error) {
    console.error('Error creating application:', error);
    res.status(500).json({ message: 'Error creating application', error: error.message });
  }
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
