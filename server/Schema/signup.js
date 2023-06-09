const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }});
const NeetCode = mongoose.model('NeetCode', UserSchema);
module.exports = NeetCode;
