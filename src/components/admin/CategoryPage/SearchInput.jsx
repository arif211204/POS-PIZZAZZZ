import { TextField } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { asyncReceiveCategories } from '../../../states/categories/action';
import useCustomSearchParams from '../../../hooks/useCustomSearchParams';

function SearchInput() {
  const dispatch = useDispatch();
  const [searchParams, updateQueryParams] = useCustomSearchParams();

  const handleSearch = () => {
    dispatch(asyncReceiveCategories({ name: searchParams.get('name') }));
  };

  useEffect(() => {
    // Create a debounce timer
    // Adjust the delay as needed
    const timerId = setTimeout(handleSearch, 300);

    // Clear the previous timer on each input change
    return () => clearTimeout(timerId);
  }, [searchParams.get('name')]);

  return (
    <TextField
      color="info"
      size="small"
      label="Search Categories 🔍"
      variant="outlined"
      value={searchParams.get('name') || ''}
      onChange={({ target }) => updateQueryParams({ name: target.value })}
      sx={{ width: { md: '50%' } }}
    />
  );
}

export default SearchInput;
