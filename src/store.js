import { moviesApi } from './apis/movieApi';
import { actorApi } from './apis/actorApi'; 
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
   
    [moviesApi.reducerPath]: moviesApi.reducer,
    [actorApi.reducerPath]: actorApi.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(moviesApi.middleware)
      .concat(actorApi.middleware), 
});


export default store;
