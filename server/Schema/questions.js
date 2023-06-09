const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  title: {
    type:  [String, Number],
    required: true
  },
  description: {
    type:  [String, Number],
    required: true
  },
  output: {
    type:  [String, Number],
    required: true
  }});
const question = mongoose.model('leetCOde-questions', QuestionSchema);
module.exports = question;
