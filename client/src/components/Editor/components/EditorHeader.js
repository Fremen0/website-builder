import styles from '../Editor.module.css';
import UserMenu from './UserMenu';

/**
 * EditorHeader.js
 * 
 * Provides the top navigation and action bar for the editor workspace.
 * Contains global controls like preview mode toggles, project export actions, 
 * device viewport sizing (desktop/tablet/mobile), undo/redo timeline actions, 
 * and user management dropdowns.
 */
const EditorHeader = ({
    previewMode,
    setPreviewMode,
    openSaveTemplateModal,
    setShowGallery,
    historyLength,
    futureLength,
    undo,
    redo,
    handleExportHTML,
    handleExportJSON,
    clearCanvas,
    viewMode,
    setViewMode,
    showPropertiesPanel,
    setShowPropertiesPanel,
    onNavigateAbout
}) => {
    return (
        <div className={styles['editor-header']}>
            <h3>TWB — Template Website Builder</h3>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                {!previewMode && (
                    <>
                        <button onClick={openSaveTemplateModal} className={`${styles.btn} ${styles['btn-success']}`}>Save as Template</button>
                        <button onClick={() => setShowGallery(true)} className={`${styles.btn} ${styles['btn-primary']}`}><i className="fas fa-layer-group" style={{ marginRight: '6px' }} />Templates</button>
                        <button onClick={undo} disabled={historyLength === 0} className={`${styles.btn} ${styles['btn-warning']}`}>Undo</button>
                        <button onClick={redo} disabled={futureLength === 0} className={`${styles.btn} ${styles['btn-warning']}`}>Redo</button>
                        <button onClick={handleExportHTML} className={`${styles.btn} ${styles['btn-primary']}`}>Export HTML</button>
                        <button onClick={handleExportJSON} className={`${styles.btn} ${styles['btn-secondary']}`}>Export JSON</button>
                        <button onClick={clearCanvas} className={`${styles.btn} ${styles['btn-danger']}`}>Clear All</button>
                    </>
                )}
                <div className={styles['view-mode-toggle']} style={{ marginLeft: '10px' }}>
                    <button onClick={() => setViewMode('desktop')} className={viewMode === 'desktop' ? styles.active : ''} title="Desktop View"><i className="fas fa-desktop"></i></button>
                    <button onClick={() => setViewMode('tablet')} className={viewMode === 'tablet' ? styles.active : ''} title="Tablet View"><i className="fas fa-tablet-alt"></i></button>
                    <button onClick={() => setViewMode('mobile')} className={viewMode === 'mobile' ? styles.active : ''} title="Mobile View"><i className="fas fa-mobile-alt"></i></button>
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                    onClick={() => setPreviewMode(!previewMode)}
                    className={`${styles.btn} ${previewMode ? styles['btn-primary'] : styles['btn-success']}`}
                >
                    {previewMode ? 'Edit Mode' : 'Preview Mode'}
                </button>
                {!previewMode && (
                    <button
                        onClick={() => setShowPropertiesPanel(!showPropertiesPanel)}
                        className={`${styles.btn} ${showPropertiesPanel ? styles['btn-secondary'] : styles['btn-primary']}`}
                        title="Toggle Properties Panel"
                    >
                        <i className="fas fa-sliders-h"></i>
                    </button>
                )}
                {/* About Developer Button */}
                {onNavigateAbout && (
                    <button
                        id="about-dev-btn"
                        onClick={onNavigateAbout}
                        title="About the Developer"
                        style={{
                            display: 'flex', alignItems: 'center', gap: '7px',
                            background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(236,72,153,0.12))',
                            border: '1px solid rgba(99, 102, 241, 0.25)',
                            borderRadius: '12px', padding: '8px 14px', cursor: 'pointer',
                            color: '#6366f1', fontSize: '0.85rem', fontWeight: '600',
                            transition: 'all 0.25s', fontFamily: 'inherit'
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = 'linear-gradient(135deg, #6366f1, #ec4899)';
                            e.currentTarget.style.color = 'white';
                            e.currentTarget.style.borderColor = 'transparent';
                            e.currentTarget.style.transform = 'translateY(-1px)';
                            e.currentTarget.style.boxShadow = '0 6px 16px rgba(99,102,241,0.3)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(236,72,153,0.12))';
                            e.currentTarget.style.color = '#6366f1';
                            e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.25)';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <i className="fas fa-user-circle" />
                        About
                    </button>
                )}
                {/* User info + Logout */}
                <UserMenu />
            </div>
        </div>
    );
};

export default EditorHeader;
