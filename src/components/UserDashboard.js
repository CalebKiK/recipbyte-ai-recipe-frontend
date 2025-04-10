"use client";

import { useState } from 'react';
import '../styles/UserDashboard.css';
import Favourites from './Favourites';
import Preferences from './Preferences';
import RecipeHistory from './RecipeHistory';

export default function UserDashboard() {
    const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    console.log("User logged out!"); // Replace with actual logout logic
    setShowModal(false);
  };
    return (
        <div className="user-dashboard-component">
            <h1>Dashboard</h1>
            <div className='dashboard-links'>
                <button>Preferences</button>
                <button>Recipe Favourites</button>
                <button>Recipe History</button>
                <button onClick={() => setShowModal(true)}>Logout</button>
                {showModal && <LogoutModal onClose={() => setShowModal(false)} onLogout={handleLogout} />}
            </div>
            <div className='selected-dashboard-links'>
                <Preferences />
                <Favourites />
                <RecipeHistory />
            </div>
        </div>
    );
}