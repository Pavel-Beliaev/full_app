module.exports = class CommentDto {
  id;
  content;
  user;
  post;
  createdAt;

  constructor(model) {
    if (Array.isArray(model)) {
      return model.map((item) => new CommentDto(item));
    } else {
      this.id = model._id;
      this.content = model.content;
      this.user = model.user;
      this.post = model.post;
      this.createdAt = model.createdAt;
    }
  }
};
