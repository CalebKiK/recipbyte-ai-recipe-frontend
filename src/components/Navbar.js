"use client";

import '../styles/Navbar.css';
import Link from 'next/link';

export default function Navbar() {
    return (
        <div className="navbar">
            <div className='navbar-logo'>
                <img src='/images/logo_option_3.png' alt='bytebistro-logo'/>
                <h3>BYTEBISTRO</h3>
            </div>
            <div className='navbar-links'>
                <Link href="/homepage">Home</Link>
                <Link href="/recipes">Recipes</Link>
                <Link href="/dashboard">Dashboard</Link>
            </div>
        </div>
    );
}