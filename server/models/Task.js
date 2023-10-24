const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema(
  {
    createdBy: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      min: 3,
    },
    desc: {
      type: String,
      required: true,
      min: 3,
    },
    coords: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    assignedUser: { type: Schema.Types.ObjectId, ref: 'User' },
    auther: { type: Schema.Types.ObjectId, ref: 'User' },
    completedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    isDone: { type: Boolean, default: false },
    deadline: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', TaskSchema);
