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
  isFollowing?: boolean;
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

export type Token = {
  accessToken: string;
  refreshToken: string;
}

export type Follow = {
  id: string
  name: string
  avatarUrl: string
  email: string
}

export type NewUserType = Omit<User, 'followers' | 'following'> & {
  followers: Follow[]
  following: Follow[]
}
