const { Schema, model } = require('mongoose');

const CommentSchema = new Schema(
  {
    content: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    post: { type: Schema.Types.ObjectId, ref: 'Post' },
  },
  { timestamps: true },
);

module.exports = model('Comment', CommentSchema);
