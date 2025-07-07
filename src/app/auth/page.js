"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import "@/styles/UserAuthentication.css";
import toast from "react-hot-toast";

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: "", email: "", password: "", password2: ""
    });
    const [error, setError] = useState("");
    const router = useRouter();
    const { login } = useAuth();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            if (isLogin) {
                const res = await axios.post("http://127.0.0.1:8000/api/users/login/", {
                    username: formData.username,
                    password: formData.password
                });
                console.log("Login response in auth/page.js:", res.data);
                login(res.data.access);
                localStorage.setItem("refreshToken", res.data.refresh);
                toast.success(`Welcome back, ${formData.username}!`);
                router.push("/homepage");
            } else {
                await axios.post("http://127.0.0.1:8000/api/users/register/", formData);
                toast.success("Account created successfully!")
                setIsLogin(true);
            }
        } catch (err) {
            setError(err.response?.data?.error || "An error occurred");
        }
    };

    return (
        <div className="user-authentication-component">
            <h2>{isLogin ? "Login" : "Sign Up"}</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
                {!isLogin && <input type="email" name="email" placeholder="Email" onChange={handleChange} required />}
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                {!isLogin && <input type="password" name="password2" placeholder="Confirm Password" onChange={handleChange} required />}
                <button className="user-authentication-button" type="submit">{isLogin ? "Login" : "Register"}</button>
            </form>
            <button className="dont-have-account-button" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
            </button>
        </div>
    );
}