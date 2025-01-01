const db = require('../config/database');

// Mendapatkan semua pekerjaan (dengan filter opsional berdasarkan status)
const getAllJobs = async (status) => {
  let query = 'SELECT * FROM jobs';
  const params = [];

  if (status) {
    query += ' WHERE status = ?';
    params.push(status);
  }

  const [rows] = await db.query(query, params);
  return rows;
};

// Mendapatkan detail pekerjaan berdasarkan ID
const getJobById = async (jobId) => {
  const [rows] = await db.query('SELECT * FROM jobs WHERE id = ?', [jobId]);
  return rows[0];
};

// Menambahkan pekerjaan baru
const addJob = async (jobData) => {
  const { user_id, title, company, description, location, salary, work_system } = jobData;

  const [result] = await db.query(
    'INSERT INTO jobs (user_id, title, company, description, location, salary, work_system, status) VALUES (?, ?, ?, ?, ?, ?, ?, "pending")',
    [user_id, title, company, description, location, salary, work_system]
  );

  return result.insertId;
};

// Mengubah status pekerjaan berdasarkan ID
const updateJobStatus = async (jobId, status) => {
  const [result] = await db.query('UPDATE jobs SET status = ? WHERE id = ?', [status, jobId]);
  return result.affectedRows;
};

// Menghapus pekerjaan berdasarkan ID
const deleteJob = async (jobId) => {
  const [result] = await db.query('DELETE FROM jobs WHERE id = ?', [jobId]);
  return result.affectedRows;
};

module.exports = {
  getAllJobs,
  getJobById,
  addJob,
  updateJobStatus,
  deleteJob,
};
