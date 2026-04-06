// src/shared/api/authApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://dummyjson.com/auth",
  prepareHeaders: (headers) => {
    const token =
      localStorage.getItem("accessToken") ??
      sessionStorage.getItem("accessToken");

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

  // 2. если accessToken умер
  if (result.error && result.error.status === 401) {
    console.log("🔁 access token умер");

    const refreshToken =
      localStorage.getItem("refreshToken") ??
      sessionStorage.getItem("refreshToken");

    if (!refreshToken) {
      console.log("❌ нет refresh токена");
      return result;
    }

    // 3. пробуем обновить токен
    const refreshResult = await baseQuery(
      {
        url: "/refresh",
        method: "POST",
        body: { refreshToken, expiresInMins: 1 },
      },
      api,
      extraOptions,
    );

    if (refreshResult.data) {
      const data = refreshResult.data as {
        accessToken: string;
        refreshToken: string;
      };

      console.log("✅ токен обновлён");

      const isRememberMe = localStorage.getItem("rememberMe") === "true";

      // 4. сохраняем новый accessToken
      if (isRememberMe) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
      } else {
        sessionStorage.setItem("accessToken", data.accessToken);
        sessionStorage.setItem("refreshToken", data.refreshToken);
      }

      // 5. повторяем оригинальный запрос
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.log("❌ refresh не сработал");

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
      sessionStorage.removeItem("rememberMe");

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

//TODO разобрать типы
export type AuthCredentials = {
  username: string;
  password: string;
};

type LoginRequest = AuthCredentials & {
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

// ========================================

type Hair = {
  color: string;
  type: string;
};

type Coordinates = {
  lat: number;
  lng: number;
};

type Address = {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: Coordinates;
  country: string;
};

type Bank = {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
};

type CompanyAddress = Address;

type Company = {
  department: string;
  name: string;
  title: string;
  address: CompanyAddress;
};

type Crypto = {
  coin: string;
  wallet: string;
  network: string;
};

export type CurrentUser = {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: Hair;
  ip: string;
  address: Address;
  macAddress: string;
  university: string;
  bank: Bank;
  company: Company;
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: Crypto;
  role: string;
};
