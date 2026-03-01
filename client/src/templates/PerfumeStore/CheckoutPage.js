import React, { useState } from 'react';
import Navbar from './Navbar';
import './CheckoutPage.css';
import './perfume-theme.css';

const CheckoutPage = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: '',
        address: '',
        city: '',
        delivery: 'standard',
        cardNumber: '',
        expiry: '',
        cvv: ''
    });

    const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    const handleCompletePurchase = () => {
        alert('Order Placed! Redirecting to Dashboard...');
        window.location.href = '/templates/perfume-store/dashboard';
    };

    return (
        <div className="perfume-store-body">
            <div className="checkout-page">
                <Navbar />

                <div className="checkout-container">
                    <div className="checkout-form-section glass-morphism">
                        <div className="progress-bar">
                            {['Shipping', 'Delivery', 'Payment'].map((label, i) => (
                                <div key={label} className={`progress-step ${step > i ? 'active' : ''}`}>
                                    <span className="step-num">{i + 1}</span>
                                    <span className="step-label">{label}</span>
                                </div>
                            ))}
                        </div>

                        <div className="form-content">
                            {step === 1 && (
                                <div className="step-content">
                                    <h2 className="text-gold">Shipping Details</h2>
                                    <div className="input-group">
                                        <label>Full Name</label>
                                        <input type="text" placeholder="Enter your full name" className="premium-input" />
                                    </div>
                                    <div className="input-group">
                                        <label>Address</label>
                                        <input type="text" placeholder="House number and street" className="premium-input" />
                                    </div>
                                    <div className="input-group">
                                        <label>City</label>
                                        <input type="text" placeholder="Enter your city" className="premium-input" />
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="step-content">
                                    <h2 className="text-gold">Delivery Method</h2>
                                    <div className="delivery-options">
                                        <div className={`delivery-card ${formData.delivery === 'standard' ? 'selected' : ''}`} onClick={() => setFormData({ ...formData, delivery: 'standard' })}>
                                            <span className="delivery-title">Standard Delivery</span>
                                            <span className="delivery-time">3-5 Business Days</span>
                                            <span className="delivery-price text-gold">FREE</span>
                                        </div>
                                        <div className={`delivery-card ${formData.delivery === 'express' ? 'selected' : ''}`} onClick={() => setFormData({ ...formData, delivery: 'express' })}>
                                            <span className="delivery-title">Express Delivery</span>
                                            <span className="delivery-time">1-2 Business Days</span>
                                            <span className="delivery-price text-gold">$25.00</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="step-content">
                                    <h2 className="text-gold">Payment Details</h2>
                                    <div className="input-group">
                                        <label>Card Number</label>
                                        <input type="text" placeholder="0000 0000 0000 0000" className="premium-input" />
                                    </div>
                                    <div className="row">
                                        <div className="input-group">
                                            <label>Expiry Date</label>
                                            <input type="text" placeholder="MM/YY" className="premium-input" />
                                        </div>
                                        <div className="input-group">
                                            <label>CVV</label>
                                            <input type="text" placeholder="***" className="premium-input" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="step-actions">
                                {step > 1 && <button className="btn-outline" onClick={prevStep}>Back</button>}
                                <button className="btn-gold" style={{ border: 'none' }} onClick={step === 3 ? handleCompletePurchase : nextStep}>
                                    {step === 3 ? 'Complete Purchase' : 'Next Step'}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="order-summary sidebar glass-morphism">
                        <h3 className="text-gold" style={{ fontFamily: 'Cinzel, serif' }}>Order Summary</h3>
                        <div className="summary-item">
                            <img src="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=100" alt="Oud Royal" />
                            <div className="item-info">
                                <p className="item-name">Oud Royal</p>
                                <p className="item-qty">Qty: 1 | 100ml</p>
                                <p className="item-price text-gold">$280.00</p>
                            </div>
                        </div>
                        <div className="summary-divider"></div>
                        <div className="summary-row">
                            <span style={{ color: '#aaa' }}>Subtotal</span>
                            <span>$280.00</span>
                        </div>
                        <div className="summary-row">
                            <span style={{ color: '#aaa' }}>Shipping</span>
                            <span>{formData.delivery === 'express' ? '$25.00' : 'FREE'}</span>
                        </div>
                        <div className="summary-total" style={{ borderTop: 'var(--border-premium)', paddingTop: '1rem', marginTop: '1rem' }}>
                            <span style={{ fontFamily: 'Cinzel, serif', fontSize: '1.2rem' }}>Total</span>
                            <span className="text-gold" style={{ fontSize: '1.4rem' }}>${280 + (formData.delivery === 'express' ? 25 : 0)}.00</span>
                        </div>
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
                    .premium-input {
                        background: rgba(255,255,255,0.05) !important;
                        border: 1px solid rgba(212,175,55,0.2) !important;
                        color: #fff !important;
                        padding: 12px !important;
                        border-radius: 4px !important;
                        width: 100% !important;
                        outline: none !important;
                        transition: border-color 0.3s ease !important;
                    }
                    .premium-input:focus {
                        border-color: var(--gold-primary) !important;
                    }
                `}</style>
            </div>
        </div>
    );
};

export default CheckoutPage;
