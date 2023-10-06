import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chart from 'chart.js/auto';
import { asyncGetAllTransaction } from '../../../states/transaction/action';

function SalesReport() {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transaction);

  const [salesDataWithProductsAndDates, setSalesDataWithProductsAndDates] =
    useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const chartRef = useRef(null);

  // Fetch all transactions from Redux
  useEffect(() => {
    dispatch(asyncGetAllTransaction());
  }, [dispatch]);

  // Add comments to explain the code
  // Add 'product' and 'date' properties to each transaction
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

  // Filter sales data based on the selected date range
  const filteredSalesData = salesDataWithProductsAndDates.filter(
    (transaction) => {
      if (startDate && endDate) {
        return transaction.date >= startDate && transaction.date <= endDate;
      }
      return true;
    }
  );

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = document.getElementById('salesChart');
    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: filteredSalesData.map((transaction) => transaction.date),
        datasets: [
          {
            label: 'Total Sales',
            data: filteredSalesData.map((transaction) => transaction.total),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true, // Make the chart responsive
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, [filteredSalesData]);

  return (
    <div
      style={{
        border: '1px solid black',
        padding: '10px',
        width: '80%',
        margin: '0 auto',
      }}
    >
      <h3 style={{ textAlign: 'center' }}>Sales Report</h3>
      <label htmlFor="startDatePicker">Start Date: </label>
      <input
        type="date"
        id="startDatePicker"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <label htmlFor="endDatePicker">End Date: </label>
      <input
        type="date"
        id="endDatePicker"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <canvas id="salesChart" />
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        Total sales for{' '}
        {startDate && endDate ? `${startDate} to ${endDate}` : 'all dates'}: Rp{' '}
        {filteredSalesData.reduce((total, sale) => total + sale.total, 0)}
      </div>
    </div>
  );
}

export default SalesReport;
