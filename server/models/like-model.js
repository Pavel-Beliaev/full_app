const { Schema, model } = require('mongoose');

const LikeSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  post: { type: Schema.Types.ObjectId, ref: 'Post' },
});

module.exports = model('Like', LikeSchema);
