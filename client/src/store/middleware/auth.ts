import { createListenerMiddleware } from '@reduxjs/toolkit';
import { usersApi } from '@/store/services';

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: usersApi.endpoints.login.matchFulfilled,
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners();
    if (action.payload.accessToken) {
      localStorage.setItem('token', action.payload.accessToken);
    }
  },
});