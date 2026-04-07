import React from 'react';
import styles from '../Editor.module.css';

const SaveTemplateModal = ({ tempTemplateName, setTempTemplateName, onSave, onClose }) => (
    <div className={styles['modal-overlay']}>
        <div className={styles['modal-content']}>
            <h3>Save as Template</h3>
            <div className={styles['form-group']}>
                <label className={styles['form-label']}>Template Name</label>
                <input
                    type="text"
                    value={tempTemplateName}
                    onChange={(e) => setTempTemplateName(e.target.value)}
                    placeholder="e.g. My Cool Portfolio"
                    className={styles['form-control']}
                    autoFocus
                />
            </div>
            <div className={`${styles.flex} ${styles['gap-10']} ${styles['mt-20']}`}>
                <button onClick={onSave} className={`${styles.btn} ${styles['btn-primary']} ${styles['w-100']}`}>
                    Save Template
                </button>
                <button onClick={onClose} className={`${styles.btn} ${styles['btn-secondary']} ${styles['w-100']}`}>
                    Cancel
                </button>
            </div>
        </div>
    </div>
);

export default SaveTemplateModal;
