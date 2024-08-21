module.exports = class UserDto {
  id;
  email;
  password;
  name;
  avatarUrl;
  dateOfBirth;
  createdAt;
  updatedAt;
  bio;
  location;
  posts;
  likes;
  comments;
  followers;
  following;
  isActivated;

  constructor(model) {
    this.id = model._id;
    this.email = model.email;
    this.password = model.password;
    this.name = model.name;
    this.avatarUrl = model.avatarUrl;
    this.dateOfBirth = model.dateOfBirth;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.bio = model.bio;
    this.location = model.location;
    this.posts = model.posts;
    this.likes = model.likes;
    this.comments = model.comments;
    this.followers = model.followers;
    this.following = model.following;
    this.isActivated = model.isActivated;
  }

  login() {
    return {
      id: this.id,
      email: this.email,
      password: this.password,
      name: this.name,
      avatarUrl: this.avatarUrl,
      dateOfBirth: this.dateOfBirth,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      bio: this.bio,
      location: this.location,
      isActivated: this.isActivated,
    };
  }

  current() {
    return {
      id: this.id,
      email: this.email,
      password: this.password,
      name: this.name,
      avatarUrl: this.avatarUrl,
      dateOfBirth: this.dateOfBirth,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      bio: this.bio,
      location: this.location,
      followers: this.followers,
      following: this.following,
      isActivated: this.isActivated,
    }
  }

  userData() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      dateOfBirth: this.dateOfBirth,
      location: this.location,
      bio: this.bio,
      avatarUrl: this.avatarUrl,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  authorData() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      avatarUrl: this.avatarUrl,
    };
  }

  follow() {
    return {
      id: this.id,
      name: this.name,
      avatarUrl: this.avatarUrl,
      email: this.email,
    }
  }
};
