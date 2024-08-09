const ApiError = require('../exceptions/api-error');
const UserModel = require('../models/user-model');
const PostModel = require('../models/post-model');
const LikeModel = require('../models/like-model');
const LikeDto = require('../dtos/like-dto');
const sessionDelete = require('../sessions/delete-like-session');

class LikeService {
  async likePost(userId, postId) {
    if (!postId) {
      throw ApiError.BadRequest('No content');
    }
    const existingLike = await LikeModel.findOne({
      user: userId,
      post: postId,
    });
    if (existingLike) {
      throw ApiError.BadRequest('This post got your like');
    }
    const user = await UserModel.findById(userId);
    const post = await PostModel.findById(postId);
    const like = await LikeModel.create({
      user: userId,
      post: postId,
    });
    user.likes.push(like);
    await user.save();
    post.likes.push(like);
    await post.save();
    return new LikeDto(like);
  }

  async unLikePost(userId, postId) {
    const like = await LikeModel.findOne({
      user: userId,
      post: postId,
    })
    const likeData = new LikeDto(like);
    return sessionDelete(likeData);
  }
}

module.exports = new LikeService();
