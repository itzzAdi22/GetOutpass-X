const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../data.json');

const readDB = () => {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    const initialData = { users: [], outpasses: [] };
    fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2), 'utf8');
    return initialData;
  }
};

const writeDB = (data) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
};

const initDB = () => {
  if (!fs.existsSync(DB_PATH)) {
    writeDB({ users: [], outpasses: [] });
    console.log('✅ JSON Database initialized (fallback mode) at', DB_PATH);
  } else {
    console.log('✅ JSON Database loaded (fallback mode)');
  }
};

// Generate a random string ID like MongoDB ObjectId
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 10);
};

module.exports = { readDB, writeDB, initDB, generateId };
