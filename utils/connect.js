const mongoose = require('mongoose');

const connectDB = async () => {
  console.log(`Connecting to MongoDB Database at ${process.env.MONGO_URI}`);
  await mongoose.connect(process.env.MONGO_URI);
};

module.exports = connectDB;
