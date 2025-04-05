"use client";

import '../styles/Navbar.css';

export default function Navbar() {
    return (
        <div className="navbar">
            <img src='' alt='bytebistro-logo'/>
            <div className='navbar-links'>
                <button className='home-page-btn'>Home</button>
                <button className='dashboard-page-btn'>Dashboard</button>
            </div>
        </div>
    );
}