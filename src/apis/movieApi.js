import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3/",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTMyM2ZhYmI1MjFjYWFlY2YxZmMzNDI5Yjc1NDMxNiIsInN1YiI6IjVmYzM3NWFlZGNmODc1MDA0MGQ1ZWY2NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5UpyKpRGRruwyG4qf3wOs6Tj_oK7L6kyJp5aXe2nsH4",
    },
  }),
  endpoints: (builder) => ({
    getTrendingMovies: builder.query({
      query: () => "trending/movie/day?language=en-US",
    }),
    searchMoviesByName: builder.query({
      query: (name) => `search/movie?query=${name}&language=en-US`,
    }),
    getMovieDetails: builder.query({
      query: (movieId) => `movie/${movieId}?language=en-US`,
    }),
    getTopRatedMovies: builder.query({
      query: (page = 1) => `movie/top_rated?language=en-US&page=${page}`
    })
  }),
});


export const {
  useGetTrendingMoviesQuery,
  useSearchMoviesByNameQuery,
  useGetMovieDetailsQuery,
  useGetTopRatedMoviesQuery
} = moviesApi;
