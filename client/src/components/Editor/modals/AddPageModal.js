import React from 'react';
import styles from '../Editor.module.css';

const AddPageModal = ({ newPageName, setNewPageName, onAdd, onClose }) => (
    <div className={styles['modal-overlay']} onClick={onClose}>
        <div className={styles['modal-content']} onClick={e => e.stopPropagation()}>
            <h3 style={{ marginBottom: '16px', fontSize: '1rem', color: 'var(--text-main)' }}>
                <i className="fas fa-file-alt" style={{ marginRight: '8px', color: '#10b981' }} />
                Add New Page
            </h3>
            <div className={styles['form-group']}>
                <label className={styles['form-label']}>Page Name</label>
                <input
                    type="text"
                    value={newPageName}
                    onChange={(e) => setNewPageName(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') onAdd();
                        if (e.key === 'Escape') onClose();
                    }}
                    placeholder="e.g. About, Contact, Portfolio"
                    className={styles['form-control']}
                    autoFocus
                />
            </div>
            <div className={`${styles.flex} ${styles['gap-10']} ${styles['mt-20']}`}>
                <button
                    onClick={onAdd}
                    disabled={!newPageName.trim()}
                    className={`${styles.btn} ${styles['btn-primary']} ${styles['w-100']}`}
                    style={{
                        background: !newPageName.trim() ? undefined : 'linear-gradient(135deg, #10b981, #059669)',
                        opacity: newPageName.trim() ? 1 : 0.5,
                    }}
                >
                    <i className="fas fa-plus" style={{ marginRight: '6px' }} />
                    Create Page
                </button>
                <button onClick={onClose} className={`${styles.btn} ${styles['btn-secondary']} ${styles['w-100']}`}>
                    Cancel
                </button>
            </div>
        </div>
    </div>
);

export default AddPageModal;
