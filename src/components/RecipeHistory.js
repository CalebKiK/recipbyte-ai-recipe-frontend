"use client";

import '../styles/UserDashboard.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import RecipeItem from './RecipeItem';
import toast from 'react-hot-toast';

export default function RecipeHistory() {
    const { token } = useAuth();
    const [history, setHistory] = useState([]);
    const [message, setMessage] = useState('');
    const [expandedId, setExpandedId] = useState(null);

    useEffect(() => {
        async function fetchHistory() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/users/history/', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setHistory(response.data || []);
            } catch (error) {
                toast.error('Failed to load history.');
            }
        }
        fetchHistory();
    }, [token]);

    const handleCardClick = (recipeId) => {
        setExpandedId(prev => prev === recipeId ? null : recipeId);
    };

    return (
        <div className="recipe-history-component">
            <h2>Recipe History</h2>
            {history.length === 0 ? (
                <p>You haven’t viewed any recipes yet.</p>
            ) : (
                history.map(recipe => (
                    <RecipeItem
                        key={recipe.id}
                        recipe={recipe}
                        isExpanded={expandedId===recipe.id}
                        onClick={() => handleCardClick(recipe.id)}
                        showRemove={false}
                    />
                ))
            )}
            {message && <p className='message'>{message}</p>}
        </div>
    );
}