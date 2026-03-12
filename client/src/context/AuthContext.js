import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

const API_URL = 'http://localhost:5000/api';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Set axios default header whenever token changes
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            localStorage.setItem('token', token);
            fetchCurrentUser();
        } else {
            delete axios.defaults.headers.common['Authorization'];
            localStorage.removeItem('token');
            setUser(null);
            setLoading(false);
        }
    }, [token]);

    const fetchCurrentUser = async () => {
        try {
            const res = await axios.get(`${API_URL}/auth/me`);
            setUser(res.data.user);
        } catch {
            // Token invalid or expired
            setToken(null);
        } finally {
            setLoading(false);
        }
    };

    const register = async (name, email, password) => {
        setError(null);
        try {
            const res = await axios.post(`${API_URL}/auth/register`, { name, email, password });
            setToken(res.data.token);
            setUser(res.data.user);
            return { success: true };
        } catch (err) {
            const msg = err.response?.data?.message || 'An error occurred during registration';
            setError(msg);
            return { success: false, message: msg };
        }
    };

    const login = async (email, password) => {
        setError(null);
        try {
            const res = await axios.post(`${API_URL}/auth/login`, { email, password });
            setToken(res.data.token);
            setUser(res.data.user);
            return { success: true };
        } catch (err) {
            const msg = err.response?.data?.message || 'An error occurred during login';
            setError(msg);
            return { success: false, message: msg };
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, error, login, register, logout, setError }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};

export default AuthContext;
