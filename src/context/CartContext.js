import {createContext} from 'react'

const CartContext = createContext({
  cartList: [],
  addCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
  removeAllCartItems: () => {},
  removeCartItem: () => {},
})

export default CartContext
