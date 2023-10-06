import {
  AddCircleRounded,
  DeleteRounded,
  ExpandMoreRounded,
} from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { Field, FieldArray } from 'formik';

function VariantsInput() {
  return (
    <FieldArray name="variants">
      {({ form, name, remove, push }) => (
        <Stack spacing={2} component="fieldset">
          <Typography variant="h6" component="legend">
            Product Variants
          </Typography>
          <Box>
            {form.values[name].map((variant, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Accordion key={index}>
                <AccordionSummary expandIcon={<ExpandMoreRounded />}>
                  <Typography>{variant.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack direction="column" spacing={2}>
                    {/* Product variant name input */}
                    <Field name={`variants[${index}].name`}>
                      {({ field, meta }) => (
                        <FormControl
                          fullWidth
                          required
                          variant="outlined"
                          size="small"
                          error={meta.touched && !!meta.error}
                        >
                          <InputLabel htmlFor={`variant[${index}]-name_input`}>
                            Variant name
                          </InputLabel>
                          <OutlinedInput
                            id={`variant[${index}]-name_input`}
                            type="text"
                            label="Variant name"
                            inputProps={{
                              'aria-label': `Variant[${index}] name`,
                            }}
                            aria-describedby={`variant[${index}]-name_helper-text`}
                            {...field}
                          />
                          <FormHelperText
                            id={`variant[${index}]-name_helper-text`}
                          >
                            {meta.touched ? meta.error || ' ' : ' '}
                          </FormHelperText>
                        </FormControl>
                      )}
                    </Field>

                    {/* Product variant price input */}
                    <Field name={`variants[${index}].price`}>
                      {({ field, meta }) => (
                        <FormControl
                          fullWidth
                          required
                          variant="outlined"
                          size="small"
                          error={meta.touched && !!meta.error}
                        >
                          <InputLabel htmlFor={`variant[${index}]-price_input`}>
                            Variant price
                          </InputLabel>
                          <OutlinedInput
                            id={`variant[${index}]-price_input`}
                            type="number"
                            label="Variant price"
                            aria-describedby={`variant[${index}]-price_helper-text`}
                            inputProps={{
                              min: 0,
                              step: 1,
                              'aria-label': `Variant[${index}] price`,
                            }}
                            startAdornment={
                              <InputAdornment position="start">
                                Rp
                              </InputAdornment>
                            }
                            {...field}
                          />
                          <FormHelperText
                            id={`variant[${index}]-price_helper-text`}
                          >
                            {meta.touched ? meta.error || ' ' : ' '}
                          </FormHelperText>
                        </FormControl>
                      )}
                    </Field>

                    {/* Product variant stock input */}
                    <Field name={`variants[${index}].stock`}>
                      {({ field, meta }) => (
                        <FormControl
                          fullWidth
                          required
                          variant="outlined"
                          size="small"
                          error={meta.touched && !!meta.error}
                        >
                          <InputLabel htmlFor={`variant[${index}]-stock_input`}>
                            Variant stock
                          </InputLabel>
                          <OutlinedInput
                            id={`variant[${index}]-stock_input`}
                            type="number"
                            label="Variant stock"
                            aria-describedby={`variant[${index}]-stock_helper-text`}
                            inputProps={{
                              min: 0,
                              step: 1,
                              'aria-label': `Variant[${index}] stock`,
                            }}
                            startAdornment={
                              <InputAdornment position="start">
                                📦
                              </InputAdornment>
                            }
                            {...field}
                          />
                          <FormHelperText
                            id={`variant[${index}]-stock_helper-text`}
                          >
                            {meta.touched ? meta.error || ' ' : ' '}
                          </FormHelperText>
                        </FormControl>
                      )}
                    </Field>

                    {/* Delete button */}
                    <Box display="flex" justifyContent="center">
                      <Tooltip title="Delete variant" placement="right" arrow>
                        <IconButton
                          color="error"
                          size="large"
                          onClick={() => remove(index)}
                        >
                          <DeleteRounded />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Stack>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>

          {/* Add button */}
          <Box display="flex" justifyContent="center">
            <Tooltip title="Add variant" arrow>
              <IconButton
                color="error"
                size="large"
                onClick={() => push({ name: '', price: 0, stock: 0 })}
              >
                <AddCircleRounded color="error" fontSize="large" />
              </IconButton>
            </Tooltip>
          </Box>
        </Stack>
      )}
    </FieldArray>
  );
}

export default VariantsInput;
