import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Alert } from '@mui/material';
import Loading from './Loading';

const SHIPPING_URL = process.env.REACT_APP_SHIPPING_URL;

export default function Shipping() {
  const [shipments, setShipments] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${SHIPPING_URL}/shipments`)
      .then(res => setShipments(res.data))
      .catch(() => setError('Failed to fetch shipments'));
  }, []);

  if (error) return <Alert severity="error">{error}</Alert>;
  if (!shipments) return <Loading />;

  return (
    <>
      <Typography variant="h4" gutterBottom>Shipping</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Shipment ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Expected Delivery</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shipments.map(s => (
              <TableRow key={s.id}>
                <TableCell>{s.id}</TableCell>
                <TableCell>{s.status}</TableCell>
                <TableCell>{new Date(s.expectedDelivery).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
