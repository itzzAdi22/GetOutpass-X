const Outpass = require('../models/outpassmodal');
const User = require('../models/usermodule');

// @desc    Create a new outpass request
// @route   POST /api/outpass
// @access  Private
const createOutpass = async (req, res, next) => {
  const { destination, reason, fromDate, toDate } = req.body;

  try {
    const newOutpass = await Outpass.create({
      userId: req.user._id,
      destination,
      reason,
      fromDate,
      toDate,
    });

    const populatedOutpass = await Outpass.findById(newOutpass._id).populate('userId', 'name email');
    
    res.status(201).json(populatedOutpass);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all outpasses (Admin sees all, user sees own)
// @route   GET /api/outpass
// @access  Private
const getOutpasses = async (req, res, next) => {
  try {
    let outpasses = [];

    if (req.user.role === 'admin') {
      outpasses = await Outpass.find().populate('userId', 'name email').sort({ createdAt: -1 });
    } else {
      outpasses = await Outpass.find({ userId: req.user._id }).populate('userId', 'name email').sort({ createdAt: -1 });
    }

    res.json(outpasses);
  } catch (error) {
    next(error);
  }
};

// @desc    Update outpass status
// @route   PUT /api/outpass/:id
// @access  Private/Admin
const updateOutpassStatus = async (req, res, next) => {
  const { status } = req.body;

  try {
    const outpass = await Outpass.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate('userId', 'name email');

    if (outpass) {
      res.json(outpass);
    } else {
      res.status(404);
      return next(new Error('Outpass not found'));
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { createOutpass, getOutpasses, updateOutpassStatus };
