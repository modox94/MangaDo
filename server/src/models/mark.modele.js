const mongoose = require('mongoose');

const markSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  type: String,
  position: Object,
  visible: Boolean,
  messages: Array,
  creator: String,
});

module.exports = mongoose.model('Mark', markSchema);
