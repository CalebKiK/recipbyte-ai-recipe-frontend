"use client";

import { useState } from 'react';
import '../styles/HomePage.css';
import DidYouKnow from './DidYouKnow';

export default function HeroSection() {

    const [ingredient, setIngredient] = useState('');
    const [ingredientsList, setIngredientsList] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [dietryRestrictions, setDietryRestrictions] = useState([]);

    const handleInputChange = (event) => {
        setIngredient(event.target.value);
    };

    const handleAddIngredient = () => {
        if (ingredient.trim() !== '') {
            setIngredientsList([...ingredientsList, ingredient.trim()]);
            setIngredient('');
        }
    };

    const handleRemoveIngredient = (index) => {
        const updatedList = ingredientsList.filter((_, i) => i !== index);
        setIngredientsList(updatedList);
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const handleRestrictionChange = (restriction) => {
        if (dietryRestrictions.includes(restriction)) {
            setDietryRestrictions(dietryRestrictions.filter((r) => r !== restriction));
        } else {
            setDietryRestrictions([...dietryRestrictions, restriction]);
        }
    };

    return (
        <div className="hero-section-component">
            <h1>Welcome, $Username!</h1>
            <h2>Let's turn your ingredients into culinary magic.</h2>
            <div classname="ingredients-section">
                <div className="ingredients-input">
                    <input
                        placeholder='Add your ingredients here...'
                        value={ingredient}
                        onChange={handleInputChange}
                    />
                    <button className='add-ingredient-btn' onClick={handleAddIngredient}>Add</button>
                    <button className='filters-btn' onClick={toggleFilters}>
                        <span role="img" aria-label="filters">⚙️</span>
                    </button>
                    {showFilters && (
                        <div className='filters-dropdown'>
                            <label>
                                <input
                                    type="checkbox"
                                    value="vegetarian"
                                    checked={dietryRestrictions.includes('vegetarian')}
                                    onChange={() => handleRestrictionChange('vegetarian')}
                                />
                                Vegetarian
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    value="vegan"
                                    checked={dietryRestrictions.includes('vegan')}
                                    onChange={() => handleRestrictionChange('vegan')}
                                />
                                Vegan
                            </label>
                        </div>
                    )}
                </div>
                <div className='ingredients-filters-list'>
                    <ul className='ingredients-list'>
                        {ingredientsList.map((item, index) => (
                            <li key={index}>
                                {item}
                                <button onClick={() => handleRemoveIngredient(index)}>x</button>
                            </li>
                        ))
                        }
                    </ul>
                    <ul className='filters-list'></ul>
                </div>
                <div className='homepage-btns'>
                    <button className='generate-recipe-btn'>Generate Recipes!</button>
                    <button className='feeling-adventurous-btn'>Feeling Adventurous?</button>
                    <button className='to-image-detection-btn'>Snap Ingredients 📸</button>
                </div>
            </div>
            <DidYouKnow />
        </div>
    );
}