const PostService = require('../services/post-service');

class PostController {
  async createPost(req, res, next) {
    try {
      const { content } = req.body;
      const userId = req.user.id;
      const postData = await PostService.createPost(content, userId);
      return res.json(postData);
    } catch (error) {
      next(error);
    }
  }

  async getAllPosts(req, res, next) {
    try {
      const userId = req.user.id;
      const postData = await PostService.getAllPosts(userId);
      return res.json(postData);
    } catch (error) {
      next(error);
    }
  }

  async getPostById(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const postData = await PostService.getPostById(id, userId);
      return res.json(postData);
    } catch (error) {
      next(error);
    }
  }

  async deletePost(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const postData = await PostService.deletePost(id, userId);
      return res.json(postData);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PostController();
