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
        // alert("Image detection functionality not implemented yet!")
        router.push('/image-detector');
    };

    const handleRandomRecipe = async () => { // Corrected from `async =>`
        try {
            // Make a GET request to your random recipe endpoint
            const response = await fetch('http://127.0.0.1:8000/api/recipes/random/'); // Notice the trailing slash!

            if (response.ok) {
                const data = await response.json();
                // Since it's a single random recipe, wrap it in an array for consistency
                // with how handleGenerateRecipes sends data to the recipes page
                // router.push(`/recipes?recipes=${encodeURIComponent(JSON.stringify([data]))}`);
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

            // try {
            //     const response = await fetch(
            //         `http://127.0.0.1:8000/api/recipes/filter_by_ingredients?ingredients=${ingredientsQuery}&dietaryRestrictions=${restrictionsQuery}`
            //     );

            //     if (response.ok) {
            //         const data = await response.json()
            //         // Store the recipe data in a state or context that RecipePage can access
            //         // For simplicity, we'll pass it as a query parameter for now
            //         router.push(`/recipes?recipes=${encodeURIComponent(JSON.stringify(data))}`);
            //     } else {
            //         console.error("Failed to fetch recipes:", response.status)
            //         // Handle error (e.g., display a message to the user)
            //     }
            // } catch (error) {
            //     console.error("Error fetching recipes:", error)
            //     // Handle error
            // }

            // --- MODIFICATION HERE ---
            // Construct the URL with only query parameters for filtering
            // The RecipePage will then use these parameters to fetch the data
            let url = `/recipes?ingredients=${ingredientsQuery}`;
            if (restrictionsQuery) {
                url += `&dietaryRestrictions=${restrictionsQuery}`;
            }

            // Navigate to the recipes page without passing the large JSON data
            router.push(url);
            // --- END OF MODIFICATION ---

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