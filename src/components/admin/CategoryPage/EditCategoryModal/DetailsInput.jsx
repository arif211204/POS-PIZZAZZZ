import {
  Avatar,
  FormControl,
  FormHelperText,
  FormLabel,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';
import { Field } from 'formik';

function DetailsInput() {
  return (
    <Stack spacing={2} component="fieldset">
      <Typography variant="h6" component="legend">
        Category Details
      </Typography>
      <Stack spacing={1.5}>
        {/* Category Name Input */}
        <Field name="name">
          {({ field, meta }) => (
            <FormControl
              fullWidth
              required
              variant="outlined"
              error={meta.touched && !!meta.error}
            >
              <InputLabel htmlFor="name_input">Category name</InputLabel>
              <OutlinedInput
                id="name_input"
                type="text"
                label="Category name"
                inputProps={{ 'aria-label': 'Category name' }}
                aria-describedby="name_helper-text"
                {...field}
              />
              <FormHelperText id="name_helper-text">
                {meta.touched ? meta.error || ' ' : ' '}
              </FormHelperText>
            </FormControl>
          )}
        </Field>

        {/* Category Image Input */}
        <Field name="image">
          {({ form, meta }) => (
            <FormControl
              fullWidth
              required
              variant="outlined"
              error={meta.touched && !!meta.error}
            >
              <FormLabel htmlFor="image_input">Category Image</FormLabel>
              <Avatar
                component="label"
                htmlFor="image_input"
                src={form.values.imageURL}
                alt={meta.value?.name || form.values.name}
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
      </Stack>
    </Stack>
  );
}

export default DetailsInput;
