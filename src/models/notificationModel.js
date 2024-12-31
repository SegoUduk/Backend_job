const db = require('../config/database');

const Notification = {
  getNotificationsByUser: (userId) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC';
      db.query(query, [userId], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },

  createNotification: (data) => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO notifications (user_id, message, is_read, created_at) 
        VALUES (?, ?, 0, NOW())
      `;
      const values = [data.user_id, data.message];
      db.query(query, values, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },

  markAsRead: (id) => {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE notifications SET is_read = 1 WHERE id = ?';
      db.query(query, [id], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },
};

module.exports = Notification;
