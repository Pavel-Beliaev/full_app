const LikeService = require('../services/like-service');

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
      const likeData = await LikeService.unLikePost(userId, id);
      return res.json(likeData);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new LikeController();
