import React from 'react';
import styles from '../Editor.module.css';

const DeletePageModal = ({ page, onConfirm, onClose }) => (
    <div className={styles['modal-overlay']} onClick={onClose}>
        <div className={styles['modal-content']} onClick={e => e.stopPropagation()} style={{ maxWidth: '380px' }}>
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                <div style={{
                    width: '48px', height: '48px', background: 'rgba(239,68,68,0.1)',
                    borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 12px', fontSize: '20px', color: '#ef4444'
                }}>
                    <i className="fas fa-trash-alt" />
                </div>
                <h3 style={{ fontSize: '1rem', color: 'var(--text-main)', marginBottom: '6px' }}>Delete Page</h3>
                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
                    Are you sure you want to delete <strong>"{page.name}"</strong>? This cannot be undone.
                </p>
            </div>
            <div className={`${styles.flex} ${styles['gap-10']} ${styles['mt-20']}`}>
                <button
                    onClick={() => onConfirm(page.id)}
                    className={`${styles.btn} ${styles['w-100']}`}
                    style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)', color: 'white', border: 'none' }}
                >
                    <i className="fas fa-trash-alt" style={{ marginRight: '6px' }} />
                    Delete
                </button>
                <button onClick={onClose} className={`${styles.btn} ${styles['btn-secondary']} ${styles['w-100']}`}>
                    Cancel
                </button>
            </div>
        </div>
    </div>
);

export default DeletePageModal;
