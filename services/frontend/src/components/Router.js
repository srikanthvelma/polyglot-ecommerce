import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Auth from './Auth';
import Products from './Products';
import Orders from './Orders';
import Payments from './Payment';
import Inventory from './Inventory';
import Shipping from './Shipping';
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
