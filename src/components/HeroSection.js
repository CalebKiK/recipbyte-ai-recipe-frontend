"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import '../styles/HomePage.css';

export default function HeroSection() {

    const [ingredient, setIngredient] = useState('');
    const [ingredientsList, setIngredientsList] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const { user } = useAuth();
    console.log("User object from AuthContext in HeroSection.js file:", user);
    const [dietaryRestrictions, setDietaryRestrictions] = useState([]);
    const router = useRouter();

    const handleInputChange = (event) => {
        setIngredient(event.target.value);
    };

    const handleAddIngredient = () => {
        if (ingredient.trim() !== '') {
            setIngredientsList([...ingredientsList, ingredient.trim().toLowerCase()]);
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
        if (dietaryRestrictions.includes(restriction)) {
            setDietaryRestrictions(dietaryRestrictions.filter((r) => r !== restriction));
        } else {
            setDietaryRestrictions([...dietaryRestrictions, restriction]);
        }
    };

    const goToImageDetectorPage = () => {
        router.push('/image-detector');
    };

    const handleRandomRecipe = async () => { 
        try {
            const response = await fetch('http://127.0.0.1:8000/api/recipes/random/'); 

            if (response.ok) {
                const data = await response.json();
                router.push(`/recipes?random=true`);
            } else if (response.status === 404) {
                alert("No recipes found in the database. Please import some recipes first!");
            }
            else {
                console.error("Failed to fetch random recipe:", response.status);
                alert("Failed to fetch a random recipe. Please try again.");
            }
        } catch (error) {
            console.error("Error fetching random recipe:", error);
            alert("An error occurred while fetching a random recipe. Check console for details.");
        }
    };

    const handleGenerateRecipes = async () => {
        if(ingredientsList.length > 0) {
            const ingredientsQuery = ingredientsList.map(encodeURIComponent).join(',');
            const restrictionsQuery = dietaryRestrictions.map(encodeURIComponent).join(',');

            
            let url = `/recipes?ingredients=${ingredientsQuery}`;
            if (restrictionsQuery) {
                url += `&dietaryRestrictions=${restrictionsQuery}`;
            }

            router.push(url);

        } else {
            alert("Please enter at least 1 ingredient.")
        }
    };
    
    return (
        <div className="hero-section-component">
            <h1>Welcome{user?.username ? `, ${user.username}` : ''}!</h1>
            <h2>Let's turn your ingredients into culinary magic.</h2>
            <div className="ingredients-component">
                <div className="ingredients-section">
                    <div className="ingredients-input">
                        <input
                            placeholder='Add your ingredients here...'
                            value={ingredient}
                            onChange={handleInputChange}
                            onKeyDown={(e) =>{
                                if (e.key === 'Enter') {
                                    handleAddIngredient();
                                }
                            }}
                        />
                        <button className='add-ingredient-btn' onClick={handleAddIngredient}>Add</button>
                        {/* <button className='filters-btn' onClick={toggleFilters}>
                            <span role="img" aria-label="filters">⚙️</span>
                        </button> */}
                        {showFilters && (
                            <div className='filters-dropdown'>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="vegetarian"
                                        checked={dietaryRestrictions.includes('vegetarian')}
                                        onChange={() => handleRestrictionChange('vegetarian')}
                                    />
                                    Vegetarian
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="vegan"
                                        checked={dietaryRestrictions.includes('vegan')}
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
                        <button className='feeling-adventurous-btn' onClick={handleRandomRecipe}>Feeling Adventurous?</button>
                        <button className='generate-recipe-btn' onClick={handleGenerateRecipes}>Generate Recipes!</button>
                    </div>
                </div>
            </div>
            
        </div>
    );
}