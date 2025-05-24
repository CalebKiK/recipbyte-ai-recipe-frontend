"use client";

import '../styles/RecipePage.css';

export default function RecipeChoice({ recipe }) {
    return (
        <div className="recipe-choice-component">
            <h2>Let’s make: {recipe.title}</h2>
            <div className='recipe-choice-text'>
                <p>{recipe.steps}</p>
            </div>
            <div className='recipe-choice-btns'>
                <button className='substitute-ingredient-btn'>Substitute Ingredient</button>
                <button className='like-recipe-btn'>Like (Thumbs Up)</button>
                <button className='dislike-recipe-btn'>Not Like (Thumbs Down)</button>
            </div>
        </div>
    );
}