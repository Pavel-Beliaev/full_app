const ApiError = require('../exceptions/api-error');
const FollowModel = require('../models/follows-model');
const UserModel = require('../models/user-model');

class FollowService {
  async followUser(userId, followingId) {
    if (!followingId) {
      throw ApiError.BadRequest('No content');
    }
    if (followingId === userId) {
      throw ApiError.BadRequest("You can't be subscribed to yourself");
    }
    const existingSubscribe = await FollowModel.findOne({
      follower: userId,
      following: followingId,
    });
    if (existingSubscribe) {
      throw ApiError.BadRequest('You are already subscribed');
    }
    const sub = await FollowModel.create({
      follower: userId,
      following: followingId,
    });
    await Promise.all([
      UserModel.updateOne({ _id: userId }, { $push: { following: sub } }),
      UserModel.updateOne({ _id: followingId }, { $push: { followers: sub } }),
    ]);
    return { message: 'Subscription successful' };
  }

  async unFollowUser(userId, followingId) {
    const sub = await FollowModel.findOneAndDelete({
      follower: userId,
      following: followingId,
    });
    if (!sub) {
      throw ApiError.NotFoundError('Subscription not found');
    }
    await Promise.all([
      UserModel.updateOne({ _id: userId }, { $pull: { following: sub._id } }),
      UserModel.updateOne(
        { _id: followingId },
        { $pull: { followers: sub._id } },
      ),
    ]);
    return { message: 'Unsubscription successful' };
  }
}

module.exports = new FollowService();
