import {
  AssessmentRounded,
  CategoryRounded,
  DashboardRounded,
  Inventory2Rounded,
  LogoutRounded,
  SettingsRounded,
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
import { SidebarAdminListItem } from './sidebarCashierList';

function SidebarCashier({ isSidebarOpen, setIsSidebarOpen }) {
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
            <SidebarAdminListItem text="Dashboard" to="/">
              <DashboardRounded />
            </SidebarAdminListItem>
            <SidebarAdminListItem text="Products" to="/">
              <Inventory2Rounded />
            </SidebarAdminListItem>
            <SidebarAdminListItem text="Categories" to="/categories">
              <CategoryRounded />
            </SidebarAdminListItem>
            <SidebarAdminListItem text="Report" to="/admin-report">
              <AssessmentRounded />
            </SidebarAdminListItem>
          </List>
        </Box>
        <Box>
          <Typography marginX="auto" variant="body2" className="max-w-[90%]">
            PREFERENCES
          </Typography>
          <List>
            <SidebarAdminListItem text="Admin Settings" to="/admin">
              <SupervisorAccountRounded />
            </SidebarAdminListItem>
            <SidebarAdminListItem text="General" to="/">
              <SettingsRounded />
            </SidebarAdminListItem>
          </List>
        </Box>
        <Box>
          <List>
            <SidebarAdminListItem text="Logout" to="/logout">
              <LogoutRounded />
            </SidebarAdminListItem>
          </List>
        </Box>
      </Stack>
    </Drawer>
  );
}

export default SidebarCashier;
