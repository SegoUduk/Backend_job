const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost', // Sesuaikan dengan host Anda
  user: 'root', // Sesuaikan dengan user Anda
  password: '', // Sesuaikan dengan password Anda
  database: 'job_portal', // Sesuaikan dengan nama database Anda
  waitForConnections: true,
  connectionLimit: 10, // Atur limit koneksi pool
  queueLimit: 0, // Tidak ada batas antrian
});

module.exports = pool.promise();
