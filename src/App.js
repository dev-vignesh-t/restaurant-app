import {useState} from 'react'
import {Switch, Route} from 'react-router-dom'
import CartContext from './context/CartContext'
import Home from './components/Home'
import Cart from './components/Cart'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import './App.css'

const App = () => {
  const [cartList, setCartList] = useState([])

  const addCartItem = dish => {
    setCartList(prev => {
      const existing = prev.find(i => i.dishId === dish.dishId)

      if (existing) {
        return prev.map(i =>
          i.dishId === dish.dishId
            ? {...i, quantity: i.quantity + dish.quantity}
            : i,
        )
      }

      return [...prev, dish]
    })
  }

  const incrementCartItemQuantity = id => {
    setCartList(prev =>
      prev.map(item =>
        item.dishId === id ? {...item, quantity: item.quantity + 1} : item,
      ),
    )
  }

  const decrementCartItemQuantity = id => {
    setCartList(prev =>
      prev
        .map(item =>
          item.dishId === id ? {...item, quantity: item.quantity - 1} : item,
        )
        .filter(item => item.quantity > 0),
    )
  }

  const removeAllCartItems = () => {
    setCartList([])
  }

  return (
    <CartContext.Provider
      value={{
        cartList,
        addCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        removeAllCartItems,
      }}
    >
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/cart" component={Cart} />
      </Switch>
    </CartContext.Provider>
  )
}

export default App
