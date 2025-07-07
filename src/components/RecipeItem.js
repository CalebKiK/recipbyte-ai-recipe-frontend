"use client";

import { useState } from 'react';
import '../styles/UserDashboard.css';
import { toSentenceCase, toTitleCase } from '@/utils/stringFormatters';

export default function RecipeItem({ recipe,isExpanded, onClick, onRemove, showRemove = true }) {
    return (
        <div className="recipe-item" onClick={onClick}>
            <div className='recipe-item-content'>
                <h4>{toTitleCase(recipe.title)}</h4>
                <p><strong>Ingredients:</strong> {recipe.ingredients?.map(i => toSentenceCase(i.name)).join(', ')}</p>
                {isExpanded && (
                    <p><strong>Instructions:</strong> {toSentenceCase(recipe.steps)}</p>
                )}
            </div>
            
            <div className='recipe-item-remove-btn'>
                {showRemove && (
                    <button className="remove-button" onClick={(e) => {
                        e.stopPropagation();
                        onRemove();
                    }}>x</button>
                )}
            </div>
            
        </div>
    );
}