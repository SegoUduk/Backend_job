const db = require('../config/database');

const Job = {
  getAllJobs: () => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM jobs WHERE status = "approved"';
      db.query(query, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },

  getJobById: (id) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM jobs WHERE id = ?';
      db.query(query, [id], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  },

  createJob: (data) => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO jobs (user_id, title, company, location, salary, description, status, created_at) 
        VALUES (?, ?, ?, ?, ?, ?, "pending", NOW())
      `;
      const values = [data.user_id, data.title, data.company, data.location, data.salary, data.description];
      db.query(query, values, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },

  updateJobStatus: (id, status) => {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE jobs SET status = ? WHERE id = ?';
      db.query(query, [status, id], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },
};

module.exports = Job;
