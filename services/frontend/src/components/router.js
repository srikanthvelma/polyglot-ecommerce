import React from 'react';
import { Routes, Route } from 'react-router-dom';
import auth from './auth';
import products from './Products';
import orders from './Orders';
import payments from './Payment';
import inventory from './inventory';
import shipping from './shipping';
import NotFound from './NotFound';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/products" element={<Products />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/payments" element={<Payments />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/shipping" element={<Shipping />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
