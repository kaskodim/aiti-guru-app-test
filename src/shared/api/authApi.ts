// src/shared/api/authApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type LoginRequest = {
  username: string;
  password: string;
  expiresInMins: number;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com/auth",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    loginByCredentials: builder.mutation<LoginResponse, LoginRequest>({
      query: ({ username, password, expiresInMins }) => ({
        url: "/login",
        method: "POST",
        body: {
          username,
          password,
          expiresInMins,
        },
      }),
    }),
    getCurrentUser: builder.query<any, void>({
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
