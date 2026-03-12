import React from 'react';
import { useAuth } from '../../context/AuthContext';
import AuthPage from '../../pages/AuthPage/AuthPage';

// Shows children if authenticated, otherwise shows the login/register page
const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                flexDirection: 'column',
                gap: '16px'
            }}>
                <div style={{
                    width: '44px',
                    height: '44px',
                    border: '3px solid rgba(99,102,241,0.2)',
                    borderTop: '3px solid #6366f1',
                    borderRadius: '50%',
                    animation: 'spin 0.7s linear infinite'
                }} />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                <p style={{ color: '#475569', fontFamily: 'Inter, sans-serif', margin: 0, fontSize: '0.9rem' }}>
                    Loading...
                </p>
            </div>
        );
    }

    if (!user) {
        return <AuthPage />;
    }

    return children;
};

export default PrivateRoute;
