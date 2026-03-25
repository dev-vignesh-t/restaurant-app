import {useEffect, useState} from 'react'
import Navbar from '../Navbar'
import CategoryTabs from '../CategoryTabs'
import DishItem from '../DishItem'
import './index.css'

const Home = () => {
  const [restaurantName, setRestaurantName] = useState('')
  const [categories, setCategories] = useState([])
  const [activeTab, setActiveTab] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
      )
      const data = await res.json()

      const {
        restaurant_name: restaurantNameData,
        table_menu_list: tableMenuList,
      } = data[0]

      const formatted = tableMenuList.map(each => ({
        menuCategory: each.menu_category,
        menuCategoryId: each.menu_category_id,
        categoryDishes: each.category_dishes.map(d => ({
          dishId: d.dish_id,
          dishName: d.dish_name,
          dishPrice: d.dish_price,
          dishCurrency: d.dish_currency,
          dishDescription: d.dish_description,
          dishAvailability: d.dish_Availability,
          dishCalories: d.dish_calories,
          dishImage: d.dish_image,
          addonCat: d.addonCat,
        })),
      }))

      setRestaurantName(restaurantNameData)
      setCategories(formatted)
      setActiveTab(formatted[0].menuCategory)
    }

    fetchData()
  }, [])

  const activeCategory = categories.find(
    each => each.menuCategory === activeTab,
  )

  return (
    <>
      <Navbar restaurantName={restaurantName} />

      <CategoryTabs
        categories={categories}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <ul className="dish-list">
        {activeCategory?.categoryDishes.map(dish => (
          <DishItem key={dish.dishId} dish={dish} />
        ))}
      </ul>
    </>
  )
}

export default Home
