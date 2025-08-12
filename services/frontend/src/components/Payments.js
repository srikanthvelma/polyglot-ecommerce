import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Alert } from '@mui/material';
import Loading from './Loading';

const PAYMENT_URL = process.env.REACT_APP_PAYMENT_URL;

export default function Payments() {
  const [payments, setPayments] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${PAYMENT_URL}/payments`)
      .then(res => setPayments(res.data))
      .catch(() => setError('Failed to fetch payments'));
  }, []);

  if (error) return <Alert severity="error">{error}</Alert>;
  if (!payments) return <Loading />;

  return (
    <>
      <Typography variant="h4" gutterBottom>Payments</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Payment ID</TableCell>
              <TableCell>Order ID</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map(p => (
              <TableRow key={p.id}>
                <TableCell>{p.id}</TableCell>
                <TableCell>{p.orderId}</TableCell>
                <TableCell>${p.amount}</TableCell>
                <TableCell>{p.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
