import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { MenuRounded, NotificationsRounded } from '@mui/icons-material';
import { useState } from 'react';
import ContainerSidebar from './ContainerSidebar';

function AdminNavbar() {
  const authUser = useSelector((states) => states.authUser);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: 'white' }}>
        <Toolbar>
          <IconButton onClick={() => setIsSidebarOpen(true)}>
            <MenuRounded />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Stack direction="row" spacing={1}>
            <IconButton>
              <Avatar sx={{ bgcolor: '#EEF2F6' }}>
                <NotificationsRounded className="text-[#121926]" />
              </Avatar>
            </IconButton>
            <Stack direction="column" spacing={0}>
              <Typography variant="h6" align="right" color="black">
                {authUser.fullname}
              </Typography>
              <Typography variant="body2" align="right" color="#697586">
                {authUser.isCashier ? 'Admin | Cashier' : 'Admin'}
              </Typography>
            </Stack>
            <IconButton>
              <Avatar
                alt={authUser.fullname}
                src={`${import.meta.env.VITE_API_URL}/users/image/${
                  authUser.id
                }`}
                sx={{ bgcolor: 'error.main' }}
              />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
      <ContainerSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
    </>
  );
}
export default AdminNavbar;
