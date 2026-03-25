import {useContext} from 'react'
import CartContext from '../../context/CartContext'
import Navbar from '../Navbar'
import './index.css'

const Cart = () => {
  const {
    cartList,
    removeAllCartItems,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    removeCartItem,
  } = useContext(CartContext)

  return (
    <div className="cart-container">
      <Navbar />

      {cartList.length === 0 ? (
        <div className="cart-empty">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
            alt="empty cart"
          />
        </div>
      ) : (
        <>
          <div className="cart-header">
            <h1 className="cart-title">My Cart</h1>

            <button
              type="button"
              className="remove-all-btn"
              onClick={removeAllCartItems}
            >
              Remove All
            </button>
          </div>

          <ul className="cart-list">
            {cartList.map(item => (
              <li className="cart-item" key={item.dishId}>
                <img
                  src={item.dishImage}
                  alt={item.dishName}
                  className="cart-img"
                />

                <div className="cart-details">
                  <p className="cart-name">{item.dishName}</p>
                  <p className="cart-price">
                    {item.dishCurrency} {item.dishPrice}
                  </p>
                </div>

                <div className="cart-controls">
                  <button
                    type="button"
                    className="qty-btn"
                    onClick={() => decrementCartItemQuantity(item.dishId)}
                  >
                    -
                  </button>

                  <p className="cart-qty">{item.quantity}</p>

                  <button
                    type="button"
                    className="qty-btn"
                    onClick={() => incrementCartItemQuantity(item.dishId)}
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => removeCartItem(item.dishId)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default Cart
