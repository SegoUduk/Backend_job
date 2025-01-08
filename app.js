const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const db = require('./src/config/database');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Database Connection
db.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  }
  if (connection) {
    connection.release();
    console.log('Database connected successfully.');
  }
});

// Import Routes
const userRoutes = require('./src/routes/userRoutes');
const jobRoutes = require('./src/routes/jobRoutes');
const applicationRoutes = require('./src/routes/applicationRoutes');
const notificationRoutes = require('./src/routes/notificationRoutes');
const adminRoutes = require('./src/routes/adminRoutes');

// API Routes
app.use('/api/users', userRoutes); // Routes for user-related operations
app.use('/api/jobs', jobRoutes); // Routes for job-related operations
app.use('/api/applications', applicationRoutes); // Routes for job applications
app.use('/api/notifications', notificationRoutes); // Routes for user notifications
app.use('/api/admin', adminRoutes); // Admin routes for managing jobs, etc.

// Health Check Route
app.get('/', (req, res) => {
  res.send('Welcome to the Job Portal API!');
});

// Catch-all 404 Middleware
app.use((req, res, next) => {
  console.warn(`404 Not Found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ message: 'Endpoint not found' });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong on the server!', error: err.message });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
