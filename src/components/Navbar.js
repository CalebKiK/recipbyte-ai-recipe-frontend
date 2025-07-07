"use client";

import '../styles/Navbar.css';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';

export default function Navbar() {
    const { token, logout } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push("/homepage");
        toast.success("Logged out successfully!");
    };

    return (
        <div className="navbar">
            <div className='navbar-logo'>
                <img src='/images/logo_option_3.png' alt='recipebyte-logo'/>
                <h3>RECIPEBYTE</h3>
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
                    <button onClick={handleLogout}>Logout</button>
                )}
            </div>
        </div>
    );
}