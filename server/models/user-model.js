const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    email: { type: String, unique: true, require: true },
    password: { type: String, require: true },
    name: { type: String, require: false },
    avatarUrl: { type: String, require: false },
    dateOfBirth: { type: Date, require: false },
    bio: { type: String, require: false },
    location: { type: String, require: false },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    likes: [{ type: Schema.Types.ObjectId, ref: 'Like' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    followers: [{ type: Schema.Types.ObjectId, ref: 'Follow' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'Follow' }],
    activationLink: { type: String, require: true },
    isActivated: { type: Boolean, default: false },
    hash: String,
    hashExp: Date,
  },
  { timestamps: true },
);

module.exports = model('User', UserSchema);
