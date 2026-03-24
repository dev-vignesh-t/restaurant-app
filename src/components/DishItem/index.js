import {useState} from 'react'
import './index.css'

const DishItem = ({dish, setCartCount}) => {
  const [count, setCount] = useState(0)

  const onIncrease = () => {
    setCount(prev => prev + 1)
    setCartCount(prev => prev + 1)
  }

  const onDecrease = () => {
    if (count > 0) {
      setCount(prev => prev - 1)
      setCartCount(prev => prev - 1)
    }
  }

  return (
    <li className="dish-item">
      <div className="dish-type-indicator">
        <div className={dish.dishType === 1 ? 'nonveg-box' : 'veg-box'}>
          <div className="dot" />
        </div>
      </div>

      <div className="dish-details">
        <h3 className="dish-name">{dish.dishName}</h3>
        <p className="dish-price">
          {dish.dishCurrency} {dish.dishPrice}
        </p>
        <p className="dish-description">{dish.dishDescription}</p>

        {dish.dishAvailability && (
          <button
            type="button"
            data-testid="decrease-quantity"
            className="qty-btn qty-btn-left"
            onClick={onDecrease}
          >
            -
          </button>
        )}

        <p data-testid="dish-quantity" className="qty-count">
          {count}
        </p>

        {dish.dishAvailability && (
          <button
            type="button"
            data-testid="increase-quantity"
            className="qty-btn qty-btn-right"
            onClick={onIncrease}
          >
            +
          </button>
        )}

        {!dish.dishAvailability && (
          <p className="not-available">Not available</p>
        )}

        {dish.addonCat && dish.addonCat.length > 0 && (
          <p className="customizations">Customizations available</p>
        )}
      </div>

      <div className="dish-right">
        <p className="dish-calories">{dish.dishCalories} calories</p>
        {dish.dishImage && (
          <img
            src={dish.dishImage}
            alt={dish.dishName}
            className="dish-image"
          />
        )}
      </div>
    </li>
  )
}

export default DishItem
