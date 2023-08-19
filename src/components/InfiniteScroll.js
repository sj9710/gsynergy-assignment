import React, { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MovieCard from './MovieCard';
import { fetchUpcomingMovies, searchMovies } from '../features/movies/moviesSlice';
import Skeleton from '@mui/material/Skeleton';
import { Grid } from '@mui/material';

function InfiniteScroll({ searchQuery }) {
    const dispatch = useDispatch();
    const movies = useSelector((state) => state.movies.items);
    const status = useSelector((state) => state.movies.status);
    const observer = useRef();

    const lastMovieElementRef = useCallback(node => {
        if (status === 'loading' || status !== 'succeeded') return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && status === 'succeeded') {
                if (searchQuery) {
                    dispatch(searchMovies(searchQuery));
                } else {
                    dispatch(fetchUpcomingMovies());
                }
            }
        })
        if (node) observer.current.observe(node);
    }, [status, dispatch, searchQuery]);

    useEffect(() => {
        if (movies.length === 0 && status !== 'loading') {
            if (searchQuery) {
                dispatch(searchMovies(searchQuery));
            } else {
                dispatch(fetchUpcomingMovies());
            }
        }
    }, [searchQuery, dispatch, movies.length, status]);
    

return (
    <Grid container spacing={2}>
        {movies.map((movie, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={`${movie.id}-${index}`} ref={index === movies.length - 1 ? lastMovieElementRef : null}>
                <MovieCard movie={movie} />
            </Grid>
        ))}
        {status === 'loading' && (
            <Grid container spacing={2}>
            {[...Array(4)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Skeleton variant="rectangular" width="100%" height={200} />
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="text" width="40%" />
                <Skeleton variant="text" width="80%" />
            </Grid>
            ))}
            </Grid>
        )}
    </Grid>
);
}

export default InfiniteScroll;