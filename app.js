const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const db = require('./src/config/database');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(helmet()); // Enhance security with HTTP headers
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(morgan('dev')); // Log HTTP requests
app.use(express.static(path.join(__dirname, 'public')));

// Database Connection
db.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1); // Exit process if connection fails
  }
  if (connection) {
    connection.release();
    console.log('Database connected successfully.');
  }
});

// Import Routes
const userRoutes = require('./src/routes/userRoutes');
const adminRoutes = require('./src/routes/adminRoutes');

// API Routes
app.use('/api/users', userRoutes); // Routes for user-related operations
app.use('/api/admin', adminRoutes); // Routes for admin-related operations

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
  res.status(500).json({
    message: 'Something went wrong on the server!',
    error: err.message,
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
