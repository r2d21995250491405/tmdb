import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const actorApi = createApi({
  reducerPath: "actorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3/",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTMyM2ZhYmI1MjFjYWFlY2YxZmMzNDI5Yjc1NDMxNiIsInN1YiI6IjVmYzM3NWFlZGNmODc1MDA0MGQ1ZWY2NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5UpyKpRGRruwyG4qf3wOs6Tj_oK7L6kyJp5aXe2nsH4",
    },
  }),
  endpoints: (builder) => ({
    getPopularActors: builder.query({
      query: (page = 1) => `person/popular?page=${page}`,
    }),
    searchActorByName: builder.query({
      query: (name) => `search/person?query=${name}`,
    }),
    getActorById: builder.query({
      query: (id) => `person/${id}`,
    }),
  }),
});

export const {
  useGetPopularActorsQuery,
  useSearchActorByNameQuery,
  useGetActorByIdQuery,
} = actorApi;
