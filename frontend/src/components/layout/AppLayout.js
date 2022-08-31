import { Box, Grid } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardSidebar from './Dasboardsidenavbar';

function AppLayout() {
  return (
    <Grid container id="app">
      <Box id="sidebar" style={{ marginRight: 20 }}>
        <DashboardSidebar />
      </Box>
      <Box id="content" flex={1} flexGrow={1} padding={5}>
        <Outlet />
      </Box>
    </Grid>
  );
}

export default AppLayout;
