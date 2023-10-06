import { Box, Typography } from '@mui/material';

function PageHeader() {
  return (
    <Box>
      <Typography
        variant="h5"
        sx={{
          color: '#364152',
          fontWeight: 'bold',
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        Product
      </Typography>
    </Box>
  );
}

export default PageHeader;
