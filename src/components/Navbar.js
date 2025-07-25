"use client";

import '../styles/Navbar.css';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import Image from 'next/image';

export default function Navbar() {
    const { token, logout } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push("/homepage");
        toast.success("Logged out successfully!");
    };

    const handleDashboardClick = (e) => {
        e.preventDefault();
        if (!token) {
            toast.error("You must sign in to access dashboard.")
        } else {
            router.push("/dashboard");
        }
    };

    return (
        <div className="navbar">
            <div className='navbar-logo'>
                <Image src='/images/logo_option_3.png' alt='recipebyte-logo' height={40} width={40}/>
                <h3>RECIPBYTE</h3>
            </div>
            <div className='navbar-links'>
                <Link href="/homepage">Home</Link>
                {/* <Link href="/recipes">Recipes</Link> */}

                {/* {token && (
                    <Link href="/dashboard">Dashboard</Link>
                )} */}

                <Link href="/dashboard" legacyBehavior>
                    <a onClick={handleDashboardClick}>Dashboard</a>
                </Link>
                
                {!token ? (
                    <Link href="/auth">Sign In</Link>
                ) : (
                    <button onClick={handleLogout}>Logout</button>
                )}
            </div>
        </div>
    );
}