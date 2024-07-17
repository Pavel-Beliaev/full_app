import { createRoot } from 'react-dom/client';
import { App } from '@/App';
import { NextUIProvider } from '@nextui-org/react';
import '@/style.css';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

const root = document.getElementById('root');
const container = createRoot(root);
container.render(
  <Provider store={store}>
    <NextUIProvider>
      <App />
    </NextUIProvider>
  </Provider>,
);