const UserModel = require('../models/user-model');
const CommentModel = require('../models/comment-model');
const PostModel = require('../models/post-model');
const ApiError = require('../exceptions/api-error');
const CommentDto = require('../dtos/comment-dto');
const sessionDelete = require('../sessions/delete-comment-session');
class CommentService {
  async createComment(postId, content, userId) {
    if (!content || !postId) {
      throw ApiError.BadRequest('No content');
    }
    const user = await UserModel.findById(userId);
    const post = await PostModel.findById(postId);
    if (!post) {
      throw ApiError.NotFoundError('Post not found');
    }
    const comment = await CommentModel.create({
      content,
      user: userId,
      post: postId,
    });
    user.comments.push(comment);
    await user.save();
    post.comments.push(comment);
    await post.save();
    const commentDto = new CommentDto(comment);
    return { comment: commentDto };
  }

  async deleteComment(id, userId) {
    const comment = await CommentModel.findById(id).populate('user');
    if (!comment) {
      throw ApiError.NotFoundError('Comment not found');
    }
    const commentDto = new CommentDto(comment);
    if (commentDto.user.id !== userId) {
      throw ApiError.Forbidden();
    }
    return sessionDelete(id);
  }
}

module.exports = new CommentService();
