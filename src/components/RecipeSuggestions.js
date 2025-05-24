"use client";

import '../styles/RecipePage.css';
import RecipeCard from './RecipeCardOption';

export default function RecipeSuggestions({ recipes, onSelectRecipe }) {
    return (
        <div className="recipe-suggestions-component">
            <h2>Recipe Suggestions</h2>
            <h4>Pick a dish that excites you.</h4>
            <div className='recipe-suggestions'>
                {recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} onSelectRecipe={onSelectRecipe} />
                ))}
            </div>
        </div>
    );
}