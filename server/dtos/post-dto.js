module.exports = class PostDto {
  id;
  content;
  author;
  createdAt;
  likes;
  comments;

  constructor(model) {
    if (Array.isArray(model)) {
      return model.map((item) => new PostDto(item));
    } else {
      this.id = model._id;
      this.content = model.content;
      this.author = model.author;
      this.createdAt = model.createdAt;
      this.likes = model.likes;
      this.comments = model.comments;
    }
  }
};
