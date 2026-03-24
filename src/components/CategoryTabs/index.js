import './index.css'

const CategoryTabs = ({categories, activeTab, setActiveTab}) => (
  <div className="tabs-wrapper">
    <ul className="tabs-list">
      {categories.map(each => (
        <li key={each.menuCategoryId} className="tab-item">
          <button
            type="button"
            className={`tab-btn${
              activeTab === each.menuCategory ? ' active' : ''
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
