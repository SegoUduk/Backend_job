const db = require('../config/database');

// Middleware untuk memvalidasi ID pekerjaan
exports.validateJobId = async (req, res, next) => {
  const jobId = req.params.id;

  try {
    const [results] = await db.query('SELECT * FROM jobs WHERE id = ?', [jobId]);

    if (results.length === 0) {
      return res.status(404).json({ message: 'Job not found' });
    }

    next();
  } catch (error) {
    console.error('Error validating job ID:', error);
    res.status(500).json({ message: 'Error validating job ID', error: error.message });
  }
};

// Middleware untuk memvalidasi admin
exports.validateAdmin = (req, res, next) => {
  const { email } = req.body;

  // Misalnya, validasi email admin
  if (email !== 'aji@example.com') {
    return res.status(403).json({ message: 'Access denied' });
  }

  next();
};