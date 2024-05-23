const CommentService = require('../services/comment-service');

class CommentController {
  async createComment(req, res, next) {
    try {
      const userId = req.user.id;
      const { postId, content } = req.body;
      const commentData = await CommentService.createComment(
        postId,
        content,
        userId,
      );
      return res.json(commentData);
    } catch (error) {
      next(error);
    }
  }

  async deleteComment(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const commentData = await CommentService.deleteComment(id, userId);
      return res.json(commentData);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CommentController();
