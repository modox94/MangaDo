const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  pass: String,
  accessToken: String,
  refreshToken: String,
  notepads: Object,
});

module.exports = mongoose.model('User', userSchema);
