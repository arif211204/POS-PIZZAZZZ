import {
  Checkbox,
  FormControl,
  FormGroup,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { FieldArray } from 'formik';
import { useSelector } from 'react-redux';

function CategoriesInput() {
  const categories = useSelector((states) => states.categories);

  return (
    <FieldArray name="selectedCategories">
      {({ form, name, remove, push }) => (
        <FormControl component="fieldset">
          <Typography variant="h6" component="legend">
            Product Categories
          </Typography>
          <FormGroup>
            <List>
              {categories.map((category) => (
                <ListItem key={category.id} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      if (form.values[name].includes(category.id)) {
                        remove(form.values[name].indexOf(category.id));
                        return;
                      }
                      push(category.id);
                    }}
                  >
                    <ListItemIcon>
                      <Checkbox
                        tabIndex={-1}
                        checked={form.values[name].includes(category.id)}
                      />
                    </ListItemIcon>
                    <ListItemText primary={category.name} />
                  </ListItemButton>
                </ListItem>
              ))}
              {categories.length === 0 && (
                <ListItem>no category found</ListItem>
              )}
            </List>
          </FormGroup>
        </FormControl>
      )}
    </FieldArray>
  );
}

export default CategoriesInput;
