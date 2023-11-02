import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetAllTransaction } from '../../../states/transaction/action';

const styles = {
  container: {
    border: '1px solid #ddd',
    padding: '20px',
    width: '90%',
    margin: '0 auto',
    backgroundColor: '#f7f7f7',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    textAlign: 'center',
    backgroundColor: '#333',
    color: 'white',
    padding: '10px',
    fontSize: '24px',
  },
  table: {
    borderCollapse: 'collapse',
    width: '100%',
    marginTop: '20px',
  },
  tableHeaderCell: {
    border: '1px solid #ccc',
    padding: '10px',
    textAlign: 'center',
    backgroundColor: '#333',
    color: 'white',
  },
  tableCell: {
    padding: '10px',
    textAlign: 'center',
    border: '1px solid #ccc',
  },
  tableFooterCell: {
    borderTop: '1px solid #ccc',
    padding: '10px',
    textAlign: 'center',
  },
};

function SalesReport() {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transaction);

  const [salesDataWithProductsAndDates, setSalesDataWithProductsAndDates] =
    useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    dispatch(asyncGetAllTransaction());
  }, [dispatch]);

  useEffect(() => {
    if (transactions && transactions.length > 0) {
      const updatedSalesData = transactions.map((transaction) => ({
        ...transaction,
        product: transaction.variantId,
        date: transaction.createdAt.split('T')[0],
      }));

      setSalesDataWithProductsAndDates(updatedSalesData);
    }
  }, [transactions]);

  const filteredSalesData = salesDataWithProductsAndDates.filter(
    (transaction) => {
      if (startDate && endDate) {
        return transaction.date >= startDate && transaction.date <= endDate;
      }
      return true;
    }
  );

  const totalSales = filteredSalesData.reduce(
    (total, sale) => total + sale.total,
    0
  );

  return (
    <div style={styles.container}>
      <h3 style={styles.header}>Sales Report</h3>
      <label htmlFor="startDatePicker" style={styles.inputLabel}>
        Start Date:{' '}
      </label>
      <input
        type="date"
        id="startDatePicker"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <label htmlFor="endDatePicker" style={styles.inputLabel}>
        End Date:{' '}
      </label>
      <input
        type="date"
        id="endDatePicker"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeaderCell}>VariantId</th>
            <th style={styles.tableHeaderCell}>Quantity</th>
            <th style={styles.tableHeaderCell}>Total</th>
            <th style={styles.tableHeaderCell}>Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredSalesData.map((transaction) => (
            <tr key={transaction.id} style={{ border: '1px solid black' }}>
              <td style={styles.tableCell}>{transaction.product}</td>
              <td style={styles.tableCell}>{transaction.quantity}</td>
              <td style={styles.tableCell}>
                {transaction.total.toLocaleString('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                })}
              </td>

              <td style={styles.tableCell}>{transaction.date}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4} style={styles.tableFooterCell}>
              Total sales for{' '}
              {startDate && endDate
                ? `${startDate} to ${endDate}`
                : 'all dates'}
              :{' '}
              {`Rp ${totalSales.toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR',
              })}`}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default SalesReport;
