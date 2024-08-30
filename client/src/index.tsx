import { createRoot } from 'react-dom/client';
import { NextUIProvider } from '@nextui-org/react';
import '@/style.css';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { store } from '@/store/store';
import { AuthGuard } from '@/features';
import { router } from '@/router';
import { ThemeProvider } from '@/theme';

const root = document.getElementById('root');

const container = createRoot(root);
container.render(
    <Provider store={store}>
      <NextUIProvider>
        <ThemeProvider>
          <AuthGuard>
            <RouterProvider router={router} />
          </AuthGuard>
        </ThemeProvider>
      </NextUIProvider>
    </Provider>
);