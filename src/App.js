import {useEffect, useState} from 'react'
import Navbar from './components/Navbar'
import CategoryTabs from './components/CategoryTabs'
import DishItem from './components/DishItem'
import './App.css'

const App = () => {
  const [restaurantName, setRestaurantName] = useState('')
  const [categories, setCategories] = useState([])
  const [activeTab, setActiveTab] = useState('')
  const [cartCount, setCartCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
        )
        const data = await response.json()

        const {
          restaurant_name: restaurantNames,
          table_menu_list: tableMenuList,
        } = data[0]

        const formattedData = tableMenuList.map(category => ({
          menuCategory: category.menu_category,
          menuCategoryId: category.menu_category_id,
          categoryDishes: category.category_dishes.map(dish => ({
            dishId: dish.dish_id,
            dishName: dish.dish_name,
            dishPrice: dish.dish_price,
            dishCurrency: dish.dish_currency,
            dishDescription: dish.dish_description,
            dishAvailability: dish.dish_Availability,
            dishCalories: dish.dish_calories,
            dishImage: dish.dish_image,
            dishType: dish.dish_Type,
            addonCat: dish.addonCat,
          })),
        }))

        setRestaurantName(restaurantNames)
        setCategories(formattedData)
        setActiveTab(formattedData[0].menuCategory)
      } catch (error) {
        console.error('Fetch failed:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const activeCategoryObj = categories.find(c => c.menuCategory === activeTab)

  const activeDishes = activeCategoryObj ? activeCategoryObj.categoryDishes : []

  return (
    <div className="app-container">
      <Navbar restaurantName={restaurantName} cartCount={cartCount} />

      {isLoading ? (
        <div data-testid="loader" className="loader-container">
          <div className="spinner" />
        </div>
      ) : (
        <>
          <CategoryTabs
            categories={categories}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <ul className="dish-list">
            {activeDishes.map(dish => (
              <DishItem
                key={dish.dishId}
                dish={dish}
                setCartCount={setCartCount}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default App
