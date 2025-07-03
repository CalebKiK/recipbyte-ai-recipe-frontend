"use client";

import { useState } from 'react';
import { toSentenceCase, toTitleCase } from '@/utils/stringFormatters';

export default function RecipeItem({ recipe, onRemove, showRemove = true }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="recipe-item" onClick={() => setExpanded(!expanded)}>
            <h4>{toTitleCase(recipe.title)}</h4>
            <p><strong>Ingredients:</strong> {recipe.ingredients?.map(i => toSentenceCase(i.name)).join(', ')}</p>
            {expanded && (
                <p><strong>Instructions:</strong> {toSentenceCase(recipe.steps)}</p>
            )}
            {showRemove && (
                <button className="remove-button" onClick={(e) => {
                    e.stopPropagation();
                    onRemove();
                }}>Remove</button>
            )}
        </div>
    );
}