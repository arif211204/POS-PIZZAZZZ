import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { bool, func } from 'prop-types';
import { Form, Formik } from 'formik';
import { array, boolean, mixed, number, object, string } from 'yup';
import {
  asyncCreateProduct,
  asyncReceiveProducts,
} from '../../../../states/products/action';
import DetailsInput from './DetailsInput';
import CategoriesInput from './CategoriesInput';
import VariantsInput from './VariantsInput';

function CreateModal({ isCreateModalOpen, setIsCreateModalOpen }) {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const initialTouched = {
    isActive: true,
  };

  const initialValues = {
    name: '',
    isActive: true,
    image: null,
    imageURL: '',
    description: '',
    selectedCategories: [],
    variants: [],
  };

  const validationSchema = object({
    name: string().required(),
    isActive: boolean().required(),
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
    description: string().required(),
    selectedCategories: array().of(number().integer().min(1)),
    variants: array().of(
      object({
        name: string().required(),
        price: number().integer().min(0).required(),
        stock: number().integer().min(0).required(),
      })
    ),
  });

  const onSubmit = (values, { resetForm }) => {
    const formData = new FormData();
    formData.append('image', values.image);
    formData.append('isActive', values.isActive);
    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('categoryId', JSON.stringify(values.selectedCategories));
    formData.append('variants', JSON.stringify(values.variants));
    dispatch(asyncCreateProduct(formData)).then((isSuccess) => {
      if (isSuccess) {
        dispatch(
          asyncReceiveProducts({
            name: searchParams.get('name'),
            categoryId: searchParams.get('currCategoryId'),
            sortBy: searchParams.get('sortBy'),
            orderBy: searchParams.get('orderBy'),
            isPaginated: searchParams.get('isPaginated'),
            page: searchParams.get('page'),
            perPage: searchParams.get('perPage'),
          })
        );
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
        {...{ initialTouched, initialValues, validationSchema, onSubmit }}
      >
        {(formik) => (
          <Form>
            <DialogTitle>New Product</DialogTitle>
            <DialogContent>
              <Stack spacing={4}>
                <DetailsInput />
                <CategoriesInput />
                <VariantsInput />
              </Stack>
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
