const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// Get all notifications for a specific user
router.get('/user/:userId', notificationController.getNotificationsByUser);

// Create a new notification
router.post('/', notificationController.createNotification);

// Mark a notification as read
router.put('/:id/read', notificationController.markAsRead);

module.exports = router;
