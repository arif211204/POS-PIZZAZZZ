import { AddCircleRounded } from '@mui/icons-material';
import { Button, Tooltip } from '@mui/material';
import { useState } from 'react';
import CreateModal from './CreateProductModal/CreateModal';

function CreateButton() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <>
      <Tooltip title="Add new product" arrow>
        <Button
          color="error"
          size="small"
          variant="contained"
          startIcon={<AddCircleRounded />}
          onClick={() => setIsCreateModalOpen(true)}
        >
          Product
        </Button>
      </Tooltip>
      <CreateModal {...{ isCreateModalOpen, setIsCreateModalOpen }} />
    </>
  );
}

export default CreateButton;
