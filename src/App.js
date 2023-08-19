import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import MovieList from './pages/MovieList';
import MovieDetails from './pages/MovieDetails';
import { Container } from '@mui/material';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Container maxWidth="lg">
                    <Routes>
                        <Route path="/" element={<MovieList />} />
                        <Route path="/movie/:id" element={<MovieDetails />} />
                    </Routes>
                </Container>
            </Router>
        </Provider>
    );
}

export default App;