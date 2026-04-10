const mongoose = require('mongoose');
require('dotenv').config();

const testConnection = async () => {
  try {
    console.log('Testing MongoDB connection...');
    console.log('URI:', process.env.MONGO_URI);
    
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log('Database name:', conn.connection.name);
    
    // Test creating a simple document
    const User = require('./models/usermodule');
    const testUser = await User.findOne({ email: 'test@example.com' });
    console.log('Test query completed, found user:', testUser ? 'Yes' : 'No');
    
    await mongoose.disconnect();
    console.log('Connection closed successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

testConnection();
