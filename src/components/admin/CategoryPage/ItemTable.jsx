import { DeleteRounded, EditNoteRounded } from '@mui/icons-material';
import {
  Avatar,
  IconButton,
  Stack,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditModal from './EditCategoryModal/EditModal';
import { asyncDeleteCategory } from '../../../states/categories/action';

function ItemTable() {
  const dispatch = useDispatch();
  const categories = useSelector((states) => states.categories);
  const [categoryData, setCategoryData] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditButton = (category) => {
    setCategoryData(category);
    setIsEditModalOpen(true);
  };

  const handleDeleteButton = (categoryId) => {
    dispatch(asyncDeleteCategory(categoryId));
  };

  return (
    <>
      <TableBody>
        {!categories.length && (
          <TableRow>
            <TableCell colSpan={6}>
              <Typography variant="body2" align="center">
                no data available
              </Typography>
            </TableCell>
          </TableRow>
        )}
        {categories.map((category) => (
          <TableRow key={category.id}>
            <TableCell>{category.id}</TableCell>
            <TableCell>
              <Avatar
                variant="square"
                alt={category.name}
                src={`${import.meta.env.VITE_API_URL}/categories/image/${
                  category.id
                }`}
              />
            </TableCell>
            <TableCell>{category.name}</TableCell>
            <TableCell>{category.total_products} pcs</TableCell>
            <TableCell>
              <Stack direction="row">
                <Tooltip title="Edit category" arrow>
                  <IconButton
                    onClick={() => handleEditButton(category)}
                    sx={{ '&:hover': { color: 'info.main' } }}
                  >
                    <EditNoteRounded />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete category" arrow>
                  <IconButton
                    value="categoryId"
                    onClick={() => handleDeleteButton(category.id)}
                    sx={{ '&:hover': { color: 'error.main' } }}
                  >
                    <DeleteRounded />
                  </IconButton>
                </Tooltip>
              </Stack>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <EditModal {...{ categoryData, isEditModalOpen, setIsEditModalOpen }} />
    </>
  );
}

export default ItemTable;
