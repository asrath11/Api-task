const mongoose = require('mongoose');
async function connectDb() {
  try {
    await mongoose.connect('mongodb://localhost:27017/apitask');
    console.log('connect to the Db');
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = connectDb;
