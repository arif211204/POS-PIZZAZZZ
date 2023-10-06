import { Avatar, Box, IconButton, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';

function ItemSidebar({ children, text, to }) {
  return (
    <Box display="flex" justifyContent="center">
      <IconButton
        sx={{
          bgcolor: 'error.main',
          '&, & .MuiAvatar-root': {
            color: 'white',
          },
          borderRadius: 2,
          '&:hover': {
            bgcolor: 'white',
            '&, & .MuiAvatar-root': {
              color: 'error.main',
            },
          },
        }}
      >
        <Tooltip title={text} placement="top" arrow>
          <Link to={to}>
            <Avatar
              sx={{
                color: 'grey',
                bgcolor: 'inherit',
              }}
            >
              {children}
            </Avatar>
          </Link>
        </Tooltip>
      </IconButton>
    </Box>
  );
}

export default ItemSidebar;
