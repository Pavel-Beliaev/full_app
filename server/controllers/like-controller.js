const LikeService = require('../services/like-service');
const ApiError = require('../exceptions/api-error');

class LikeController {
  async likePost(req, res, next) {
    try {
      const userId = req.user.id;
      const { postId } = req.body;
      const likeData = await LikeService.likePost(userId, postId);
      return res.json(likeData);
    } catch (error) {
      next(error);
    }
  }

  async unLikePost(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const likeData = await LikeService.unLikePost(id, userId);
      return res.json('unLikePost');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new LikeController();
