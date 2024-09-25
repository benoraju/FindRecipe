import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import { addDoc, collection } from 'firebase/firestore';
import { db } from './config/firebase'; // Import your Firebase configuration
import { searchRecipes } from './config/apiService';
import './styles/Menu.css';

const MenuPage = () => {
  const [searchInput, setSearchInput] = useState('');
  const [mealList, setMealList] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state.userId;

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const data = await searchRecipes(searchInput);
      setMealList(data.hits.map(hit => hit.recipe));
      
      // Insert search input into Firebase database
      const searchDataRef = collection(db, "SearchData");
      await addDoc(searchDataRef, {
        userId: userId,
        search: searchInput.split(',').map(input => input.trim())
      });
    } catch (error) {
      console.error('Error searching for meals:', error);
      setMealList([]);
    }
  };

  const handleMealClick = (meal) => {
    setSelectedMeal(meal);
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="menu-container">
      <div className="header">
        <div className="site-name">FindMyRecipe</div>
        <div className="header-buttons">
          <button id="history-btn" onClick={() => navigate('/history',{state: {userId} })}>History</button>
          <button id="profile-btn" onClick={() => navigate('/profile',{state: {userId} })}>Profile</button>
        </div>
      </div>
      <div className="menu-header">
        <div className="search-profile">
          <input
            type="text"
            id="search-input"
            placeholder="Search for ingredients..."
            value={searchInput}
            onChange={handleSearchInputChange}
          />
          <button id="search-btn" onClick={handleSearch}>Search</button>
        </div>
      </div>
      <div id="meal" className="meal-list">
        {mealList.map(meal => (
          <div key={meal.uri} className="meal-item" onClick={() => handleMealClick(meal)}>
            <div className="meal-card">
              <div className="meal-img">
                <img src={meal.image} alt="food" />
              </div>
              <div className="meal-details">
                <h3 className="meal-name">{meal.label}</h3>
                <p className="meal-ingredients">Ingredients: {meal.ingredientLines.join(', ')}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Display recipe details */}
      {selectedMeal && (
        <div className="meal-details-content">
          <h2 className="recipe-title">{selectedMeal.label}</h2>
          <ul className="recipe-ingredients">
            {selectedMeal.ingredientLines.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <p className="recipe-url"><a href={selectedMeal.url} target="_blank" rel="noopener noreferrer">View Recipe</a></p>
        </div>
      )}
    </div>
  );
};

export default MenuPage;
