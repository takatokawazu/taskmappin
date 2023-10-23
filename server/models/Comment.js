const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
  taskID: { type: Schema.Types.ObjectId, ref: 'Task' },
  userID: { type: Schema.Types.ObjectId, ref: 'User' },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Comment', commentSchema);
