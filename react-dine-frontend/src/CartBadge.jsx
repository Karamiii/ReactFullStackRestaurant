import React from 'react';
import Badge from '@mui/material/Badge'; // Import Badge component from Material-UI
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; // Import ShoppingCart icon from Material-UI icons
import { useCart } from './CartContext'; // Import the useCart hook from CartContext

function CartBadge() {
  const { items } = useCart(); // Use the useCart hook to access the cart's state

  // Calculate the total number of items in the cart
  // This iterates over all items in the cart and sums up their quantities
  const itemCount = Object.values(items).reduce((total, item) => total + item.quantity, 0);

  return (
    // Display a badge with the total item count
    // Badge component wraps the ShoppingCartIcon
    <Badge badgeContent={itemCount} color="error">
      <ShoppingCartIcon />
    </Badge>
  );
}

export default CartBadge;
