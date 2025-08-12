import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Alert } from '@mui/material';
import Loading from './loading';

const ORDER_URL = process.env.REACT_APP_ORDER_URL;

export default function Orders() {
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${ORDER_URL}/orders`)
      .then(res => setOrders(res.data))
      .catch(() => setError('Failed to fetch orders'));
  }, []);

  if (error) return <Alert severity="error">{error}</Alert>;
  if (!orders) return <Loading />;

  return (
    <>
      <Typography variant="h4" gutterBottom>Orders</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map(o => (
              <TableRow key={o.id}>
                <TableCell>{o.id}</TableCell>
                <TableCell>{o.status}</TableCell>
                <TableCell>${o.amount}</TableCell>
                <TableCell>{new Date(o.date).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
