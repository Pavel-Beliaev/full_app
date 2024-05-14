const mongoose = require('mongoose');
const CommentModel = require('../models/comment-model');
const LikeModel = require('../models/like-model');
const PostModel = require('../models/post-model');
const UserModel = require('../models/user-model');

module.exports = async function (id) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const comments = await CommentModel.find({ post: id }).session(session);
    const commentIds = comments.map((comment) => comment._id);
    await CommentModel.deleteMany({ post: id }).session(session);
    await LikeModel.deleteMany({ post: id }).session(session);
    await PostModel.deleteOne({ _id: id }).session(session);
    await UserModel.updateMany({ posts: id }, { $pull: { posts: id } }).session(
      session,
    );
    await UserModel.updateMany(
      { comments: { $in: commentIds } },
      { $pull: { comments: { $in: commentIds } } },
    ).session(session);
    await session.commitTransaction();
    await session.endSession();
    return { transaction: 'success' };
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    return { transaction: 'failed', error };
  }
};
