import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Restaurant } from "../pages/Home";

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
    // getOnSale: builder.query<Restaurant[], void>({
    //   query: () => 'promocoes'
    // }),
    // getSoon: builder.query<Restaurant[], void>({
    //   query: () => 'em-breve'
    // }),
    // getActionGame: builder.query<Restaurant[], void>({
    //   query: () => 'acao'
    // }),
    // getSportsGame: builder.query<Restaurant[], void>({
    //   query: () => 'esportes'
    // }),
    // getSimulationGame: builder.query<Restaurant[], void>({
    //   query: () => 'simulacao'
    // }),
    // getFightGame: builder.query<Restaurant[], void>({
    //   query: () => 'luta'
    // }),
    // getRpgGame: builder.query<Restaurant[], void>({
    //   query: () => 'rpg'
    // }),
    // getGame: builder.query<Restaurant, string>({
    //   query: (id) => `jogos/${id}`
    // })
  }),
});

export const { useGetRestaurantsQuery, useGetCardapioQuery } = api;

export default api;
