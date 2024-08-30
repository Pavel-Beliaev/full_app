import { lazy } from 'react';

export const LazyAuth = lazy(() => import('./Auth'));
export const LazyFollowers = lazy(() => import('./Followers'));
export const LazyFollowing = lazy(() => import('./Following'));
export const LazyPosts = lazy(() => import('./Posts'));
export const LazyCurrentPost = lazy(() => import('./CurrentPost'));
export const LazyUserProfile = lazy(() => import('./UserProfile'));
