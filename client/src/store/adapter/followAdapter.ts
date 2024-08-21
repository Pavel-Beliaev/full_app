import { Follow, NewUserType, User } from '@/store/types';

export const followAdapter = (entity: User): NewUserType => {
  return {
    ...entity,
    followers: entity.followers.map((follower): Follow => ({
      id: follower.follower.id,
      name: follower.follower.name,
      avatarUrl: follower.follower.avatarUrl,
      email: follower.follower.email,
    })),
    following: entity.following.map((follow): Follow => ({
      id: follow.following.id,
      name: follow.following.name,
      avatarUrl: follow.following.avatarUrl,
      email: follow.following.email,
    })),
  };
};