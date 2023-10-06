import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { useSelector } from 'react-redux';
import PaginationTable from './PaginationTable';
import ContainerTable from './ContainerTable';
import useCustomSearchParams from '../../../hooks/useCustomSearchParams';

function ContainerTab() {
  const categories = useSelector((states) => states.categories);
  const [searchParams, updateQueryParams] = useCustomSearchParams();

  return (
    <>
      <Box>
        <TabContext
          value={
            categories.length ? searchParams.get('currCategoryId') || '0' : '0'
          }
        >
          <TabList
            aria-label="Product Tabs"
            variant="scrollable"
            scrollButtons="auto"
            TabIndicatorProps={{ sx: { bgcolor: 'error.main' } }}
            sx={{ borderBottom: 1, borderColor: 'divider' }}
            onChange={(e, val) => updateQueryParams({ currCategoryId: val })}
          >
            <Tab
              label="All"
              value="0"
              sx={{ '&.Mui-selected': { color: 'error.main' } }}
            />
            {categories.map((category) => (
              <Tab
                key={category.id}
                label={category.name}
                value={`${category.id}`}
                sx={{ '&.Mui-selected': { color: 'error.main' } }}
              />
            ))}
          </TabList>
          <TabPanel value="0">
            <ContainerTable />
          </TabPanel>
          {categories.map((category) => (
            <TabPanel key={category.id} value={`${category.id}`}>
              <ContainerTable />
            </TabPanel>
          ))}
        </TabContext>
      </Box>
      <PaginationTable />
    </>
  );
}

export default ContainerTab;
