const { Schema, model } = require('mongoose');

const FollowsSchema = new Schema({
  follower: { type: Schema.Types.ObjectId, ref: 'User' },
  following: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = model('Follow', FollowsSchema);
