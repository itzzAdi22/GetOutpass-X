const express = require('express');
const router = express.Router();
const {
  createOutpass,
  getOutpasses,
  updateOutpassStatus,
} = require('../controllers/outpassController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(protect, getOutpasses).post(protect, createOutpass);
router.route('/:id').put(protect, admin, updateOutpassStatus);

module.exports = router;
