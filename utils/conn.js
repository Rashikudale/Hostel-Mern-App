const mongoose = require('mongoose');
require('dotenv').config();
const mongoURI = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        console.log(mongoURI);
        
        await mongoose.connect(mongoURI);
        console.log('MongoDB connection SUCCESS');
    } catch (error) {
        console.log(error)
        console.error('MongoDB connection FAIL');
        process.exit(1);
    }
    };

module.exports = connectDB;