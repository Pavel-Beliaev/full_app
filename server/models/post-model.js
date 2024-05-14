const { Schema, model } = require('mongoose');

const PostSchema = new Schema(
  {
    content: String,
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    likes: [{ type: Schema.Types.ObjectId, ref: 'Like' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  },
  { timestamps: true },
);

module.exports = model('Post', PostSchema);
