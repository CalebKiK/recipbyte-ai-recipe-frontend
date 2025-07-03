"use client";

import '../styles/UserDashboard.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import RecipeItem from './RecipeItem';

export default function RecipeHistory() {
    const { token } = useAuth();
    const [history, setHistory] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        async function fetchHistory() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/users/history/', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setHistory(response.data || []);
            } catch (error) {
                setMessage('Failed to load history.');
            }
        }
        fetchHistory();
    }, [token]);

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
                        showRemove={false}
                    />
                ))
            )}
            {message && <p className='message'>{message}</p>}
        </div>
    );
}