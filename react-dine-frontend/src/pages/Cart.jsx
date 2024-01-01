import React, { useState } from 'react';
import { useCart } from '../CartContext';
import CheckoutModal from './CheckoutModal';
import './Cart.css';
import { useNavigate } from 'react-router-dom';

// The Cart component manages the display and interactions within the shopping cart
function Cart() {
  // Hooks for managing cart state and navigation
  const { items, removeFromCart, addToCart, clearCart } = useCart();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const navigate = useNavigate();

  // Function to remove an item from the cart
  const handleRemoveClick = (item) => {
    removeFromCart(item);
  };

  // Function to add an item to the cart
  const handleAddItem = (item) => {
    addToCart(item);
  };

  // Function to clear all items from the cart
  const handleClearCart = () =>{
    clearCart();
  }

  // Function to toggle the visibility of the checkout modal
  const toggleCheckoutModal = () => {
    setShowCheckoutModal(!showCheckoutModal);
  };

  // Function to navigate to the menu page
  const goToMenu = () => {
    navigate('/menu');
  };

  // Calculate the total price of the items in the cart
  const totalPrice = Object.values(items).reduce((total, item) => total + item.quantity * item.price, 0);

  // Render the cart UI
  return (
    <div className="cart-container">
      <h1>Cart</h1>
      {Object.values(items).length > 0 ? (
        <>
          <div className="cart-items">
            {Object.values(items).map((item) => (
              <div key={item.id} className="cart-item">
                <img src={`http://localhost:5000/${item.image}`} alt={item.name} />
                <div className="item-info">
                  <h2>{item.name}</h2>
                  <p>Quantity: {item.quantity}</p>
                  <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                  <button onClick={() => handleRemoveClick(item)}>Remove</button>
                  <button onClick={() => handleAddItem(item)}>Add</button>
                </div>
              </div>
            ))}
          </div>
          <div className="summary-box">
            <h2>Total Price</h2>
            <p>${totalPrice.toFixed(2)}</p>
            <button onClick={toggleCheckoutModal} className="empty-cart-button">
              Checkout
            </button>
            <button onClick={handleClearCart} className="empty-cart-button">
              Empty Cart
            </button>
          </div>
        </>
      ) : (
        <div className="empty-cart-box">
          <p>Your cart seems to be empty :/</p>
          <button onClick={goToMenu} className="menu-button">Menu</button>
        </div>
      )}

      {showCheckoutModal && (
        <CheckoutModal items={items} onClose={toggleCheckoutModal} />
      )}
    </div>
  );
}

export default Cart;
