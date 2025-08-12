import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Alert } from '@mui/material';
import Loading from './Loading';

const INVENTORY_URL = process.env.REACT_APP_INVENTORY_URL;

export default function Inventory() {
  const [items, setItems] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${INVENTORY_URL}/inventory`)
      .then(res => setItems(res.data))
      .catch(() => setError('Failed to fetch inventory'));
  }, []);

  if (error) return <Alert severity="error">{error}</Alert>;
  if (!items) return <Loading />;

  return (
    <>
      <Typography variant="h4" gutterBottom>Inventory</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map(i => (
              <TableRow key={i.id}>
                <TableCell>{i.id}</TableCell>
                <TableCell>{i.name}</TableCell>
                <TableCell>{i.quantity}</TableCell>
                <TableCell>{i.location}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
