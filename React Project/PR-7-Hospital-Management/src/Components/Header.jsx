import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  InputBase,
  alpha,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import logo from "../assets/Images/logo.png"

const colors = {
  primary: '#2A5C99',       // Deep Blue
  teal: '#3AA8A8',          // Teal
  white: '#FFFFFF',         // White
  softGreen: '#7CB342',     // Soft Green
  lightGray: '#F5F5F5',     // Light Gray
  coralRed: '#FF6B6B',      // Coral Red
  darkGray: '#333333',      // Dark Gray
  lightBlue: '#E3F2FD',     // Light Blue
};

const Navbar = ({ onNavigate, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: colors.primary,
        boxShadow: `0 4px 12px ${alpha(colors.primary, 0.7)}`,
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          px: { xs: 2, md: 6 },
          color: colors.white,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link to={"/"}><Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              letterSpacing: 1.2,
              color: colors.white,
              mr: 4,
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              userSelect: 'none',
              
            }}
          >
            <img src={logo} style={{ width: 180, height: 40, objectFit: 'contain' }} />
          </Typography></Link>

          <Link to={"/add"}><Button
            variant="contained"
            onClick={() => onNavigate('add')}
            sx={{
              backgroundColor: colors.teal,
              color: colors.white,
              fontWeight: '700',
              '&:hover': {
                backgroundColor: colors.softGreen,
              },
            }}
          >
            Add New Patient
          </Button></Link>
        </Box>

        {/* Search Box */}
        <Box
          sx={{
            position: 'relative',
            borderRadius: 2,
            backgroundColor: alpha(colors.white, 0.15),
            '&:hover': { backgroundColor: alpha(colors.white, 0.25) },
            width: { xs: '100%', sm: 280 },
            display: 'flex',
            alignItems: 'center',
            px: 2,
            py: 0.5,
            boxShadow: `0 2px 8px ${alpha(colors.white, 0.15)}`,
          }}
        >
          <SearchIcon sx={{ color: colors.white, mr: 1 }} />
          <InputBase
            placeholder="Search Patients..."
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{
              color: colors.white,
              width: '100%',
              fontWeight: 500,
              fontSize: 16,
            }}
            inputProps={{ 'aria-label': 'search patients' }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
