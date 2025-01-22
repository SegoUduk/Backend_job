const db = require('../config/database'); // Pastikan path ini benar

const {
  getAllJobs,
  getJobById,
  addJob,
  updateJobStatus,
  deleteJob,
} = require('../models/jobModel');

// Mendapatkan semua pekerjaan (dengan filter opsional)
exports.getAllJobs = async (req, res) => {
  const { status } = req.query; // Parameter opsional untuk memfilter berdasarkan status

  try {
    const jobs = await getAllJobs(status);
    res.status(200).json({ message: 'Jobs fetched successfully', data: jobs });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ message: 'Error fetching jobs', error: error.message });
  }
};

// Mendapatkan detail pekerjaan berdasarkan ID
exports.getJobById = async (req, res) => {
  const jobId = req.params.id;

  try {
    const job = await getJobById(jobId);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json({ message: 'Job details fetched successfully', data: job });
  } catch (error) {
    console.error('Error fetching job details:', error);
    res.status(500).json({ message: 'Error fetching job details', error: error.message });
  }
};

// Menambahkan pekerjaan baru
exports.addJob = async (req, res) => {
  const { user_id, title, company, description, location, salary, work_system } = req.body;

  if (!user_id || !title || !company || !description || !location || !salary || !work_system) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (!['Full time', 'Freelance', 'Part time'].includes(work_system)) {
    return res.status(400).json({ message: 'Invalid work_system value' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO jobs (user_id, title, company, description, location, salary, work_system) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [user_id, title, company, description, location, salary, work_system]
    );
    res.status(201).json({ message: 'Job added successfully', jobId: result.insertId });
  } catch (error) {
    console.error('Error adding job:', error);
    res.status(500).json({ message: 'Error adding job', error: error.message });
  }
};

// Menyetujui pekerjaan (Admin)
exports.approveJob = async (req, res) => {
  const jobId = req.params.id;

  try {
    const updated = await updateJobStatus(jobId, 'approved');

    if (updated === 0) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json({ message: 'Job approved successfully' });
  } catch (error) {
    console.error('Error approving job:', error);
    res.status(500).json({ message: 'Error approving job', error: error.message });
  }
};

// Menolak pekerjaan (Admin)
exports.rejectJob = async (req, res) => {
  const jobId = req.params.id;

  try {
    const updated = await updateJobStatus(jobId, 'rejected');

    if (updated === 0) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json({ message: 'Job rejected successfully' });
  } catch (error) {
    console.error('Error rejecting job:', error);
    res.status(500).json({ message: 'Error rejecting job', error: error.message });
  }
};

// Fungsi lainnya...

// Mengubah status pekerjaan
exports.updateJobStatus = async (req, res) => {
  const jobId = req.params.id;
  const { status } = req.body;

  if (!['approved', 'rejected', 'pending'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    const updated = await updateJobStatus(jobId, status);

    if (updated === 0) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json({ message: 'Job status updated successfully' });
  } catch (error) {
    console.error('Error updating job status:', error);
    res.status(500).json({ message: 'Error updating job status', error: error.message });
  }
};

// Menghapus pekerjaan
exports.deleteJob = async (req, res) => {
  const jobId = req.params.id;

  try {
    const deleted = await deleteJob(jobId);

    if (deleted === 0) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ message: 'Error deleting job', error: error.message });
  }
};

// Perbaikan Login Controller untuk error 404
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await login(email, password); // Fungsi login dari model

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

// Fungsi untuk mendapatkan pekerjaan yang diunggah oleh pengguna tertentu
exports.getUploadedJobs = (req, res) => {
  const { userId } = req.query;

  db.query(
    'SELECT * FROM jobs WHERE user_id = ?',
    [userId],
    (err, results) => {
      if (err) {
        console.error('Error fetching uploaded jobs:', err);
        return res.status(500).json({ message: 'Error fetching uploaded jobs', error: err.message });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: 'No uploaded jobs found for this user' });
      }
      res.status(200).json({ message: 'Uploaded jobs fetched successfully', data: results });
    }
  );
};