const mongoose = require('mongoose');
const CommentModel = require('../models/comment-model');
const LikeModel = require('../models/like-model');
const PostModel = require('../models/post-model');
const UserModel = require('../models/user-model');

module.exports = async function (postId) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const comments = await CommentModel.find({ post: postId }).session(session);
    const commentIds = comments.map((comment) => comment._id);
    const likes = await LikeModel.find({ post: postId }).session(session);
    const likeIds = likes.map((like) => like._id);
    await CommentModel.deleteMany({ post: postId }).session(session);
    await LikeModel.deleteMany({ post: postId }).session(session);
    await PostModel.deleteOne({ _id: postId }).session(session);
    await UserModel.updateMany(
      { posts: postId },
      { $pull: { posts: postId } },
    ).session(session);
    await UserModel.updateMany(
      { comments: { $in: commentIds } },
      { $pull: { comments: { $in: commentIds } } },
    ).session(session);
    await UserModel.updateMany(
      { likes: { $in: likeIds } },
      { $pull: { likes: { $in: likeIds } } },
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
