// db.js
require('dotenv').config(); // load .env variables first
const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
 
  } catch (error) {
    
      console.error("MongoDB connection failed", error.message);
  }
};

module.exports = connectToMongo;
