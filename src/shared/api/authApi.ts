// src/shared/api/authApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { ACCESS_TOKEN_TTL_MINUTES, STORAGE_KEYS } from "@/cosnt/const.ts";
import type {
  CurrentUser,
  LoginRequest,
  LoginResponse,
} from "@/shared/api/types.ts";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://dummyjson.com/auth",
  prepareHeaders: (headers) => {
    const token =
      localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN) ??
      sessionStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // 1. обычный запрос
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken =
      localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN) ??
      sessionStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);

    if (!refreshToken) {
      return result;
    }

    const refreshResult = await baseQuery(
      {
        url: "/refresh",
        method: "POST",
        body: { refreshToken, expiresInMins: ACCESS_TOKEN_TTL_MINUTES },
      },
      api,
      extraOptions,
    );

    if (refreshResult.data) {
      const data = refreshResult.data as {
        accessToken: string;
        refreshToken: string;
      };

      const isRememberMe =
        localStorage.getItem(STORAGE_KEYS.REMEMBER_ME) === "true";

      if (isRememberMe) {
        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, data.accessToken);
        localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, data.refreshToken);
      } else {
        sessionStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, data.accessToken);
        sessionStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, data.refreshToken);
      }

      result = await baseQuery(args, api, extraOptions);
    } else {
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
      sessionStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      sessionStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
      sessionStorage.removeItem(STORAGE_KEYS.REMEMBER_ME);
      // redirect to login page
      window.location.pathname = "/auth";
    }
  }

  return result;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    loginByCredentials: builder.mutation<LoginResponse, LoginRequest>({
      query: ({ username, password }) => ({
        url: "/login",
        method: "POST",
        body: {
          username,
          password,
          expiresInMins: ACCESS_TOKEN_TTL_MINUTES,
        },
      }),
    }),
    getCurrentUser: builder.query<CurrentUser, void>({
      query: () => ({
        url: "/me",
        method: "GET",
      }),
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useLoginByCredentialsMutation, useGetCurrentUserQuery } =
  authApi;
