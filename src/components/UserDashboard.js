"use client";

import { useState } from 'react';
import '../styles/UserDashboard.css';
import Favourites from './Favourites';
import Preferences from './Preferences';
import RecipeHistory from './RecipeHistory';

export default function UserDashboard() {
    const [selectedSection, setSelectedSection] = useState('preferences');

  const renderSection = () => {
    switch (selectedSection) {
        case 'preferences':
            return <Preferences />;
        case 'favourites':
            return <Favourites />;
        case 'history':
            return <RecipeHistory />;
        default:
            return <Preferences />
    }
  };

    return (
        <div className="user-dashboard-component">
            <h1>Dashboard</h1>
            <div className='dashboard-content'>
                <div className='dashboard-links'>
                    <button onClick={() => setSelectedSection('preferences')}>Preferences</button>
                    <button onClick={() => setSelectedSection('favourites')}>Recipe Favourites</button>
                    <button onClick={() => setSelectedSection('history')}>Recipe History</button>
                </div>
                <div className='selected-dashboard-link'>
                    {renderSection()}
                </div>
            </div>
        </div>
    );
}