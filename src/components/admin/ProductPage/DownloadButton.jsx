import { DownloadRounded } from '@mui/icons-material';
import { Button, Tooltip } from '@mui/material';

function DownloadButton() {
  return (
    <Tooltip title="Download product list" arrow>
      <Button
        color="info"
        size="small"
        variant="outlined"
        startIcon={<DownloadRounded />}
      >
        Download
      </Button>
    </Tooltip>
  );
}

export default DownloadButton;
