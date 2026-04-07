import React from 'react';
import { useAuth } from '../../../context/AuthContext';

const UserMenu = () => {
    const { user, logout } = useAuth();
    const [open, setOpen] = React.useState(false);

    if (!user) return null;

    const initials = user.name
        ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
        : '??';

    return (
        <div style={{ position: 'relative' }}>
            <button
                id="user-menu-btn"
                title={user.name}
                onClick={() => setOpen(o => !o)}
                style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    background: 'rgba(255, 255, 255, 0.7)', border: '1px solid rgba(226, 232, 240, 0.8)',
                    borderRadius: '12px', padding: '6px 12px', cursor: 'pointer',
                    color: '#0f172a', fontSize: '0.875rem', fontWeight: '600',
                    transition: 'all 0.2s', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.01)'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.7)'}
            >
                <span style={{
                    width: '32px', height: '32px', borderRadius: '10px',
                    background: 'linear-gradient(135deg, #6366f1, #ec4899)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.85rem', fontWeight: '700', color: '#fff', flexShrink: 0,
                    boxShadow: '0 4px 8px rgba(99, 102, 241, 0.2)'
                }}>{initials}</span>
                <span style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {user.name}
                </span>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5"
                    style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', opacity: 0.5 }}>
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>

            {open && (
                <>
                    {/* Backdrop */}
                    <div onClick={() => setOpen(false)}
                        style={{ position: 'fixed', inset: 0, zIndex: 999 }} />
                    {/* Dropdown */}
                    <div style={{
                        position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                        background: 'rgba(255, 255, 255, 0.95)', border: '1px solid rgba(226, 232, 240, 1)',
                        backdropFilter: 'blur(16px)',
                        borderRadius: '16px', padding: '8px', minWidth: '180px',
                        boxShadow: '0 12px 30px -10px rgba(0,0,0,0.1)', zIndex: 1000,
                        animation: 'menuIn 0.15s ease'
                    }}>
                        <style>{`@keyframes menuIn { from { opacity:0; transform:translateY(-6px) } to { opacity:1; transform:translateY(0) } }`}</style>
                        <div style={{ padding: '8px 12px 10px', borderBottom: '1px solid rgba(226, 232, 240, 0.8)', marginBottom: '6px' }}>
                            <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#0f172a' }}>{user.name}</div>
                            <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '2px' }}>{user.email}</div>
                        </div>
                        <button
                            id="logout-btn"
                            onClick={() => { logout(); setOpen(false); }}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '8px', width: '100%',
                                padding: '8px 12px', background: 'transparent', border: 'none',
                                borderRadius: '10px', cursor: 'pointer', color: '#ef4444',
                                fontSize: '0.87rem', fontWeight: '600', transition: 'background 0.15s'
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(254, 226, 226, 0.8)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                <polyline points="16 17 21 12 16 7" />
                                <line x1="21" y1="12" x2="9" y2="12" />
                            </svg>
                            Sign Out
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default UserMenu;
