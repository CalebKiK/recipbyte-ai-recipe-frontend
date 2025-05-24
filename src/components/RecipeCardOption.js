"use client";

import '../styles/RecipePage.css';
import { toSentenceCase, toTitleCase } from '@/utils/stringFormatters';

export default function RecipeCard({ recipe, onSelectRecipe }) {
    
    const handleRecipeClick = () => {
        if(onSelectRecipe) {
            onSelectRecipe(recipe);
        }
    }

    if (!recipe) {
        return null;
    }

    const displayIngredients = recipe.ingredients ? recipe.ingredients.map(ingredient => toSentenceCase(ingredient.name)).join(', ') : 'N/A'

    return (
        <div className="recipe-card" onClick={handleRecipeClick}>
            {recipe.image_url && <img src={recipe.image_url} alt={recipe.title} />}
            <h5>{toTitleCase(recipe.title)}</h5>
            {recipe.description && <p>{toSentenceCase(recipe.description.substring(0, 200))}...</p>} {/* Optional description */}
            <p><span>Ingredients:</span> {displayIngredients}</p>
            {recipe.minutes && <p><span>Cooking Time:</span> {recipe.minutes} minutes</p>} {/* Optional cooking time */}
            {recipe.nutrition && <p><span>Calories:</span> {recipe.nutrition[0]}</p>} {/* Basic nutrition */}
        </div>
    );
}