import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Confirmation.css'; // Importing CSS for styling

function Confirmation() {
  // Retrieve the orderId from the URL parameters
  const { orderId } = useParams();
  // State for storing the order details and the list of dishes
  const [order, setOrder] = useState(null);
  const [dishes, setDishes] = useState([]);
  // State to manage loading status
  const [loading, setLoading] = useState(true);

  // useEffect hook to fetch order and dish data when the component mounts
  useEffect(() => {
    const fetchOrderAndDishes = async () => {
      try {
        // Fetch the specific order based on orderId
        const orderResponse = await axios.get(`http://localhost:5000/api/orders/${orderId}`);
        setOrder(orderResponse.data);

        // Fetch the list of all dishes
        const dishesResponse = await axios.get('http://localhost:5000/api/dishes');
        setDishes(dishesResponse.data);
      } catch (error) {
        // Log any errors
        console.error('Error fetching data:', error);
      } finally {
        // Stop loading once data is fetched or an error occurs
        setLoading(false);
      }
    };

    fetchOrderAndDishes();
  }, [orderId]);

  // Loading indicator
  if (loading) {
    return <div>Loading...</div>;
  }

  // Show a message if order is not found
  if (!order) {
    return <div>Order not found.</div>;
  }

  // Helper function to get dish details by ID
  const getDishDetailsById = (dishId) => {
    return dishes.find(dish => dish.id === dishId);
  };

  // Render the order and customer details
  return (

    <div className="confirmation-container">
      {/* Container for ordered items */}
      <div className="order-details-box">
        <h2>Ordered Items:</h2>
        {order.items.map((item, index) => {
          // Get details for each ordered item
          const dishDetails = getDishDetailsById(item.id);
          return (
            <div key={index} className="order-item">
              {/* Show image and details of each dish */}
              <img
                src={`http://localhost:5000/${dishDetails?.image}`}
                alt={dishDetails?.name}
                className="order-item-image"
              />
              <div className="item-info">
                <p><strong>{dishDetails?.name}</strong> x {item.quantity}</p>
                <p>Price: ${dishDetails?.price}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Container for customer details */}
      <div className="customer-details-box">
        <h1>Order Confirmation</h1>
        <p><strong>Order ID:</strong> {order.id}</p>
        <h2>Customer Details:</h2>
        {/* Display customer information */}
        <p><strong>Name:</strong> {order.customer.name}</p>
        <p><strong>Email:</strong> {order.customer.email}</p>
        <p><strong>Street:</strong> {order.customer.street}</p>
        <p><strong>Postal Code:</strong> {order.customer['postal-code']}</p>
        <p><strong>City:</strong> {order.customer.city}</p>
      </div>
    </div>
  );
}

export default Confirmation;
