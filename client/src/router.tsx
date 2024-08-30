import { createBrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import { Spinner } from '@nextui-org/react';
import { LazyAuth, LazyCurrentPost, LazyFollowers, LazyFollowing, LazyPosts, LazyUserProfile } from '@/module';
import { Layout } from '@/components';

export const router = createBrowserRouter([
  {
    path: '/auth',
    element: <Suspense fallback={<Spinner />}><LazyAuth /></Suspense>,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Suspense fallback={<Spinner />}><LazyPosts /></Suspense>,
      },
      {
        path: 'posts/:id',
        element: <Suspense fallback={<Spinner />}><LazyCurrentPost /></Suspense>,
      },
      {
        path: 'users/:id',
        element: <Suspense fallback={<Spinner />}><LazyUserProfile /></Suspense>,
      },
      {
        path: 'followers',
        element: <Suspense fallback={<Spinner />}><LazyFollowers /></Suspense>,
      },
      {
        path: 'following',
        element: <Suspense fallback={<Spinner />}><LazyFollowing /></Suspense>,
      },
    ],
  },
]);