import { TextField } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { asyncReceiveProducts } from '../../../states/products/action';
import useCustomSearchParams from '../../../hooks/useCustomSearchParams';

function SearchInput() {
  const dispatch = useDispatch();
  const [searchParams, updateQueryParams] = useCustomSearchParams();

  const handleSearch = () => {
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
  };

  useEffect(() => {
    // debounce
    const timerId = setTimeout(handleSearch, 300);
    return () => clearTimeout(timerId);
  }, [searchParams.get('name')]);

  return (
    <TextField
      color="info"
      size="small"
      label="Search Products 🔍"
      variant="outlined"
      value={searchParams.get('name') || ''}
      onChange={({ target }) => updateQueryParams({ name: target.value })}
      sx={{ width: { md: '50%' } }}
    />
  );
}

export default SearchInput;
