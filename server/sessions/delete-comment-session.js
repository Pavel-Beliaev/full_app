const mongoose = require('mongoose');
const CommentModel = require('../models/comment-model');
const PostModel = require('../models/post-model');
const UserModel = require('../models/user-model');

module.exports = async function (id) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await CommentModel.deleteOne({ _id: id }).session(session);
    await PostModel.updateMany(
      { comments: id },
      { $pull: { comments: id } },
    ).session(session);
    await UserModel.updateMany(
      { comments: id },
      { $pull: { comments: id } },
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
