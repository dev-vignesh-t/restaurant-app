import {useState, useContext} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

const DishItem = ({dish}) => {
  const [count, setCount] = useState(0)

  const {
    addCartItem,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
  } = useContext(CartContext)

  const onIncrease = () => {
    setCount(prev => {
      const newCount = prev + 1

      if (prev === 0) {
        addCartItem({...dish, quantity: 1})
      } else {
        incrementCartItemQuantity(dish.dishId)
      }

      return newCount
    })
  }

  const onDecrease = () => {
    setCount(prev => {
      if (prev === 0) return prev

      decrementCartItemQuantity(dish.dishId)
      return prev - 1
    })
  }

  return (
    <li className="dish-item">
      <div className="dish-left">
        <p className="dish-name">{dish.dishName}</p>

        <p className="dish-price">{`${dish.dishCurrency} ${dish.dishPrice}`}</p>

        <p className="dish-description">{dish.dishDescription}</p>

        <p className="dish-calories">{dish.dishCalories} calories</p>

        <p className="dish-quantity">{count}</p>

        {dish.dishAvailability ? (
          <div className="dish-controls">
            <button className="dish-btn" onClick={onDecrease}>
              -
            </button>

            <button className="dish-btn" onClick={onIncrease}>
              +
            </button>
          </div>
        ) : (
          <p className="not-available">Not available</p>
        )}

        {count > 0 && <button className="add-cart-btn">ADD TO CART</button>}

        {dish.addonCat && dish.addonCat.length > 0 && (
          <p className="custom-text">Customizations available</p>
        )}
      </div>

      <img src={dish.dishImage} alt={dish.dishName} className="dish-img" />
    </li>
  )
}

export default DishItem
