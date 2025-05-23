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
import logo from "../assets/Images/logo.png";

const colors = {
  primary: '#2A5C99',
  teal: '#3AA8A8',
  white: '#FFFFFF',
  softGreen: '#7CB342',
  lightGray: '#F5F5F5',
  coralRed: '#FF6B6B',
  darkGray: '#333333',
  lightBlue: '#E3F2FD',
};

const Navbar = ({ onNavigate, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: colors.primary }}>
      <Toolbar>
        <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src={logo} alt="Logo" height={40} style={{ marginRight: 16 }} />
          <Typography variant="h6" sx={{ color: colors.white, fontWeight: 700 }}>
            Patient Management
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          variant="contained"
          sx={{
            backgroundColor: colors.teal,
            color: colors.white,
            fontWeight: '700',
            '&:hover': { backgroundColor: colors.softGreen },
          }}
          onClick={() => onNavigate('add')}
        >
          Add New Patient
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
