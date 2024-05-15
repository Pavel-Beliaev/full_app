const ApiError = require('../exceptions/api-error');
const PostModel = require('../models/post-model');
const UserModel = require('../models/user-model');
const UserDto = require('../dtos/user-dto');
const PostDto = require('../dtos/post-dto');
const CommentDto = require('../dtos/comment-dto');
const sessionDelete = require('../sessions/delete-post-session');

class PostService {
  async createPost(content, userId) {
    if (!content) {
      throw ApiError.BadRequest('No content');
    }
    const user = await UserModel.findById(userId);
    const post = await PostModel.create({
      content,
      author: userId,
    });
    user.posts.push(post);
    await user.save();
    const postDto = new PostDto(post);
    return { post: postDto };
  }

  async getAllPosts(userId) {
    const posts = await PostModel.find({ author: userId })
      .sort({
        createdAt: 'desc',
      })
      .populate('author')
      .populate({
        path: 'comments',
        populate: 'user',
      });
    if (posts.length === 0) {
      throw ApiError.NotFoundError('Posts not found');
    }

    const isPostWithLikeUser = posts.map((post) => ({
      ...new PostDto(post),
      author: new UserDto(post.author).authorData(),
      comments: post.comments.map((comment) => ({
        ...new CommentDto(comment),
        user: new UserDto(comment.user).authorData(),
      })),
      // likeByUser: post.likes.some((like) => like.user.id === userId),
    }));
    return { posts: isPostWithLikeUser };
  }

  async getPostById(id, userId) {
    const post = await PostModel.findById(id).populate('author').populate({
      path: 'comments',
      populate: 'user',
    });
    if (!post) {
      throw ApiError.NotFoundError('Post not found');
    }
    const isPostWithLikeUser = {
      ...new PostDto(post),
      author: new UserDto(post.author).authorData(),
      comments: post.comments.map((comment) => ({
        ...new CommentDto(comment),
        user: new UserDto(comment.user).authorData(),
      })),
      likeByUser: post.likes.some((like) => like.user.id === userId),
    };
    return { post: isPostWithLikeUser };
  }

  async deletePost(id, userId) {
    const post = await PostModel.findById(id).populate('author');
    if (!post) {
      throw ApiError.NotFoundError('Post not found');
    }
    const postDto = new PostDto(post);
    if (postDto.author.id !== userId) {
      throw ApiError.Forbidden();
    }
    return sessionDelete(id);
  }
}

module.exports = new PostService();
