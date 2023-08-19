import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '30c1ff47324a6c46a24f4272a60ba4d9';

export const getUpcomingMovies = async (page = 1) => {
    const response = await axios.get(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`);
    return response.data;
}

export const searchMovies = async (query, page = 1) => {
    const response = await axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}`);
    return response.data;
}
