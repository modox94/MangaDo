const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  password: String,
  accessToken: String,
  refreshToken: String,
  role: String,
});

module.exports = mongoose.model('User', userSchema);
