"use client";

import '../styles/RecipeCard.css';

export default function RecipeCard() {
    return (
        <div className="recipe-card">
            <h5>Recipe Title</h5>
            <p>Recipe Description (Optional)</p>
            <p>Difficulty: (optional)</p>
            <p>Calories & Nutrition content</p>
        </div>
    );
}