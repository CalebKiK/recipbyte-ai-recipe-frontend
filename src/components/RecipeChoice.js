"use client";

import '../styles/RecipePage.css';

export default function RecipeChoice() {
    return (
        <div className="recipe-choice-component">
            <h2>Let’s make: $DishName</h2>
            <div className='recipe-choice-text'>
                <p>Placeholder text for this section</p>
            </div>
            <div className='recipe-choice-btns'>
                <button className='substitute-ingredient-btn'>Substitute Ingredient</button>
                <button className='like-recipe-btn'>Like (Thumbs Up)</button>
                <button className='dislike-recipe-btn'>Not Like (Thumbs Down)</button>
            </div>
        </div>
    );
}