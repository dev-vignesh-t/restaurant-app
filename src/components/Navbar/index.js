import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {useContext} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

const Navbar = props => {
  const {history, restaurantName} = props
  const {cartList} = useContext(CartContext)

  const cartCount = cartList.reduce((acc, each) => acc + each.quantity, 0)

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const goToCart = () => {
    history.push('/cart')
  }

  return (
    <nav className="navbar">
      <h1 className="nav-title" onClick={() => history.push('/')}>
        {restaurantName}
      </h1>

      <div className="nav-right">
        <p className="nav-orders">My Orders</p>

        <button
          type="button"
          data-testid="cart"
          className="nav-cart-btn"
          onClick={() => history.push('/cart')}
        >
          Cart
          <span className="cart-count">{cartCount}</span>
        </button>

        <button type="button" className="logout-btn" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Navbar)
