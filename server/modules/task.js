const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  teamName: { type: String, required: true },
  assessment: { type: String, required: true },
  submitDate: { type: Date, required: true }
});

module.exports = mongoose.model('Task', taskSchema);
