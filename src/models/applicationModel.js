const db = require('../config/database');

const Application = {
  getApplicationsByJob: (jobId) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM applications WHERE job_id = ?';
      db.query(query, [jobId], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },

  createApplication: (data) => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO applications (user_id, job_id, status, applied_at) 
        VALUES (?, ?, "pending", NOW())
      `;
      const values = [data.user_id, data.job_id];
      db.query(query, values, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },

  updateApplicationStatus: (id, status) => {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE applications SET status = ? WHERE id = ?';
      db.query(query, [status, id], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },
};

module.exports = Application;
