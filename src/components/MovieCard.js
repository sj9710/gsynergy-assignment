import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function MovieCard({ movie }) {
    return (
        <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
            <Card>
                <CardMedia
                    component="img"
                    alt={movie.title}
                    height="140"
                    image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {movie.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Rating: {movie.vote_average}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {movie.overview.slice(0, 100)}...
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    );
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        vote_average: PropTypes.number.isRequired,
        overview: PropTypes.string.isRequired,
        poster_path: PropTypes.string.isRequired,
    }).isRequired,
};

export default MovieCard;
