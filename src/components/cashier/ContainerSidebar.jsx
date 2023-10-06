import {
  AdminPanelSettingsRounded,
  DescriptionRounded,
  GridViewRounded,
  LogoutRounded,
  StoreRounded,
} from '@mui/icons-material';
import { Avatar, Drawer, IconButton, Stack } from '@mui/material';
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
      <Stack direction="column" spacing={5} color="grey" m="1em">
        <IconButton disabled>
          <Avatar sx={{ bgcolor: 'error.main' }}>
            <StoreRounded />
          </Avatar>
        </IconButton>
        <Stack direction="column" spacing={10}>
          <Stack direction="column" spacing={2}>
            <ItemSidebar text="Menu" to="/cashier/main">
              <GridViewRounded />
            </ItemSidebar>
            <ItemSidebar text="Report" to="/cashier/report">
              <DescriptionRounded />
            </ItemSidebar>
          </Stack>
          {authUser?.isAdmin && (
            <ItemSidebar text="Admin Page" to="/admin">
              <AdminPanelSettingsRounded />
            </ItemSidebar>
          )}
          <ItemSidebar text="Logout" to="/logout">
            <LogoutRounded />
          </ItemSidebar>
        </Stack>
      </Stack>
    </Drawer>
  );
}

export default ContainerSidebar;
