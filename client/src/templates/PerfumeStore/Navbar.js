import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar glass-morphism">
            <div className="navbar-logo">
                <h1 className="text-gold">OUD ROYAL</h1>
            </div>
            <ul className="navbar-links">
                <li><a href="/templates/perfume-store">Collections</a></li>
                <li><a href="/templates/perfume-store">Our Story</a></li>
                <li><a href="/templates/perfume-store">Shop All</a></li>
            </ul>
            <div className="navbar-actions">
                <button className="icon-btn">
                    <i className="fas fa-search"></i>
                </button>
                <button className="icon-btn">
                    <i className="fas fa-user"></i>
                </button>
                <button className="icon-btn cart-btn">
                    <i className="fas fa-shopping-bag"></i>
                    <span className="cart-count">1</span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
