import { useState, useEffect } from 'react'
import { getCategories } from '../services/api'

const FilterBar = ({ onFilterChange, currentFilters }) => {
  const [categories, setCategories] = useState([])
  const [searchTerm, setSearchTerm] = useState(currentFilters.search || '')
  const [selectedCategory, setSelectedCategory] = useState(currentFilters.category || '')
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    setSearchTerm(currentFilters.search || '')
    setSelectedCategory(currentFilters.category || '')
  }, [currentFilters])

  const fetchCategories = async () => {
    try {
      const data = await getCategories()
      setCategories(data.categories || [])
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    onFilterChange({ search: searchTerm, category: selectedCategory })
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    onFilterChange({ search: searchTerm, category })
    setShowCategoryDropdown(false)
  }

  const handleClearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('')
    onFilterChange({ search: '', category: '' })
  }

  const hasActiveFilters = searchTerm || selectedCategory

  return (
    <div className="bg-base-200 rounded-lg shadow-lg p-6 space-y-6">
      {/* Search Bar */}
      <div>
        <label className="label">
          <span className="label-text font-semibold">Search Artworks</span>
        </label>
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search by title, description, artist name, or medium..."
              className="input input-bordered w-full pl-10"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <button type="submit" className="btn btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search
          </button>
          {hasActiveFilters && (
            <button type="button" onClick={handleClearFilters} className="btn btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear
            </button>
          )}
        </form>
      </div>

      {/* Category Filter - Desktop Tabs */}
      <div className="hidden lg:block">
        <label className="label">
          <span className="label-text font-semibold">Filter by Category</span>
          {selectedCategory && (
            <button
              onClick={() => handleCategoryChange('')}
              className="label-text-alt text-primary hover:underline"
            >
              Clear category
            </button>
          )}
        </label>
        
        <div className="tabs tabs-boxed bg-base-100 p-2 flex-wrap">
          <button
            onClick={() => handleCategoryChange('')}
            className={`tab ${!selectedCategory ? 'tab-active' : ''}`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => handleCategoryChange(cat._id)}
              className={`tab ${selectedCategory === cat._id ? 'tab-active' : ''}`}
            >
              {cat._id} <span className="ml-1 opacity-60">({cat.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter - Mobile Dropdown */}
      <div className="lg:hidden">
        <label className="label">
          <span className="label-text font-semibold">Filter by Category</span>
        </label>
        
        <div className="dropdown w-full">
          <button
            type="button"
            onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
            className="btn btn-outline w-full justify-between"
          >
            <span>{selectedCategory || 'All Categories'}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {showCategoryDropdown && (
            <ul className="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-full mt-2 max-h-60 overflow-y-auto z-10">
              <li>
                <button onClick={() => handleCategoryChange('')} className={!selectedCategory ? 'active' : ''}>
                  All Categories
                </button>
              </li>
              {categories.map((cat) => (
                <li key={cat._id}>
                  <button 
                    onClick={() => handleCategoryChange(cat._id)}
                    className={selectedCategory === cat._id ? 'active' : ''}
                  >
                    {cat._id} <span className="badge badge-sm ml-auto">{cat.count}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="alert alert-info shadow-lg">
          <div className="flex-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
              <h3 className="font-bold">Active Filters</h3>
              <div className="text-xs flex gap-2 mt-1 flex-wrap">
                {searchTerm && (
                  <span className="badge badge-sm">Search: "{searchTerm}"</span>
                )}
                {selectedCategory && (
                  <span className="badge badge-sm">Category: {selectedCategory}</span>
                )}
              </div>
            </div>
          </div>
          <button onClick={handleClearFilters} className="btn btn-sm btn-ghost">
            Clear All
          </button>
        </div>
      )}
    </div>
  )
}

export default FilterBar
