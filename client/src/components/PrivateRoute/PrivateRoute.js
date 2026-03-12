import React from 'react';
import { useAuth } from '../../context/AuthContext';
import AuthPage from '../../pages/AuthPage/AuthPage';

// Shows children if authenticated, otherwise shows the login/register page
const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div style={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f8fafc',
                gap: '16px'
            }}>
                <div style={{
                    width: '32px',
                    height: '32px',
                    border: '3px solid rgba(99, 102, 241, 0.2)',
                    borderTopColor: '#6366f1',
                    borderRadius: '50%',
                    animation: 'spin 1s ease-in-out infinite'
                }} />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                <p style={{ color: '#64748b', fontFamily: 'Inter, sans-serif', margin: 0, fontSize: '0.9rem', fontWeight: 500 }}>
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
