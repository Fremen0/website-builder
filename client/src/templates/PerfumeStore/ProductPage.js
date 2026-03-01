import React, { useState } from 'react';
import Navbar from './Navbar';
import './ProductPage.css';
import './perfume-theme.css';

const ProductPage = () => {
    const [selectedSize, setSelectedSize] = useState('100ml');
    const [isAdded, setIsAdded] = useState(false);

    const product = {
        name: 'Oud Royal',
        price: selectedSize === '100ml' ? 280 : 160,
        description: 'A majestic blend of hand-picked Vietnamese Agarwood, fused with the delicate sweetness of Taif Rose and a hint of rare Persian Saffron. Oud Royal is more than a scent—it is an inheritance of elegance.',
        notes: ['Top: Saffron, Bergamot', 'Heart: Damask Rose, Jasmine', 'Base: Aged Oud, Sandalwood, Musk'],
        image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=1000'
    };

    return (
        <div className="perfume-store-body">
            <div className="product-page">
                <Navbar />

                <div className="product-container">
                    <div className="product-media glass-morphism">
                        <img src={product.image} alt={product.name} className="main-image" />
                    </div>

                    <div className="product-details">
                        <span className="brand-label text-gold">EXCLUSIVELY OUD ROYAL</span>
                        <h1 className="product-title">{product.name}</h1>
                        <p className="product-price text-gold">${product.price}.00</p>

                        <div className="product-description font-premium">
                            <p>{product.description}</p>
                        </div>

                        <div className="scent-notes-box">
                            <h4 className="text-gold">Scent Profile</h4>
                            <ul>
                                {product.notes.map((note, index) => (
                                    <li key={index}>{note}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="size-selection">
                            <h4>Select Size</h4>
                            <div className="size-options">
                                <button
                                    className={`size-btn ${selectedSize === '50ml' ? 'active' : ''}`}
                                    onClick={() => setSelectedSize('50ml')}
                                >
                                    50ML
                                </button>
                                <button
                                    className={`size-btn ${selectedSize === '100ml' ? 'active' : ''}`}
                                    onClick={() => setSelectedSize('100ml')}
                                >
                                    100ML
                                </button>
                            </div>
                        </div>

                        <div className="product-actions">
                            <a
                                href="/templates/perfume-store/checkout"
                                className={`btn-gold add-to-cart ${isAdded ? 'success' : ''}`}
                                onClick={() => {
                                    setIsAdded(true);
                                    setTimeout(() => setIsAdded(false), 2000);
                                }}
                                style={{ textAlign: 'center' }}
                            >
                                {isAdded ? 'Added to Collection' : 'Purchase Scent'}
                            </a>
                            <button className="btn-outline wishlist-btn">
                                <i className="far fa-heart"></i> Add to Wishlist
                            </button>
                        </div>
                    </div>
                </div>

                {/* Recommended Scents Section */}
                <section className="recommendations">
                    <h2 className="text-gold">You May Also Admire</h2>
                    <div className="recommendations-grid">
                        {['Midnight Santal', 'Desert Saffron'].map(name => (
                            <div className="product-card mini" key={name}>
                                <div className="product-image-wrapper small">
                                    <img src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800" alt={name} />
                                </div>
                                <h3 className="text-gold" style={{ fontSize: '1.1rem', marginTop: '1rem' }}>{name}</h3>
                            </div>
                        ))}
                    </div>
                </section>
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

export default ProductPage;
