import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { MenuRounded, NotificationsRounded } from '@mui/icons-material';
import { useState } from 'react';
import ContainerSidebar from './ContainerSidebar';

function CashierNavbar() {
  const authUser = useSelector((states) => states.authUser);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: 'white' }}>
        <Toolbar
          py="1em"
          component={Stack}
          direction="row"
          spacing={{ xs: 1, md: 3 }}
        >
          <IconButton onClick={() => setIsSidebarOpen(true)}>
            <MenuRounded />
          </IconButton>
          <Box>
            <Stack display={{ xs: 'none', md: 'flex' }}>
              <Typography
                color="black"
                fontWeight="bold"
                fontSize="2em"
                fontFamily="inherit"
              >
                Welcome Back 👋
              </Typography>
              <Typography color="grey" fontFamily="inherit">
                You can manage customer orders easily
              </Typography>
            </Stack>
          </Box>
          <Box flexGrow={1}>
            <TextField
              color="info"
              size="small"
              label="Search Products 🔍"
              variant="outlined"
              fullWidth
              // value=""
              // onChange={}
              // onKeyUp={({ key }) => key === 'Enter' && handle()}
            />
          </Box>
          <Stack direction="row" spacing={1}>
            <IconButton>
              <Avatar sx={{ bgcolor: '#EEF2F6' }}>
                <NotificationsRounded className="text-[#121926]" />
              </Avatar>
            </IconButton>
            <Stack
              direction="column"
              spacing={0}
              display={{ xs: 'none', md: 'flex' }}
            >
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

export default CashierNavbar;
