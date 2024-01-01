import React, { useState } from 'react';
import axios from 'axios';
import { useCart } from '../CartContext'; // Importing CartContext to manage cart state
import { useNavigate } from 'react-router-dom'; // Import to navigate programmatically
import './CheckoutModal.css'; // Importing styling for the modal

function CheckoutModal({ items, onClose }) {
  // State for form data and form error handling
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    street: '',
    postalCode: '',
    city: '',
    phoneNumber: '',
    specialInstructions: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false); // State to handle loading indicator
  const navigate = useNavigate();
  const { clearCart } = useCart(); // Function to clear cart after order submission

  // Handles form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear form errors as user types
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };

  // Form validation function
  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    // Validation logic for each field
    if (!formData.name.trim()) {
      errors['name'] = 'Name is required.';
      formIsValid = false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors['email'] = 'Invalid email.';
      formIsValid = false;
    }
    if (!formData.street.trim()) {
      errors['street'] = 'Street is required.';
      formIsValid = false;
    }
    if (!formData.postalCode.trim()) {
      errors['postalCode'] = 'Postal code is required.';
      formIsValid = false;
    }
    if (!formData.city.trim()) {
      errors['city'] = 'City is required.';
      formIsValid = false;
    }
    if (!formData.phoneNumber.trim()) {
      errors['phoneNumber'] = 'Phone number is required.';
      formIsValid = false;
    }

    setFormErrors(errors);
    return formIsValid;
  };


  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        // Constructing order data from form and cart items
        const orderData = {
          order: {
            customer: {
              name: formData.name,
              email: formData.email,
              street: formData.street,
              'postal-code': formData.postalCode,
              city: formData.city
            },
            items: Object.values(items).map(item => ({
              id: item.id,
              quantity: item.quantity
            }))
          }
        };

        // POST request to submit the order
        const response = await axios.post('https://reactdine-api.onrender.com/api/orders', orderData);

        // Redirect to confirmation page after a delay
        setTimeout(() => {
          navigate(`/confirmation/${response.data.orderId}`);
          clearCart(); // Clear the cart after successful order placement
        }, 3000); // Delay of 3 seconds

      } catch (error) {
        // Handle errors in order submission
        console.error('Error placing order:', error);
        setIsLoading(false);
        setFormErrors({ submit: 'Error placing order. Please try again.' });
      }
    }
  };

  // Calculate the total price of items in the cart
  const totalPrice = Object.values(items).reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="modal-overlay">
      <div className={isLoading ? "modal loading" : "modal"}>
        {isLoading ? (
          <div className="spinner"></div> // Spinner is displayed when loading
        ) : (
          <form onSubmit={handleSubmit}>
            <button onClick={onClose} className="close-button">×</button>
            <h2>Checkout</h2>

            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {formErrors.name && <div className="error-message">{formErrors.name}</div>}
            </label>

            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {formErrors.email && <div className="error-message">{formErrors.email}</div>}
            </label>

            <label>
              Street:
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
              />
              {formErrors.street && <div className="error-message">{formErrors.street}</div>}
            </label>

            <label>
              Postal Code:
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
              />
               {formErrors.postalCode && <div className="error-message">{formErrors.postalCode}</div>}
            </label>

            <label>
              City:
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
               {formErrors.city && <div className="error-message">{formErrors.city}</div>}
            </label>

            <label>
              Phone Number:
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
               {formErrors.phoneNumber && <div className="error-message">{formErrors.phoneNumber}</div>}
            </label>

            <label>
              Special Instructions:
              <textarea
                name="specialInstructions"
                value={formData.specialInstructions}
                onChange={handleChange}
              />
            </label>

            <div className="form-actions">
              <p className="total-price">Total Price: ${totalPrice.toFixed(2)}</p>
              <button type="submit" className="submit-button">Submit Order</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );

}

export default CheckoutModal;
