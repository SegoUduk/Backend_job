const db = require('../config/database');

const User = {
  getAllUsers: () => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users';
      db.query(query, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },

  getUserById: (id) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users WHERE id = ?';
      db.query(query, [id], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  },

  createUser: (data) => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO users (name, email, password, profile_picture, role) 
        VALUES (?, ?, ?, ?, ?)
      `;
      const values = [data.name, data.email, data.password, data.profile_picture, data.role];
      db.query(query, values, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },

  updateUser: (id, data) => {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE users 
        SET name = ?, email = ?, profile_picture = ?, role = ? 
        WHERE id = ?
      `;
      const values = [data.name, data.email, data.profile_picture, data.role, id];
      db.query(query, values, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },

  deleteUser: (id) => {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM users WHERE id = ?';
      db.query(query, [id], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },
};

module.exports = User;
