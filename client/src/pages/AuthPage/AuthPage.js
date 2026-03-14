import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './AuthPage.css';

const AuthPage = ({ onSuccess }) => {
    const [mode, setMode] = useState('login'); // 'login' | 'register'
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [localError, setLocalError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [particles, setParticles] = useState([]);

    const { login, register, setError } = useAuth();

    // Generate floating particles for background
    useEffect(() => {
        const p = Array.from({ length: 18 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 2,
            delay: Math.random() * 5,
            duration: Math.random() * 8 + 6,
        }));
        setParticles(p);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setLocalError('');
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError('');
        setIsLoading(true);

        let result;
        if (mode === 'login') {
            result = await login(formData.email, formData.password);
        } else {
            if (!formData.name.trim()) {
                setLocalError('Full name is required');
                setIsLoading(false);
                return;
            }
            if (formData.password.length < 6) {
                setLocalError('Password must be at least 6 characters');
                setIsLoading(false);
                return;
            }
            if (formData.password !== formData.confirmPassword) {
                setLocalError('Passwords do not match');
                setIsLoading(false);
                return;
            }
            result = await register(formData.name, formData.email, formData.password);
        }

        setIsLoading(false);
        if (result.success) {
            onSuccess && onSuccess();
        } else {
            setLocalError(result.message);
        }
    };

    const switchMode = () => {
        setMode(mode === 'login' ? 'register' : 'login');
        setFormData({ name: '', email: '', password: '', confirmPassword: '' });
        setLocalError('');
        setError(null);
    };

    return (
        <div className="auth-page">
            {/* Animated background */}
            <div className="auth-bg">
                <div className="auth-bg-gradient" />
                <div className="auth-grid" />
                {particles.map(p => (
                    <div
                        key={p.id}
                        className="auth-particle"
                        style={{
                            left: `${p.x}%`,
                            top: `${p.y}%`,
                            width: `${p.size}px`,
                            height: `${p.size}px`,
                            animationDelay: `${p.delay}s`,
                            animationDuration: `${p.duration}s`,
                        }}
                    />
                ))}
            </div>

            {/* Main card */}
            <div className={`auth-card ${mode === 'register' ? 'auth-card--tall' : ''}`}>
                {/* Logo / Branding */}
                <div className="auth-brand">
                    <span className="auth-brand-name">TWB</span>
                </div>

                {/* Tabs */}
                <div className="auth-tabs">
                    <button
                        className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
                        onClick={() => mode !== 'login' && switchMode()}
                        type="button"
                    >
                        Sign In
                    </button>
                    <button
                        className={`auth-tab ${mode === 'register' ? 'active' : ''}`}
                        onClick={() => mode !== 'register' && switchMode()}
                        type="button"
                    >
                        Create Account
                    </button>
                    <div className={`auth-tab-indicator ${mode === 'register' ? 'right' : 'left'}`} />
                </div>

                {/* Heading */}
                <div className="auth-heading">
                    <h1>{mode === 'login' ? 'Welcome back 👋' : 'Start building today ✨'}</h1>
                    <p>
                        {mode === 'login'
                            ? 'Sign in to access your projects'
                            : 'Create a free account and start crafting your websites'}
                    </p>
                </div>

                {/* Form */}
                <form className="auth-form" onSubmit={handleSubmit} noValidate>
                    {/* Name field - only for register */}
                    <div className={`auth-field-wrapper ${mode === 'register' ? 'auth-field--show' : 'auth-field--hide'}`}>
                        <div className="auth-field">
                            <label htmlFor="auth-name">Full Name</label>
                            <div className="auth-input-container">
                                <span className="auth-input-icon">
                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                        <circle cx="12" cy="7" r="4"/>
                                    </svg>
                                </span>
                                <input
                                    id="auth-name"
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    autoComplete="name"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Email field */}
                    <div className="auth-field">
                        <label htmlFor="auth-email">Email Address</label>
                        <div className="auth-input-container">
                            <span className="auth-input-icon">
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                    <polyline points="22,6 12,13 2,6"/>
                                </svg>
                            </span>
                            <input
                                id="auth-email"
                                type="email"
                                name="email"
                                placeholder="example@email.com"
                                value={formData.email}
                                onChange={handleChange}
                                autoComplete="email"
                                required
                            />
                        </div>
                    </div>

                    {/* Password field */}
                    <div className="auth-field">
                        <label htmlFor="auth-password">Password</label>
                        <div className="auth-input-container">
                            <span className="auth-input-icon">
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                                </svg>
                            </span>
                            <input
                                id="auth-password"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder={mode === 'login' ? '••••••••' : 'At least 6 characters'}
                                value={formData.password}
                                onChange={handleChange}
                                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                                required
                            />
                            <button
                                type="button"
                                className="auth-toggle-password"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label="Show / hide password"
                            >
                                {showPassword ? (
                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                                        <line x1="1" y1="1" x2="23" y2="23"/>
                                    </svg>
                                ) : (
                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                        <circle cx="12" cy="12" r="3"/>
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password field - only for register */}
                    <div className={`auth-field-wrapper ${mode === 'register' ? 'auth-field--show' : 'auth-field--hide'}`}>
                        <div className="auth-field">
                            <label htmlFor="auth-confirm-password">Confirm Password</label>
                            <div className="auth-input-container">
                                <span className="auth-input-icon">
                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                                    </svg>
                                </span>
                                <input
                                    id="auth-confirm-password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    placeholder="Confirm your password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    className="auth-toggle-password"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label="Show / hide password"
                                >
                                    {showPassword ? (
                                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                                            <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                                            <line x1="1" y1="1" x2="23" y2="23"/>
                                        </svg>
                                    ) : (
                                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                            <circle cx="12" cy="12" r="3"/>
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Error message */}
                    {localError && (
                        <div className="auth-error" role="alert">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10"/>
                                <line x1="12" y1="8" x2="12" y2="12"/>
                                <line x1="12" y1="16" x2="12.01" y2="16"/>
                            </svg>
                            {localError}
                        </div>
                    )}

                    {/* Submit button */}
                    <button
                        id="auth-submit-btn"
                        type="submit"
                        className="auth-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="auth-spinner" />
                        ) : (
                            mode === 'login' ? 'Sign In' : 'Create Account'
                        )}
                    </button>
                </form>

                {/* Footer */}
                <p className="auth-footer-text">
                    {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
                    <button type="button" className="auth-link" onClick={switchMode}>
                        {mode === 'login' ? 'Sign up for free' : 'Sign in'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default AuthPage;
