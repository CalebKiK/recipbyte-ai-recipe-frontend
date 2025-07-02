"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");
        if (storedToken) setToken(storedToken);
    }, []);

    const login = (newToken) => {
        localStorage.setItem("authToken", newToken);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );

};

export const useAuth = () => useContext(AuthContext);