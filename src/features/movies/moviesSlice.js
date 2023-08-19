import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    items: [],
    status: 'idle',
    error: null,
    currentPage: 1
};

// Fetch upcoming movies thunk
export const fetchUpcomingMovies = createAsyncThunk(
    'movies/fetchUpcomingMovies',
    async (_, { getState }) => {
        const { currentPage } = getState().movies;
        const response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=30c1ff47324a6c46a24f4272a60ba4d9&page=${currentPage}`);
        return response.data.results;
    }
);

// Search movies thunk
export const searchMovies = createAsyncThunk(
    'movies/searchMovies',
    async (query, { getState }) => {
        const { currentPage } = getState().movies;
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=30c1ff47324a6c46a24f4272a60ba4d9&page=${currentPage}`);
        return response.data.results;
    }
);

const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {resetMovies: (state) => {
            state.items = [];
            state.currentPage = 1;
            state.status = 'idle';
            state.error = null;
        }},
    extraReducers: (builder) => {
        builder
            // Fetch Upcoming Movies
            .addCase(fetchUpcomingMovies.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Append new movies to the existing movies
                state.items = [...state.items, ...action.payload];
                // Increment the current page
                state.currentPage += 1;
            })
            .addCase(fetchUpcomingMovies.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // Search Movies
            .addCase(searchMovies.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(searchMovies.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Append new movies to the existing movies
                state.items = [...state.items, ...action.payload];
                // Increment the current page
                state.currentPage += 1;
            })
            .addCase(searchMovies.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});
export const { resetMovies } = movieSlice.actions;
export default movieSlice.reducer;