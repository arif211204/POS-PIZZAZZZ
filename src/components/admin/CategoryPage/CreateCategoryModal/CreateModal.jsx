import { useDispatch } from 'react-redux';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { bool, func } from 'prop-types';
import { Form, Formik } from 'formik';
import { mixed, string, object } from 'yup';
import {
  asyncCreateCategory,
  asyncReceiveCategories,
} from '../../../../states/categories/action';
import DetailsInput from './DetailsInput';

function CreateModal({ isCreateModalOpen, setIsCreateModalOpen }) {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const initialValues = {
    name: '',
    image: null,
    imageURL: '',
  };

  const validationSchema = object({
    name: string().required(),
    image: mixed()
      .required()
      .test('is-file', 'Image must be a file', (value) => value instanceof File)
      .test('is-image', 'File must be an image', (value) =>
        value.type.startsWith('image/')
      )
      .test(
        'file-size',
        'File size must be ≤ 1MB',
        (value) => value.size <= 1024 * 1024 // 1MB = 1024 * 1024 bytes
      ),
  });

  const onSubmit = (values, { resetForm }) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('image', values.image);
    dispatch(asyncCreateCategory(formData)).then((isSuccess) => {
      if (isSuccess) {
        dispatch(asyncReceiveCategories({ name: searchParams.get('name') }));
        URL.revokeObjectURL(values.imageURL);
        resetForm();
        setIsCreateModalOpen(false);
      }
    });
  };

  return (
    <Dialog
      fullWidth
      open={isCreateModalOpen}
      onClose={() => setIsCreateModalOpen(false)}
    >
      <Formik
        validateOnMount
        {...{ initialValues, validationSchema, onSubmit }}
      >
        {(formik) => (
          <Form>
            <DialogTitle>New Category</DialogTitle>
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

CreateModal.propTypes = {
  isCreateModalOpen: bool.isRequired,
  setIsCreateModalOpen: func.isRequired,
};

export default CreateModal;
