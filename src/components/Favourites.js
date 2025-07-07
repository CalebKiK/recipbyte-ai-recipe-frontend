"use client";

import '../styles/UserDashboard.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import RecipeItem from './RecipeItem';

export default function Favourites() {
    const { token } = useAuth();
    const [favorites, setFavorites] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        async function fetchFavorites() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/users/profile/', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setFavorites(response.data.favorite_recipes || []);
            } catch (error) {
                setMessage('Failed to load favorites.');
            }
        }
        fetchFavorites();
    }, [token]);

    const handleRemove = async (id) => {
        try {
            const res = await axios.put(`http://127.0.0.1:8000/api/users/favorites/${id}/toggle/`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setFavorites(prev => prev.filter(r => r.id !== id));
            setMessage(res.data.message);
        } catch (err) {
            setMessage('Failed to remove from favorites.');
        }
    };

    return (
        <div className="user-favourites-component">
            <h2>Recipe Favourites</h2>
            {favorites.length === 0 ? (
                <p>No recipes in favourites at the moment.</p>
            ) : (
                favorites.map(recipe => (
                    <RecipeItem
                        key={recipe.id}
                        recipe={recipe}
                        onRemove={() => handleRemove(recipe.id)}
                    />
                ))
            )}
            {message && <p className='message'>{message}</p>}
        </div>
    );
}