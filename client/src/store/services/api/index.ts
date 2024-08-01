import { BaseQueryApi, FetchArgs, createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '@/constants';
import { RootState } from '../../store';
import { RetryOptions } from '@reduxjs/toolkit/dist/query/retry';
import { Token } from '@/store/types';

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}/api`,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token =
      (getState() as RootState).user.token || localStorage.getItem('token');

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });
const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {} & RetryOptions) => {
  let result = await baseQueryWithRetry(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Попробовать обновить токен
    const refreshResult = await baseQuery(
      {
        url: '/refresh',
        method: 'GET',
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      localStorage.setItem('token', (refreshResult.data as Token).accessToken)
      result = await baseQueryWithRetry(args, api, extraOptions);
    } else {
      console.log('error refresh');
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: 'splitApi',
  baseQuery: baseQueryWithReauth,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});
