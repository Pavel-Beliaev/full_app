module.exports = class LikeDto {
  id;
  user;
  post;

  constructor(model) {
    if (Array.isArray(model)) {
      return model.map((item) => new LikeDto(item));
    } else {
      this.id = model._id;
      this.user = model.user;
      this.post = model.post;
    }
  }
};
