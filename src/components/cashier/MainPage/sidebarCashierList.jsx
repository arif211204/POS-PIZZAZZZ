import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Link } from 'react-router-dom';

export function SidebarAdminListItem({ children, text, to }) {
  return (
    <Link to={to}>
      <ListItem>
        <ListItemButton
          divider
          sx={{
            borderRadius: 2,
            '&:hover': {
              bgcolor: 'error.main',
              '&, & .MuiAvatar-root': {
                color: 'white',
              },
            },
          }}
        >
          <ListItemIcon>
            <ListItemAvatar>
              <Avatar
                sx={{
                  color: 'grey',
                  bgcolor: 'inherit',
                }}
              >
                {children}
              </Avatar>
            </ListItemAvatar>
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
}
