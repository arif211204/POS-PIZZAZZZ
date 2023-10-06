import { Pagination } from '@mui/material';
import { useSelector } from 'react-redux';
import useCustomSearchParams from '../../../hooks/useCustomSearchParams';

function PaginationTable() {
  const productPagination = useSelector((states) => states.productPagination);
  const [searchParams, updateQueryParams] = useCustomSearchParams();

  return (
    <Pagination
      count={productPagination.total_page || 1}
      variant="text"
      shape="rounded"
      color="error"
      size="medium"
      page={+searchParams.get('page') || 1}
      onChange={(e, page) => updateQueryParams({ page })}
      sx={{
        '& .MuiPagination-ul': {
          justifyContent: 'center',
        },
      }}
    />
  );
}

export default PaginationTable;
