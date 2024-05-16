const FollowService = require('../services/follow-service');

class FollowController {
  async followUser(req, res, next) {
    try {
      const userId = req.user.id;
      const { followingId } = req.body;
      const followData = await FollowService.followUser(userId, followingId);
      return res.json(followData);
    } catch (error) {
      next(error);
    }
  }

  async unFollowUser(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const followData = await FollowService.unFollowUser(userId, id);
      return res.json(followData);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new FollowController();
