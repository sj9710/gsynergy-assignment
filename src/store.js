import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './features/movies/moviesSlice';

const store = configureStore({
    reducer: {
        movies: movieReducer
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export default store;
