"use client";

import '../styles/RecipePage.css';

export default function RecipeCard() {
    return (
        <div className="recipe-card">
            <img src='' alt="recipe-title"/>
            <h5>Recipe Title</h5>
            <p>Recipe Description (Optional)</p>
            <p>Difficulty: (optional)</p>
            <p>Calories & Nutrition content</p>
        </div>
    );
}