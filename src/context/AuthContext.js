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
        console.log("Received token in login:", newToken);
        localStorage.setItem("authToken", newToken);
        console.log("Received token in login 2:", newToken);
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


// "use client";

// import { createContext, useContext, useState, useEffect } from "react";
// import { jwtDecode } from "jwt-decode";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//     const [token, setToken] = useState(null);
//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         const storedToken = localStorage.getItem("authToken");
//         if (storedToken) {
//             setToken(storedToken);
//             try {
//                 const decoded = jwtDecode(storedToken);
//                 setUser(decoded);
//             } catch (err) {
//                 console.error("Invalid token", err);
//                 logout();
//             }
//         }
//     }, []);

//     const login = (newToken) => {
//         console.log("Received token in login:", newToken);
//         localStorage.setItem("authToken", newToken);
//         setToken(newToken);
//         try {
//             const decoded = jwtDecode(newToken);
//             setUser(decoded); 
//         } catch (err) {
//             console.error("Invalid login token", err);
//             logout();
//         }
//     };

//     const logout = () => {
//         localStorage.removeItem("authToken");
//         setToken(null);
//         setUser(null);
//     };

//     return (
//         <AuthContext.Provider value={{ token, user, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );

// };

// export const useAuth = () => useContext(AuthContext);