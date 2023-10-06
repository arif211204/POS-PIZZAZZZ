import {
  AssessmentRounded,
  CategoryRounded,
  DashboardRounded,
  Inventory2Rounded,
  LogoutRounded,
  SettingsRounded,
  ShoppingCartRounded,
  StoreRounded,
  SupervisorAccountRounded,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Drawer,
  IconButton,
  List,
  Stack,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import ItemSidebar from './ItemSidebar';

function ContainerSidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const authUser = useSelector((states) => states.authUser);

  return (
    <Drawer
      anchor="left"
      open={isSidebarOpen}
      onClose={() => setIsSidebarOpen(false)}
    >
      <Stack
        direction="column"
        spacing={1}
        color="grey"
        width={{ xs: '50vw', md: '20vw' }}
        my="1em"
      >
        <IconButton disabled>
          <Avatar sx={{ bgcolor: 'error.main' }}>
            <StoreRounded />
          </Avatar>
        </IconButton>
        <Box>
          <Typography marginX="auto" variant="body2" className="max-w-[90%]">
            MANAGE
          </Typography>
          <List>
            <ItemSidebar text="Dashboard" to="/admin">
              <DashboardRounded />
            </ItemSidebar>
            <ItemSidebar text="Products" to="/admin/products">
              <Inventory2Rounded />
            </ItemSidebar>
            <ItemSidebar text="Categories" to="/admin/categories">
              <CategoryRounded />
            </ItemSidebar>
            <ItemSidebar text="Report" to="/admin/report">
              <AssessmentRounded />
            </ItemSidebar>
          </List>
        </Box>
        <Box>
          <Typography marginX="auto" variant="body2" className="max-w-[90%]">
            PREFERENCES
          </Typography>
          <List>
            <ItemSidebar text="Admin Settings" to="/admin/administrator">
              <SupervisorAccountRounded />
            </ItemSidebar>
            <ItemSidebar text="General" to="/admin/general">
              <SettingsRounded />
            </ItemSidebar>
          </List>
        </Box>
        {authUser?.isCashier && (
          <Box>
            <List>
              <ItemSidebar text="Cashier Page" to="/cashier">
                <ShoppingCartRounded />
              </ItemSidebar>
            </List>
          </Box>
        )}
        <Box>
          <List>
            <ItemSidebar text="Logout" to="/logout">
              <LogoutRounded />
            </ItemSidebar>
          </List>
        </Box>
      </Stack>
    </Drawer>
  );
}

export default ContainerSidebar;
