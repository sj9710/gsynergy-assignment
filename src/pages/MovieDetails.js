import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import axios from 'axios';
import { 
    Container, 
    Typography, 
    Button, 
    Card, 
    CardMedia, 
    CardContent,
    Grid 
} from '@mui/material';

function MovieDetails() {
    const { id } = useParams();
    const { movieId } = useParams();
    const [movieDetails, setMovieDetails] = useState(null);
    const movie = useSelector((state) => state.movies.items.find(m => m.id === parseInt(movieId)));
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=30c1ff47324a6c46a24f4272a60ba4d9`);
                setMovieDetails(response.data);
            } catch (error) {
                console.error("Error fetching movie details:", error);
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (!movieDetails) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Container maxWidth="lg">
            <Header movieTitle={movieDetails.title} />
            <Grid container spacing={3} style={{ marginTop: '20px' }}>
                <Grid item xs={12} md={4}>
                    <CardMedia
                        component="img"
                        alt={movieDetails.title}
                        image={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                        title={movieDetails.title}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="div">{movieDetails.title}</Typography>
                            <Typography variant="subtitle1" color="text.secondary">Rating: {movieDetails.vote_average}</Typography>
                            <Typography variant="subtitle1" color="text.secondary">Year: {new Date(movieDetails.release_date).getFullYear()}</Typography>
                            <Typography variant="body2" color="text.secondary" style={{ marginTop: '20px' }}>{movieDetails.overview}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}

MovieDetails.propTypes = {
    id: PropTypes.string.isRequired,
    movieId: PropTypes.string.isRequired
}

export default MovieDetails;
