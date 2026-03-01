import React from 'react';
import Navbar from './Navbar';
import './DashboardPage.css';
import './perfume-theme.css';

const DashboardPage = () => {
    const orders = [
        { id: '#10293', date: 'Oct 12, 2026', status: 'In Transit', total: '$280.00' },
        { id: '#09842', date: 'Aug 05, 2026', status: 'Delivered', total: '$415.00' },
        { id: '#08122', date: 'Jun 22, 2026', status: 'Delivered', total: '$190.00' }
    ];

    return (
        <div className="perfume-store-body">
            <div className="dashboard-page">
                <Navbar />

                <div className="dashboard-container">
                    <aside className="dashboard-sidebar glass-morphism">
                        <div className="user-profile">
                            <div className="profile-img">M</div>
                            <div className="profile-info">
                                <h3 style={{ color: '#fff', margin: 0 }}>Mohammed</h3>
                                <p className="text-gold" style={{ margin: 0, fontSize: '0.8rem' }}>Premium Member</p>
                            </div>
                        </div>

                        <nav className="dashboard-nav">
                            <a href="/templates/perfume-store/dashboard" className="active">My Orders</a>
                            <a href="/templates/perfume-store/dashboard">Profile Settings</a>
                            <a href="/templates/perfume-store/dashboard">Wishlist</a>
                            <a href="/templates/perfume-store" className="logout">Logout</a>
                        </nav>
                    </aside>

                    <main className="dashboard-main">
                        <header className="dashboard-header">
                            <h1 className="text-gold">Welcome back, Mohammed</h1>
                            <p className="font-premium" style={{ color: '#aaa' }}>Your collection awaits.</p>
                        </header>

                        <section className="active-order">
                            <div className="active-order-card glass-morphism">
                                <div className="card-header">
                                    <h3 style={{ color: '#fff' }}>Current Order #10293</h3>
                                    <span className="status-badge gold">In Transit</span>
                                </div>

                                <div className="order-progress">
                                    <div className="progress-line">
                                        <div className="progress-fill" style={{ width: '66%' }}></div>
                                    </div>
                                    <div className="progress-labels">
                                        <span>Order Placed</span>
                                        <span className="current">Shipped</span>
                                        <span>In Transit</span>
                                    </div>
                                </div>

                                <div className="order-details-mini" style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px' }}>
                                    <img src="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=60" alt="Oud Royal" style={{ borderRadius: '4px' }} />
                                    <p style={{ color: '#ccc', marginLeft: '1rem' }}>Oud Royal - 100ml | Standard Delivery</p>
                                </div>
                            </div>
                        </section>

                        <section className="order-history">
                            <h2 style={{ color: '#fff', fontFamily: 'Cinzel, serif' }}>Order History</h2>
                            <div className="history-table glass-morphism">
                                <div className="table-header" style={{ color: '#666', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                    <span>Order ID</span>
                                    <span>Date</span>
                                    <span>Total</span>
                                    <span>Status</span>
                                </div>
                                {orders.map(order => (
                                    <div key={order.id} className="table-row" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <span className="order-id" style={{ color: '#fff' }}>{order.id}</span>
                                        <span style={{ color: '#999' }}>{order.date}</span>
                                        <span style={{ color: '#fff' }}>{order.total}</span>
                                        <span className={`status-text ${order.status === 'Delivered' ? 'gold' : ''}`}>{order.status}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </main>
                </div>

                <a href="/" className="back-to-editor-btn">
                    <i className="fas fa-edit"></i> Back to Editor
                </a>

                <style>{`
                    .back-to-editor-btn {
                        position: fixed;
                        right: 30px;
                        bottom: 30px;
                        background: #6366f1;
                        color: #fff;
                        padding: 12px 24px;
                        border-radius: 50px;
                        text-decoration: none;
                        font-weight: 600;
                        box-shadow: 0 10px 20px rgba(0,0,0,0.3);
                        z-index: 9999;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        transition: all 0.3s ease;
                    }
                    .back-to-editor-btn:hover {
                        transform: translateY(-5px);
                        background: #4f46e5;
                    }
                    .status-badge.gold {
                        background: rgba(212,175,55,0.1);
                        color: var(--gold-primary);
                        padding: 4px 12px;
                        border-radius: 20px;
                        font-size: 0.75rem;
                        text-transform: uppercase;
                        font-weight: 700;
                    }
                    .status-text.gold {
                        color: var(--gold-primary);
                    }
                `}</style>
            </div>
        </div>
    );
};

export default DashboardPage;
