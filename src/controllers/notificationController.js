const db = require('../config/database');

// Ambil semua notifikasi untuk user
exports.getNotificationsByUser = (req, res) => {
  const { userId } = req.params;

  db.query(
    'SELECT id, user_id, title, message, is_read, created_at FROM notifications WHERE user_id = ? ORDER BY created_at DESC',
    [userId],
    (err, results) => {
      if (err) {
        console.error('Error fetching notifications:', err);
        return res.status(500).json({ message: 'Error fetching notifications', error: err.message });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: 'No notifications found for this user' });
      }
      res.status(200).json({ message: 'Notifications fetched successfully', data: results });
    }
  );
};

// Tambah notifikasi baru
exports.createNotification = (req, res) => {
  const { user_id, title, message } = req.body;

  if (!user_id || !title || !message) {
    return res.status(400).json({ message: 'User ID, title, and message are required' });
  }

  db.query(
    'INSERT INTO notifications (user_id, title, message, is_read, created_at) VALUES (?, ?, ?, 0, NOW())',
    [user_id, title, message],
    (err, result) => {
      if (err) {
        console.error('Error creating notification:', err);
        return res.status(500).json({ message: 'Error creating notification', error: err.message });
      }
      res.status(201).json({ message: 'Notification created successfully', notificationId: result.insertId });
    }
  );
};

// Tandai notifikasi sebagai telah dibaca
exports.markAsRead = (req, res) => {
  const { id } = req.params;

  db.query(
    'UPDATE notifications SET is_read = 1 WHERE id = ?',
    [id],
    (err, result) => {
      if (err) {
        console.error('Error marking notification as read:', err);
        return res.status(500).json({ message: 'Error updating notification status', error: err.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Notification not found' });
      }
      res.status(200).json({ message: 'Notification marked as read successfully' });
    }
  );
};
