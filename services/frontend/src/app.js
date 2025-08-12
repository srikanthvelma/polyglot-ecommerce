import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from './components/sidebar';
import Router from './components/router';

export default function App() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Router />
      </Box>
    </Box>
  );
}
