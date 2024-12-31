const db = require('../config/database');

// Get all users
exports.getAllUsers = (req, res) => {
  db.query('SELECT id, name, email, profile_picture, role FROM users', (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).json({ message: 'Error fetching users', error: err.message });
    }
    res.status(200).json({ message: 'Users fetched successfully', data: results });
  });
};

// Register a new user
exports.registerUser = (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required' });
  }
  db.query(
    'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
    [name, email, password, role || 'user'],
    (err, result) => {
      if (err) {
        console.error('Error registering user:', err);
        return res.status(500).json({ message: 'Error registering user', error: err.message });
      }
      res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
    }
  );
};

// Login user
exports.loginUser = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  db.query(
    'SELECT id, name, email, role FROM users WHERE email = ? AND password = ?',
    [email, password],
    (err, results) => {
      if (err) {
        console.error('Error logging in:', err);
        return res.status(500).json({ message: 'Error logging in', error: err.message });
      }
      if (results.length === 0) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      res.status(200).json({ message: 'Login successful', user: results[0] });
    }
  );
};

// Update user profile
exports.updateProfile = (req, res) => {
  const { name, profile_picture } = req.body;
  const userId = req.params.id;

  if (!name && !profile_picture) {
    return res.status(400).json({ message: 'At least one field (name or profile_picture) is required' });
  }

  const updateFields = [];
  const values = [];

  if (name) {
    updateFields.push('name = ?');
    values.push(name);
  }
  if (profile_picture) {
    updateFields.push('profile_picture = ?');
    values.push(profile_picture);
  }
  values.push(userId);

  const query = `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`;

  db.query(query, values, (err) => {
    if (err) {
      console.error('Error updating profile:', err);
      return res.status(500).json({ message: 'Error updating profile', error: err.message });
    }
    res.status(200).json({ message: 'Profile updated successfully' });
  });
};

// Delete user
exports.deleteUser = (req, res) => {
  const userId = req.params.id;

  db.query('DELETE FROM users WHERE id = ?', [userId], (err) => {
    if (err) {
      console.error('Error deleting user:', err);
      return res.status(500).json({ message: 'Error deleting user', error: err.message });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  });
};
