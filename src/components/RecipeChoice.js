"use client";

import { toSentenceCase, toTitleCase } from '@/utils/stringFormatters';
import '../styles/RecipeChoice.css';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import { useState } from 'react';

export default function RecipeChoice({ recipe }) {
    const { token } = useAuth();
    const [message, setMessage] = useState(null);

    const displayIngredients = recipe.ingredients 
        ? recipe.ingredients.map(ingredient => toSentenceCase(ingredient.name)).join(', ') 
        : 'N/A';

    const addToFavorites = async () => {
        try {
            const response = await axios.put(
                `http://127.0.0.1:8000/api/users/favorites/${recipe.id}/toggle/`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Error adding to favorites. Please try again.');
        }
    };

    const addToHistory = async () => {
        try {
            await axios.put(
                `http://127.0.0.1:8000/api/users/history/${recipe.id}/add/`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
        } catch (error) {
            console.error('Error adding to history');
        }
    };

    const handleLike = async () => {
        if (!token) {
            setMessage('Please log in to add to favorites.');
            return;
        }
        await addToFavorites();
        await addToHistory();
    };

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
                <button className='like-recipe-btn' onClick={handleLike}>Like (Thumbs Up)</button>
                <button className='dislike-recipe-btn'>Not Like (Thumbs Down)</button>
            </div>
            {message && <div className='message'>{message}</div>}
        </div>
    );
}