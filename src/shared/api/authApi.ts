// src/shared/api/authApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//TODO разобрать типы

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
// =========================================

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
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
