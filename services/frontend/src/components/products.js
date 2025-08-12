import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Alert } from '@mui/material';
import Loading from './loading';

const PRODUCT_URL = process.env.REACT_APP_PRODUCT_URL;

export default function Products() {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${PRODUCT_URL}/products`)
      .then(res => setProducts(res.data))
      .catch(() => setError('Failed to fetch products'));
  }, []);

  if (error) return <Alert severity="error">{error}</Alert>;
  if (!products) return <Loading />;

  return (
    <>
      <Typography variant="h4" gutterBottom>Products</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map(p => (
              <TableRow key={p.id}>
                <TableCell>{p.id}</TableCell>
                <TableCell>{p.name}</TableCell>
                <TableCell>${p.price}</TableCell>
                <TableCell>{p.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
