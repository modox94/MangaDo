const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  psd: String,
  type: String,
  position: Object,
  visible: Boolean,
  messages: Array,
});

module.exports = mongoose.model('User', userSchema);
