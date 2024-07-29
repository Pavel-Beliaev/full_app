import { createRoot } from 'react-dom/client';
import { NextUIProvider } from '@nextui-org/react';
import '@/style.css';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout, ThemeProvider } from '@/components';
import { Auth, CurrentPost, Followers, Following, Posts, UserProfile } from '@/pages';

const root = document.getElementById('root');

const router = createBrowserRouter([
  {
    path: '/auth',
    element: <Auth />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Posts />,
      },
      {
        path: 'posts/:id',
        element: <CurrentPost />,
      },
      {
        path: 'users/:id',
        element: <UserProfile />,
      },
      {
        path: 'followers',
        element: <Followers />,
      },
      {
        path: 'following',
        element: <Following />,
      },
    ],
  },
]);

const container = createRoot(root);
container.render(
  <Provider store={store}>
    <NextUIProvider>
      <ThemeProvider>
        <RouterProvider router={router}/>
      </ThemeProvider>
    </NextUIProvider>
  </Provider>,
);