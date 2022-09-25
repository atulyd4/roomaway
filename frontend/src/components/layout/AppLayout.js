import { Box, Grid, IconButton } from '@mui/material';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardSidebar from './Dasboardsidenavbar';
import useResponsive from './useResponsive';

function AppLayout() {
  const isMobile = useResponsive('down', 'sm');
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  const onClose = () => setIsOpenSidebar(false);
  const onOpen = () => setIsOpenSidebar(true)

  return (
    <Grid container id="app">
      <Box id="sidebar" style={{ marginRight:isMobile?0:20 }}>
        <DashboardSidebar isOpenSidebar={isOpenSidebar} onCloseSidebar={onClose} onOpen={onOpen}  />
      </Box>
      <Box id="content" flex={1} flexGrow={1} padding={isMobile? 0 : 5} paddingTop={isMobile?7:0} paddingBottom={isMobile?2:0} >
        <Outlet />
      </Box>
    </Grid>
  );
}

export default AppLayout;
