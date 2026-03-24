import './index.css'
import {FaShoppingCart} from 'react-icons/fa'

const Navbar = ({restaurantName, cartCount}) => (
  <nav className="navbar">
    <h1 className="restaurant-name">{restaurantName}</h1>
    <div className="nav-right">
      <p className="my-orders-label">My Orders</p>
      <div className="cart-wrapper">
        <FaShoppingCart className="cart-icon" />
        <span data-testid="cart-count" className="cart-badge">
          {cartCount}
        </span>
      </div>
    </div>
  </nav>
)

export default Navbar
