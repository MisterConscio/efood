import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Restaurant } from "../pages/Home";

type Order = {
  id: number;
  price: number;
};

type PurchasePayload = {
  products: Order[];
  // billing: {
  //   name: string;
  //   email: string;
  //   document: string;
  // };
  delivery: {
    name: string;
    address: string;
    city: string;
    cep: string;
    number: string;
    complement: string;
  };
  payment: {
    name?: string;
    number?: string;
    code?: number;
    expires?: {
      month: number;
      year: number;
    };
  };
};

type PurchaseResponse = {
  orderId: string;
};

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fake-api-tau.vercel.app/api/efood",
  }),
  endpoints: (builder) => ({
    getRestaurants: builder.query<Restaurant[], void>({
      query: () => "restaurantes",
    }),
    getCardapio: builder.query<Restaurant, string>({
      query: (id) => `restaurantes/${id}`,
    }),
    purchase: builder.mutation<PurchaseResponse, PurchasePayload>({
      query: (body) => ({
        url: "checkout",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetRestaurantsQuery,
  useGetCardapioQuery,
  usePurchaseMutation,
} = api;

export default api;
