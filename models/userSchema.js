const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  rights: {
    type: String,
    required: true
  }
});

const userData = mongoose.model('userData', userSchema, "userDatas");

module.exports = userData;
