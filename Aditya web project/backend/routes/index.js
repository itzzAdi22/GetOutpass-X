const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const outpassRoutes = require('./outpassRoutes');

// Root API path: /api
router.use('/auth', authRoutes);
router.use('/outpass', outpassRoutes);

module.exports = router;
