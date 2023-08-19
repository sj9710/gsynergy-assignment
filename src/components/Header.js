import React, { useState,useCallback } from 'react';
import PropTypes from 'prop-types';
import { TextField, AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';

function Header({ onSearch, movieTitle, initialQuery }) {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const debouncedSearch = useCallback(
        debounce((value) => {
            if (value.trim() === '') {
                onSearch();
            } else {
                onSearch(value);
            }
        }, 1500),
        [onSearch]
      );

      const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value.trim() === '') {
            debouncedSearch.cancel();
            onSearch();
        } else {
            debouncedSearch(value);
        }
    };

    const handleHomeClick = () => {
        navigate('/');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Box display="flex" alignItems="center" flexGrow={1}>
                    {location.pathname.includes('movie') ? (
                        <>
                            <IconButton edge="start" color="inherit" aria-label="home" onClick={() => navigate('/')}>
                    <HomeIcon />
                </IconButton>
                            <Typography variant="h6" component="div" ml={2}>
                                {movieTitle}
                            </Typography>
                        </>
                    ) : (
                        <Typography variant="h6" component="div">
                            Movies
                        </Typography>
                    )}
                </Box>
                {location.pathname === '/' && (
                    <TextField 
                        variant="outlined"
                        size="medium"
                        value={searchTerm}
                        onChange={handleInputChange}
                        placeholder="Search movies..."
                    />
                )}
            </Toolbar>
        </AppBar>
    );
}

Header.propTypes = {
    onSearch: PropTypes.func.isRequired,
    movieTitle: PropTypes.string
};

export default Header;

