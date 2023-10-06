import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { arrayOf, bool, func, number, shape, string } from 'prop-types';
import {
  array,
  boolean,
  mixed,
  number as num,
  object,
  string as str,
} from 'yup';
import { Form, Formik } from 'formik';
import { asyncEditProduct } from '../../../../states/products/action';
import DetailsInput from './DetailsInput';
import CategoriesInput from './CategoriesInput';
import VariantsInput from './VariantsInput';

function EditModal({ productData, isEditModalOpen, setIsEditModalOpen }) {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (image && imageURL) URL.revokeObjectURL(imageURL);
  //   setImageURL(
  //     productData.id
  //       ? `${import.meta.env.VITE_API_URL}/products/image/${productData.id}`
  //       : ''
  //   );
  //   setImage(null);
  //   setIsActive(
  //     productData.isActive === undefined ? true : productData.isActive
  //   );
  //   setName(productData.name || '');
  //   setDescription(productData.description || '');
  //   setSelectedCategories(productData.Categories?.map(({ id }) => id) || []);
  //   setVariants(
  //     productData.Variants
  //       ? JSON.parse(JSON.stringify(productData.Variants))
  //       : []
  //   );
  // }, [productData, isEditModalOpen]);

  // useEffect(() => {
  //   if (image) {
  //     if (imageURL) {
  //       // Release the object URL when it's no longer needed to free up resources
  //       URL.revokeObjectURL(imageURL);
  //     }
  //     setImageURL(URL.createObjectURL(image));
  //   }
  // }, [image]);

  // const handleSave = () => {
  //   const formData = new FormData();
  //   if (image) formData.append('image', image);
  //   if (isActive !== productData.isActive)
  //     formData.append('isActive', isActive);
  //   if (name !== productData.name) formData.append('name', name);
  //   if (description !== productData.description)
  //     formData.append('description', description);
  //   formData.append('categoryId', JSON.stringify(selectedCategories));
  //   formData.append(
  //     'variants',
  //     JSON.stringify(
  //       variants.map(({ id, name: varName, price, stock }) => ({
  //         id,
  //         name: varName,
  //         price,
  //         stock,
  //       }))
  //     )
  //   );
  //   dispatch(asyncEditProduct({ productId: productData.id, formData })).then(
  //     (isSuccess) => {
  //       if (isSuccess) setIsEditModalOpen(false);
  //     }
  //   );
  // };

  const initialTouched = {
    isActive: true,
  };

  const initialValues = {
    name: productData.name || '',
    isActive: productData.isActive || true,
    image: null,
    imageURL: productData.id
      ? `${import.meta.env.VITE_API_URL}/products/image/${productData.id}`
      : '',
    description: productData.description || '',
    selectedCategories:
      productData.Categories?.map((category) => category.id) || [],
    variants:
      productData.Variants?.map(({ id, name, price, stock }) => ({
        id,
        name,
        price,
        stock,
      })) || [],
  };

  const validationSchema = object({
    name: str().required(),
    isActive: boolean().required(),
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
    description: str().required(),
    selectedCategories: array().of(num().integer().min(1)),
    variants: array().of(
      object({
        name: str().required(),
        price: num().integer().min(0).required(),
        stock: num().integer().min(0).required(),
      })
    ),
  });

  const onSubmit = (values, { resetForm }) => {
    const formData = new FormData();
    if (values.image) formData.append('image', values.image);
    if (values.name !== productData.name) formData.append('name', values.name);
    if (values.description !== productData.description)
      formData.append('description', values.description);
    formData.append('isActive', values.isActive);
    formData.append('categoryId', JSON.stringify(values.selectedCategories));
    formData.append('variants', JSON.stringify(values.variants));
    dispatch(asyncEditProduct({ productId: productData.id, formData })).then(
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
        {...{ initialTouched, initialValues, validationSchema, onSubmit }}
      >
        {(formik) => (
          <Form>
            <DialogTitle>Edit Product</DialogTitle>
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

EditModal.propTypes = {
  productData: shape({
    id: number,
    isActive: bool,
    name: string,
    description: string,
    Categories: arrayOf(shape({ id: number })),
    Variants: arrayOf(
      shape({
        id: number,
        name: string,
        price: number,
        stock: number,
      })
    ),
  }).isRequired,
  isEditModalOpen: bool.isRequired,
  setIsEditModalOpen: func.isRequired,
};

export default EditModal;
