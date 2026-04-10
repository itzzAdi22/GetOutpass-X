const { initDB } = require('../utils/jsonDB');

const connectDB = async () => {
  try {
    initDB();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
