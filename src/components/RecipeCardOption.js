"use client";

import '../styles/RecipePage.css';
import { useRouter } from 'next/navigation';

export default function RecipeCard({ recipe, onSelectRecipe }) {
    
    const handleRecipeClick = () => {
        if(onSelectRecipe) {
            onSelectRecipe(recipe);
        }
    }

    if (!recipe) {
        return null;
    }

    return (
        <div className="recipe-card" onClick={handleRecipeClick}>
            {recipe.image_url && <img src={recipe.image_url} alt={recipe.title} />}
            <h5>{recipe.title}</h5>
            {recipe.description && <p>{recipe.description.substring(0, 100)}...</p>} {/* Optional description */}
            {recipe.minutes && <p>Cooking Time: {recipe.minutes} minutes</p>} {/* Optional cooking time */}
            {recipe.nutrition && <p>Calories: {recipe.nutrition[0]}</p>} {/* Basic nutrition */}
        </div>
    );
}