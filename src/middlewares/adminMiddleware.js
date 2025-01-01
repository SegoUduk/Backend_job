const validateAdmin = (req, res, next) => {
    const { role } = req.user || {}; // Pastikan autentikasi sudah berjalan
    if (role !== 'admin') {
      return res.status(403).json({ message: 'Access forbidden: Admins only' });
    }
    next();
  };
  
  module.exports = { validateAdmin };
  