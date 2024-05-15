const mongoose = require('mongoose');
const PostModel = require('../models/post-model');
const UserModel = require('../models/user-model');
const LikeModel = require('../models/like-model');

module.exports = async function (like) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await LikeModel.deleteOne({ _id: like.id }).session(session);
    await PostModel.updateMany(
      { likes: like.id },
      { $pull: { likes: like.id } },
    ).session(session);
    await UserModel.updateMany(
      { likes: like.id },
      { $pull: { likes: like.id } },
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
