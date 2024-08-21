module.exports = class FollowsDto {
  id;
  follower;
  following;

  constructor(model) {
    if (Array.isArray(model)) {
      return model.map((item) => new FollowsDto(item));
    } else {
      this.id = model._id;
      this.follower = model.follower;
      this.following = model.following;
    }
  }
};
