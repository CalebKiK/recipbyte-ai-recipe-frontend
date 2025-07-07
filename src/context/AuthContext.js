"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");
        if (storedToken) {
            setToken(storedToken);
            try {
                const decoded = jwtDecode(storedToken);
                // console.log("Decoded token in AuthContext.js file to see user:", jwtDecode(token));
                setUser(decoded);
            } catch (err) {
                console.error("Invalid token", err);
                logout();
            }
        };
    }, []);

    const login = async (newToken) => {
        // console.log("Received token in login:", newToken);
        localStorage.setItem("authToken", newToken);
        setToken(newToken);

        try {
            const decoded = jwtDecode(newToken);

            const res = await axios.get('http://127.0.0.1:8000/api/users/profile/', {
                headers: { Authorization: `Bearer ${newToken}` }
            });

            setUser(Array.isArray(res.data) ? res.data[0].user : res.data.user ?? res.data); 
        } catch (err) {
            console.error("Invalid login token", err);
            logout();
        }
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );

};

export const useAuth = () => useContext(AuthContext);