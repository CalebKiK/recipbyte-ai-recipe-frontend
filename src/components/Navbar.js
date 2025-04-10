"use client";

import '../styles/Navbar.css';
import Link from 'next/link';

export default function Navbar() {
    return (
        <div className="navbar">
            <img src='' alt='bytebistro-logo'/>
            <div className='navbar-links'>
                <Link href="/homepage">Home</Link>
                <Link href="/recipes">Recipes</Link>
                <Link href="/dashboard">Dashboard</Link>
            </div>
        </div>
    );
}