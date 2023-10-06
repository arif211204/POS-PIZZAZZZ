import { useDispatch } from 'react-redux';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { bool, func, number, shape, string } from 'prop-types';
import { object, mixed, string as str } from 'yup';
import { Form, Formik } from 'formik';
import DetailsInput from './DetailsInput';
import { asyncEditCategory } from '../../../../states/categories/action';

function EditModal({ categoryData, isEditModalOpen, setIsEditModalOpen }) {
  const dispatch = useDispatch();

  const initialValues = {
    name: categoryData.name || '',
    image: null,
    imageURL: categoryData.id
      ? `${import.meta.env.VITE_API_URL}/categories/image/${categoryData.id}`
      : '',
  };

  const validationSchema = object({
    name: str().required(),
    image: mixed()
      .nullable()
      .test('is-file', 'Image must be a file', (value) => {
        if (!value) return true;
        return value instanceof File;
      })
      .test('is-image', 'File must be an image', (value) => {
        if (!value) return true;
        return value.type.startsWith('image/');
      })
      .test('file-size', 'File size must be ≤ 1MB', (value) => {
        if (!value) return true;
        return value.size <= 1024 * 1024; // 1MB = 1024 * 1024 bytes
      }),
  });

  const onSubmit = (values, { resetForm }) => {
    const formData = new FormData();
    if (values.name !== categoryData.name) formData.append('name', values.name);
    if (values.image) formData.append('image', values.image);
    dispatch(asyncEditCategory({ categoryId: categoryData.id, formData })).then(
      (isSuccess) => {
        if (isSuccess) {
          URL.revokeObjectURL(values.imageURL);
          resetForm();
          setIsEditModalOpen(false);
        }
      }
    );
  };

  return (
    <Dialog
      fullWidth
      open={isEditModalOpen}
      onClose={() => setIsEditModalOpen(false)}
    >
      <Formik
        validateOnMount
        {...{ initialValues, validationSchema, onSubmit }}
      >
        {(formik) => (
          <Form>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogContent>
              <DetailsInput />
            </DialogContent>
            <DialogActions>
              <Button
                type="submit"
                color="error"
                variant="contained"
                disabled={!formik.isValid || !formik.dirty}
              >
                Save
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}

EditModal.propTypes = {
  categoryData: shape({
    id: number,
    name: string,
  }).isRequired,
  isEditModalOpen: bool.isRequired,
  setIsEditModalOpen: func.isRequired,
};

export default EditModal;
