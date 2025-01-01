const validateJobId = (req, res, next) => {
    const { id } = req.params;
    if (!id || isNaN(id)) {
      return res.status(400).json({ message: 'Invalid job ID.' });
    }
    next();
  };
  
  const validateAdmin = (req, res, next) => {
    const { role } = req.user || {}; // Anda harus memiliki middleware autentikasi sebelumnya
    if (role !== 'admin') {
      return res.status(403).json({ message: 'Access forbidden: Admins only.' });
    }
    next();
  };
  
  module.exports = { validateJobId, validateAdmin };
  