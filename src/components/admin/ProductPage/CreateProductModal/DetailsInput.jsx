import {
  Avatar,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  OutlinedInput,
  Stack,
  Switch,
  Tooltip,
  Typography,
} from '@mui/material';
import { Field } from 'formik';

function DetailsInput() {
  return (
    <Stack spacing={2} component="fieldset">
      <Typography variant="h6" component="legend">
        Product Details
      </Typography>
      <Stack spacing={1.5}>
        {/* Product status input */}
        <Field name="isActive">
          {({ field, meta }) => (
            <FormControl
              fullWidth
              required
              variant="outlined"
              error={meta.touched && !!meta.error}
              sx={{ alignItems: 'start' }}
            >
              <FormLabel htmlFor="isActive_input">Product status</FormLabel>
              <FormControlLabel
                sx={{ m: 0 }}
                control={
                  <Tooltip
                    title={meta.value ? 'Active' : 'Inactive'}
                    placement={meta.value ? 'right' : 'left'}
                  >
                    <Switch
                      id="isActive_input"
                      checked={meta.value}
                      {...field}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: 'success.light',
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track':
                          {
                            backgroundColor: 'success.light',
                          },
                      }}
                    />
                  </Tooltip>
                }
              />
            </FormControl>
          )}
        </Field>

        {/* Product image input */}
        <Field name="image">
          {({ form, meta }) => (
            <FormControl
              fullWidth
              required
              variant="outlined"
              error={meta.touched && !!meta.error}
            >
              <FormLabel htmlFor="image_input">Product Image</FormLabel>
              <Avatar
                component="label"
                htmlFor="image_input"
                src={form.values.imageURL}
                alt={meta.value?.name}
                variant="square"
                sx={{
                  width: '10rem',
                  height: '10rem',
                  cursor: 'pointer',
                  '&:hover': { opacity: 0.8 },
                }}
              />
              <input
                hidden
                id="image_input"
                type="file"
                accept="image/*"
                aria-label="Category image"
                aria-describedby="image_helper-text"
                onChange={async ({ target }) => {
                  await form.setFieldValue('image', target.files[0] || null); // Set image
                  URL.revokeObjectURL(form.values.imageURL); // Release the object URL when no longer needed to free up resources
                  await form.setFieldValue(
                    'imageURL', // imageURL for image preview
                    target.files[0]
                      ? URL.createObjectURL(target.files[0])
                      : form.initialValues.imageURL
                  ); // Set imageURL
                  await form.setFieldTouched('image', true);
                }}
              />
              <FormHelperText id="image_helper-text">
                {meta.touched ? meta.error || ' ' : ' '}
              </FormHelperText>
            </FormControl>
          )}
        </Field>

        {/* Product name input */}
        <Field name="name">
          {({ field, meta }) => (
            <FormControl
              fullWidth
              required
              variant="outlined"
              error={meta.touched && !!meta.error}
            >
              <InputLabel htmlFor="name_input">Product name</InputLabel>
              <OutlinedInput
                id="name_input"
                type="text"
                label="Product name"
                inputProps={{ 'aria-label': 'Product name' }}
                aria-describedby="name_helper-text"
                {...field}
              />
              <FormHelperText id="name_helper-text">
                {meta.touched ? meta.error || ' ' : ' '}
              </FormHelperText>
            </FormControl>
          )}
        </Field>

        {/* Product description input */}
        <Field name="description">
          {({ field, meta }) => (
            <FormControl
              fullWidth
              required
              variant="outlined"
              error={meta.touched && !!meta.error}
            >
              <InputLabel htmlFor="description_input">
                Product description
              </InputLabel>
              <OutlinedInput
                id="description_input"
                type="text"
                label="Product description"
                multiline
                rows={15}
                inputProps={{ 'aria-label': 'Product description' }}
                aria-describedby="description_helper-text"
                {...field}
              />
              <FormHelperText id="description_helper-text">
                {meta.touched ? meta.error || ' ' : ' '}
              </FormHelperText>
            </FormControl>
          )}
        </Field>
      </Stack>
    </Stack>
  );
}

export default DetailsInput;
