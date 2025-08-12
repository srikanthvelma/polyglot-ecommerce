import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import AuthIcon from '@mui/icons-material/Lock';
import ProductIcon from '@mui/icons-material/Inventory2';
import OrderIcon from '@mui/icons-material/ShoppingCart';
import PaymentIcon from '@mui/icons-material/Payment';
import InventoryIcon from '@mui/icons-material/Store';
import ShippingIcon from '@mui/icons-material/LocalShipping';

const drawerWidth = 240;

const menuItems = [
  { text: 'Auth', icon: <AuthIcon />, path: '/' },
  { text: 'Products', icon: <ProductIcon />, path: '/products' },
  { text: 'Orders', icon: <OrderIcon />, path: '/orders' },
  { text: 'Payments', icon: <PaymentIcon />, path: '/payments' },
  { text: 'Inventory', icon: <InventoryIcon />, path: '/inventory' },
  { text: 'Shipping', icon: <ShippingIcon />, path: '/shipping' },
];

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Polyglot Shop
        </Typography>
      </Toolbar>
      <List>
        {menuItems.map(({ text, icon, path }) => (
          <ListItem button key={text} component={Link} to={path}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
