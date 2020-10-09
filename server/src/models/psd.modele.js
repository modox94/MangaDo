const mongoose = require('mongoose');

const psdSchema = mongoose.Schema({
  url: { type: String, unique: true },
  marks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Mark', default: [] }],
});

module.exports = mongoose.model('Psd', psdSchema);
