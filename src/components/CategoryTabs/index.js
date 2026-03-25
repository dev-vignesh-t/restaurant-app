import './index.css'

const CategoryTabs = ({categories, activeTab, setActiveTab}) => (
  <div>
    <ul className="tabs-container">
      {categories.map(each => (
        <li key={each.menuCategoryId}>
          <button
            type="button"
            className={`tab-btn ${
              activeTab === each.menuCategory ? 'active-tab' : ''
            }`}
            onClick={() => setActiveTab(each.menuCategory)}
          >
            {each.menuCategory}
          </button>
        </li>
      ))}
    </ul>
  </div>
)

export default CategoryTabs
