export type User = {
  id: string;
  email: string;
  password: string;
  name?: string;
  avatarUrl?: string;
  dateOfBirth?: Date;
  createdAt: Date;
  updatedAt: Date;
  bio?: string;
  location?: string;
  posts: Post[];
  likes: Likes[];
  comments: Comments[];
  followers: Follows[];
  following: Follows[];
  isActivated?: boolean;
  activationLink?: string;
  hash?: string;
  hashExp?: Date;
};

export type Post = {
  id: string;
  content: string;
  author: User;
  createdAt: Date;
  likes: Likes[];
  comments: Comments[];
  likeByUser: boolean;
};

export type Likes = {
  id: string;
  user: User;
  post: Post;
};

export type Follows = {
  id: string;
  follower: User;
  following: User;
};

export type Comments = {
  id: string;
  content: string;
  user: User;
  post: Post;
  createdAt: Date;
};
