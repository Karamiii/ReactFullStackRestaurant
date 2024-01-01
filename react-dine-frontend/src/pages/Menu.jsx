import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../CartContext'; // Import the useCart hook from CartContext
import './Menu.css'; // Import the CSS for styling

function Menu() {
  // State for storing menu items
  const [menuItems, setMenuItems] = useState([]);
  // State for showing/hiding the add-to-cart notification
  const [showNotification, setShowNotification] = useState(false);
  // Retrieve the addToCart function from the CartContext
  const { addToCart } = useCart();

  // useEffect hook to fetch menu items from the server when the component mounts
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        // Make an HTTP GET request to fetch the menu items
        const response = await axios.get('http://localhost:5000/api/dishes');
        // Update the menuItems state with the fetched data
        setMenuItems(response.data);
      } catch (error) {
        // Log any errors to the console
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, []);

  // Function to handle adding items to the cart
  const handleAddToCart = (item) => {
    addToCart(item); // Add the selected item to the cart
    setShowNotification(true); // Show the notification
    // Set a timeout to hide the notification after 2 seconds
    setTimeout(() => setShowNotification(false), 2000);
  };

  return (
    <div className="menu-container">
      {/* Notification that appears when an item is added to the cart */}
      <div className={`cart-notification ${showNotification ? 'show' : ''}`}>
        Item added to cart
      </div>

      <h1>Menu</h1>
      <div className="menu-items">
        {/* Map over each menu item and display it */}
        {menuItems.map((item) => (
          <div key={item.id} className="menu-item">
            {/* Display the item image */}
            <img src={`http://localhost:5000/${item.image}`} alt={item.name} />
            {/* Display item details */}
            <div className="item-details">
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <p>Price: ${item.price}</p>
              {/* Button to add the item to the cart */}
              <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
