"use client";

import '../styles/RecipePage.css';
import RecipeCard from './RecipeCardOption';

export default function RecipeSuggestions() {
    return (
        <div className="recipe-suggestions-component">
            <h2>Recipe Suggestions</h2>
            <h4>Pick a dish that excites you.</h4>
            <div className='recipe-suggestions'>
                <RecipeCard />
                <RecipeCard />
                <RecipeCard />
            </div>
        </div>
    );
}