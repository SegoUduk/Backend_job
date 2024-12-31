const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
const db = require('./src/config/database');
db.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1); // Exit the application if the database fails to connect
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

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/notifications', notificationRoutes);

// Health Check Route
app.get('/', (req, res) => {
  res.send('Welcome to the Job Portal API!');
});

// 404 Not Found Middleware
app.use((req, res, next) => {
  res.status(404).json({
    message: 'Endpoint not found',
  });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong on the server!',
    error: err.message,
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
