"use client";

import { toSentenceCase, toTitleCase } from '@/utils/stringFormatters';
import '../styles/RecipeChoice.css';

export default function RecipeChoice({ recipe }) {
    const displayIngredients = recipe.ingredients ? recipe.ingredients.map(ingredient => toSentenceCase(ingredient.name)).join(', ') : 'N/A'

    return (
        <div className="recipe-choice-component">
            <h2>Let’s make: {toTitleCase(recipe.title)}</h2>
            <div className='recipe-choice-ingredients'>
                <h4>Ingredients</h4>
                <p>{displayIngredients}</p>
            </div>
            <div className='recipe-choice-text'>
                <h4>Steps</h4>
                <p>{toSentenceCase(recipe.steps)}</p>
            </div>
            <div className='recipe-choice-btns'>
                <button className='substitute-ingredient-btn'>Substitute Ingredient</button>
                <button className='like-recipe-btn'>Like (Thumbs Up)</button>
                <button className='dislike-recipe-btn'>Not Like (Thumbs Down)</button>
            </div>
        </div>
    );
}