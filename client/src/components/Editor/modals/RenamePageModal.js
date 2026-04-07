import React from 'react';
import styles from '../Editor.module.css';

const RenamePageModal = ({ editPageName, setEditPageName, onRename, onClose }) => (
    <div className={styles['modal-overlay']} onClick={onClose}>
        <div className={styles['modal-content']} onClick={e => e.stopPropagation()}>
            <h3 style={{ marginBottom: '16px', fontSize: '1rem', color: 'var(--text-main)' }}>
                <i className="fas fa-pencil-alt" style={{ marginRight: '8px', color: '#6366f1' }} />
                Rename Page
            </h3>
            <div className={styles['form-group']}>
                <label className={styles['form-label']}>New Page Name</label>
                <input
                    type="text"
                    value={editPageName}
                    onChange={(e) => setEditPageName(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') onRename();
                        if (e.key === 'Escape') onClose();
                    }}
                    className={styles['form-control']}
                    autoFocus
                />
            </div>
            <div className={`${styles.flex} ${styles['gap-10']} ${styles['mt-20']}`}>
                <button
                    onClick={onRename}
                    disabled={!editPageName.trim()}
                    className={`${styles.btn} ${styles['btn-primary']} ${styles['w-100']}`}
                    style={{ opacity: editPageName.trim() ? 1 : 0.5 }}
                >
                    <i className="fas fa-check" style={{ marginRight: '6px' }} />
                    Save Name
                </button>
                <button onClick={onClose} className={`${styles.btn} ${styles['btn-secondary']} ${styles['w-100']}`}>
                    Cancel
                </button>
            </div>
        </div>
    </div>
);

export default RenamePageModal;
