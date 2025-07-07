"use client";

import '../styles/Navbar.css';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
    const { token, logout } = useAuth();

    return (
        <div className="navbar">
            <div className='navbar-logo'>
                <img src='/images/logo_option_3.png' alt='bytebistro-logo'/>
                <h3>BYTEBISTRO</h3>
            </div>
            <div className='navbar-links'>
                <Link href="/homepage">Home</Link>
                {/* <Link href="/recipes">Recipes</Link> */}

                {token && (
                    <Link href="/dashboard">Dashboard</Link>
                )}
                
                {!token ? (
                    <Link href="/auth">Login / Signup</Link>
                ) : (
                    <button onClick={logout}>Logout</button>
                )}
            </div>
        </div>
    );
}