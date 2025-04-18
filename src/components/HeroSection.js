"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../styles/HomePage.css';

export default function HeroSection() {

    const [ingredient, setIngredient] = useState('');
    const [ingredientsList, setIngredientsList] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [dietryRestrictions, setDietryRestrictions] = useState([]);
    const router = useRouter();

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

    const goToImageDetectorPage = () => {
        router.push('/image-detector');
    };

    const goToRecipePage = () => {
        router.push('/recipes');
    };

    return (
        <div className="hero-section-component">
            <h1>Welcome, $Username!</h1>
            <h2>Let's turn your ingredients into culinary magic.</h2>
            <div className="ingredients-component">
                <div className="ingredients-section">
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
                        <button className='to-image-detection-btn' onClick={goToImageDetectorPage}>Snap Ingredients 📸</button>
                        <button className='feeling-adventurous-btn' onClick={goToRecipePage}>Feeling Adventurous?</button>
                        <button className='generate-recipe-btn' onClick={goToRecipePage}>Generate Recipes!</button>
                    </div>
                </div>
            </div>
            
        </div>
    );
}