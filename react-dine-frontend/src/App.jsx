import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import CheckoutModal from './pages/CheckoutModal';
import Confirmation from './pages/Confirmation';
import { CartProvider } from './CartContext';
import CartBadge from './CartBadge';
import './App.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/menu">Menu</Link></li>
              <li>
                <Link to="/cart">
                  Cart
                  <CartBadge />
                </Link>
              </li>

            </ul>
          </nav>

          {/* Routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckoutModal />} />
            <Route path="/confirmation/:orderId" element={<Confirmation />} />

          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
