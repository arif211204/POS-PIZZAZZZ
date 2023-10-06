import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import ItemTable from './ItemTable';

function ContainerTable() {
  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: '0',
        m: '0 auto',
      }}
    >
      <Table aria-label="Data Table">
        <TableHead>
          <TableRow
            sx={{
              bgcolor: 'error.main',
            }}
          >
            <TableCell sx={{ color: 'white' }}>ID</TableCell>
            <TableCell sx={{ color: 'white' }}>Image</TableCell>
            <TableCell sx={{ color: 'white' }}>Name</TableCell>
            <TableCell sx={{ color: 'white' }}>Total Product</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <ItemTable />
      </Table>
    </TableContainer>
  );
}

export default ContainerTable;
