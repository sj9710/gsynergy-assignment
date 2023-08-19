import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUpcomingMovies, searchMovies, resetMovies } from '../features/movies/moviesSlice';
import MovieCard from '../components/MovieCard';
import Header from '../components/Header';
import { Box, Container, Skeleton } from '@mui/material';
import InfiniteScroll from '../components/InfiniteScroll';

function MovieList() {
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState('');
    const movies = useSelector((state) => state.movies.items);
    const movieStatus = useSelector((state) => state.movies.status);
    const MovieCardSkeleton = () => (
        <Box>
            <Skeleton variant="rectangular" width="100%" height={200} />
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="40%" />
            <Skeleton variant="text" width="80%" />
        </Box>
    );

    const handleSearch = (query) => {
        // Reset movies before performing a new search
        dispatch(resetMovies());
    
        if (query === undefined) {
            dispatch(fetchUpcomingMovies());
        } else {
            dispatch(searchMovies(query));
        }
    };

    let content;
    if (movieStatus === 'idle' || movieStatus === 'succeeded' || movieStatus === 'loading') {
        content = <InfiniteScroll searchQuery={searchQuery} />;
    } else if (movieStatus === 'failed') {
        content = <div>Error fetching movies</div>;
    }

    return (
        <Container>
            <Header onSearch={handleSearch} />
            <Box mt={3}>
                {content}
            </Box>
        </Container>
    );
}

MovieList.propTypes = {
    movies: PropTypes.array.isRequired,
    movieStatus: PropTypes.string.isRequired,
    handleSearch: PropTypes.func.isRequired
}

export default MovieList;
