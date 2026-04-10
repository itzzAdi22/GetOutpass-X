const { readDB, writeDB, generateId } = require('../utils/jsonDB');

// @desc    Create a new outpass request
// @route   POST /api/outpass
// @access  Private
const createOutpass = async (req, res, next) => {
  const { destination, reason, fromDate, toDate } = req.body;

  try {
    const db = readDB();
    const newOutpass = {
      _id: generateId(),
      userId: req.user._id,
      destination,
      reason,
      fromDate,
      toDate,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    db.outpasses.push(newOutpass);
    writeDB(db);

    res.status(201).json(newOutpass);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all outpasses (Admin sees all, user sees own)
// @route   GET /api/outpass
// @access  Private
const getOutpasses = async (req, res, next) => {
  try {
    const db = readDB();
    let outpasses = [];

    if (req.user.role === 'admin') {
      outpasses = db.outpasses.map(op => {
        const user = db.users.find(u => u._id === op.userId);
        return {
          ...op,
          userId: user ? { _id: user._id, name: user.name, email: user.email } : null
        };
      });
    } else {
      outpasses = db.outpasses
        .filter(op => op.userId === req.user._id)
        .map(op => {
          const user = db.users.find(u => u._id === op.userId);
          return {
             ...op,
             userId: user ? { _id: user._id, name: user.name, email: user.email } : null
          };
        });
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
    const db = readDB();
    const outpassIndex = db.outpasses.findIndex(op => op._id === req.params.id);

    if (outpassIndex !== -1) {
      db.outpasses[outpassIndex].status = status || db.outpasses[outpassIndex].status;
      db.outpasses[outpassIndex].updatedAt = new Date().toISOString();
      writeDB(db);
      res.json(db.outpasses[outpassIndex]);
    } else {
      res.status(404);
      return next(new Error('Outpass not found'));
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { createOutpass, getOutpasses, updateOutpassStatus };
