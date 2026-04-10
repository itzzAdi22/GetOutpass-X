const mongoose = require('mongoose');
require('dotenv').config();

console.log('Checking MongoDB connection setup...');
console.log('Environment variables loaded:', !!process.env.MONGO_URI);
console.log('MongoDB URI:', process.env.MONGO_URI ? 'Set' : 'Not set');

// Test connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('SUCCESS: MongoDB connection established');
    console.log('Connected to:', mongoose.connection.host);
    console.log('Database:', mongoose.connection.name);
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('ERROR: MongoDB connection failed');
    console.error('Error details:', err.message);
  });
