"use client";

import '../styles/RecipePage.css';
import RecipeCard from './RecipeCardOption';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function RecipeSuggestions({ recipes, onSelectRecipe }) {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = direction === 'left' ? -320 : 320;
            scrollRef.current.scrollBy({ left:scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="recipe-suggestions-component">
            <h2>Recipe Suggestions</h2>
            <h4>Pick a dish that excites you.</h4>
            <div className='scroll-buttons'>
                <button onClick={() => scroll('left')} className="scroll-btn">
                    <ChevronLeft size={20} />
                </button>
                <div className='recipe-suggestions' ref={scrollRef}>
                    {recipes.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} onSelectRecipe={onSelectRecipe} />
                    ))}
                </div>
                <button onClick={() => scroll('right')} className="scroll-btn">
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
}