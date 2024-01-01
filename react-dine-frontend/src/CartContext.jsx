import React, { createContext, useState, useContext } from 'react';

// Creating a new React context for the shopping cart
const CartContext = createContext();

// Custom hook to use the CartContext
export const useCart = () => useContext(CartContext);

// CartProvider component to manage and provide cart state
export const CartProvider = ({ children }) => {
  // State to store cart items
  const [cart, setCart] = useState({});

  // Function to update the cart state
  const updateCart = (newCart) => {
    setCart(newCart);
  };

  // Function to add an item to the cart
  const addToCart = (item) => {
    updateCart((prevCart) => {
      // Check if the item is already in the cart and increment its quantity
      const quantity = prevCart[item.id] ? prevCart[item.id].quantity + 1 : 1;
      return { ...prevCart, [item.id]: { ...item, quantity } };
    });
  };

  // Function to remove an item from the cart
  const removeFromCart = (item) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      // Check if the item quantity is more than one, then decrement, else delete the item
      if (updatedCart[item.id] && updatedCart[item.id].quantity > 1) {
        updatedCart[item.id].quantity -= 1;
      } else {
        delete updatedCart[item.id];
      }
      return updatedCart;
    });
  };

  // Function to clear all items from the cart
  const clearCart = () => {
    updateCart({});
  };

  // Value object containing the cart state and functions to manipulate it
  const value = {
    items: cart, // Current items in the cart
    addToCart, // Function to add items to the cart
    removeFromCart, // Function to remove items from the cart
    clearCart, // Function to clear the cart
  };

  // Providing the cart context to child components
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
