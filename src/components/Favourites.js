"use client";

import '../styles/UserDashboard.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import RecipeItem from './RecipeItem';
import toast from 'react-hot-toast';

export default function Favourites() {
    const { token } = useAuth();
    const [favorites, setFavorites] = useState([]);
    const [message, setMessage] = useState('');
    const [expandedId, setExpandedId] = useState(null);

    useEffect(() => {
        async function fetchFavorites() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/users/profile/', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                // console.log("Fetched profile response:", response.data);
                setFavorites(response.data[0]?.favorite_recipes || []);
            } catch (error) {
                toast.error('Failed to load favorites.');
            }
        }
        fetchFavorites();
    }, [token]);

    const handleRemove = async (id) => {
        try {
            const res = await axios.put(`http://127.0.0.1:8000/api/users/favorites/${id}/toggle/`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success(res.data.message);

            // Refetch updated favorites
            const updatedRes = await axios.get('http://127.0.0.1:8000/api/users/profile/', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setFavorites(updatedRes.data.favorite_recipes || []);
        } catch (err) {
            toast.error('Failed to remove from favorites.');
        }
    };

    // const handleRemove = async (id) => {
    //     try {
    //         const res = await axios.put(`http://127.0.0.1:8000/api/users/favorites/${id}/toggle/`, {}, {
    //             headers: { Authorization: `Bearer ${token}` },
    //         });
    //         setFavorites(prev => prev.filter(r => r.id !== id));
    //         setMessage(res.data.message);
    //     } catch (err) {
    //         setMessage('Failed to remove from favorites.');
    //     }
    // };

    const handleCardClick = (recipeId) => {
        setExpandedId(prev => prev === recipeId ? null : recipeId);
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
                        isExpanded={expandedId === recipe.id}
                        onClick={() => handleCardClick(recipe.id)}
                        onRemove={() => handleRemove(recipe.id)}
                    />
                ))
            )}
            {/* {message && <p className='message'>{message}</p>} */}
        </div>
    );
}