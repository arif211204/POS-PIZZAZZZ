import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Stack } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { asyncReceiveCategories } from '../../states/categories/action';
import PageHeader from '../../components/admin/CategoryPage/PageHeader';
import SearchInput from '../../components/admin/CategoryPage/SearchInput';
import DownloadButton from '../../components/admin/CategoryPage/DownloadButton';
import CreateButton from '../../components/admin/CategoryPage/CreateButton';
import ContainerTable from '../../components/admin/CategoryPage/ContainerTable';

function CategoryPage() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    dispatch(asyncReceiveCategories({ name: searchParams.get('name') }));
  }, [dispatch]);

  return (
    <Stack
      direction="column"
      spacing={2}
      p={{ xs: '5vw', md: '2em' }}
      mx="auto"
      maxWidth="1200px"
    >
      <PageHeader />
      <Box>
        <Stack spacing={2} direction={{ xs: 'column', md: 'row' }}>
          <SearchInput />
          <Box sx={{ flexGrow: 1 }} display={{ xs: 'none', md: 'inherit' }} />
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <Stack direction="row" spacing={1} justifyContent="center">
              <DownloadButton />
              <CreateButton />
            </Stack>
          </Stack>
        </Stack>
      </Box>
      <ContainerTable />
    </Stack>
  );
}

export default CategoryPage;
