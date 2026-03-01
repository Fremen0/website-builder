import React from 'react';
import Navbar from './Navbar';
import './LandingPage.css';
import './perfume-theme.css';

const LandingPage = () => {
    return (
        <div className="perfume-store-body">
            <div className="landing-page">
                <Navbar />
                <header className="hero-section">
                    <div className="hero-overlay">
                        <div className="hero-content">
                            <p className="hero-subtitle">The Essence of Royalty</p>
                            <h1 className="hero-title text-gold">OUD ROYAL</h1>
                            <p className="hero-description">Experience the rarest oud, handpicked from ancient gardens. A scent that transcends time and defines true luxury.</p>
                            <div className="hero-btns">
                                <button className="btn-outline">Our Story</button>
                                <a href="/templates/perfume-store/product" className="btn-gold">Explore Scent</a>
                            </div>
                        </div>
                    </div>
                </header>

                <section className="featured-collections">
                    <h2 className="section-title">Signature Creations</h2>
                    <div className="product-grid">
                        <div className="product-card">
                            <div className="product-image">
                                <img src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=400" alt="Perfume" />
                                <div className="hover-actions">
                                    <a href="/templates/perfume-store/product" className="quick-view">Discerning View</a>
                                </div>
                            </div>
                            <div className="product-info">
                                <h3>Ethereal Rose</h3>
                                <p className="price">$280.00</p>
                            </div>
                        </div>
                        <div className="product-card">
                            <div className="product-image">
                                <img src="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=400" alt="Perfume" />
                                <div className="hover-actions">
                                    <a href="/templates/perfume-store/product" className="quick-view">Discerning View</a>
                                </div>
                            </div>
                            <div className="product-info">
                                <h3>Midnight Santal</h3>
                                <p className="price">$320.00</p>
                            </div>
                        </div>
                        <div className="product-card">
                            <div className="product-image">
                                <img src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=400" alt="Perfume" />
                                <div className="hover-actions">
                                    <a href="/templates/perfume-store/product" className="quick-view">Discerning View</a>
                                </div>
                            </div>
                            <div className="product-info">
                                <h3>Desert Saffron</h3>
                                <p className="price">$295.00</p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="template-label" style={{ position: 'fixed', bottom: '20px', left: '20px', backgroundColor: 'rgba(212, 175, 55, 0.2)', padding: '10px 20px', borderRadius: '30px', border: '1px solid var(--gold-primary)', color: 'var(--gold-primary)', zIndex: 1000, pointerEvents: 'none' }}>
                    Managed Template: Luxury Perfume Store
                </div>
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
            `}</style>
        </div>
    );
};

export default LandingPage;
