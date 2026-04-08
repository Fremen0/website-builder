import styles from '../Editor.module.css';
import SidebarItem from '../SidebarItem';
import { PREBUILT_SECTIONS } from '../../../data/templates';

/**
 * Sidebar.js
 * 
 * Provides the left-hand navigation panel of the editor.
 * Houses tools for dragging and dropping new elements, selecting pre-built sections,
 * managing the multi-page structure, and navigating the DOM-like tree of the active page.
 */
const Sidebar = ({
    openToolCategories,
    toggleToolCategory,
    addSectionToCanvas,
    pages,
    activePageId,
    switchPage,
    setNewPageName,
    setShowAddPageModal,
    setEditingPage,
    setEditPageName,
    setDeletingPage,
    components,
    selectedId,
    setSelectedId,
    reorderComponent,
    deleteComponent
}) => {
    return (
        <div className={styles.sidebar}>
            <div className={styles['prop-category']} style={{ background: 'transparent', border: 'none', boxShadow: 'none', marginBottom: '4px' }}>
                <div className={`${styles['prop-header']} ${openToolCategories.layout ? styles.open : ''}`} onClick={() => toggleToolCategory('layout')} style={{ paddingLeft: 0, paddingRight: 0 }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}><i className="fas fa-layer-group" style={{ marginRight: '6px' }}></i> Layout</span>
                    <i className="fas fa-chevron-down"></i>
                </div>
                {openToolCategories.layout && (
                    <div className={styles['sidebar-tools-grid']} style={{ paddingTop: '10px' }}>
                        <SidebarItem type="section" label="Section" icon="fas fa-layer-group" />
                        <SidebarItem type="div" label="Div Block" icon="fas fa-box" />
                        <SidebarItem type="grid" label="Grid Layout" icon="fas fa-th" />
                        <SidebarItem type="navbar" label="Navigation Bar" icon="fas fa-bars" />
                        <SidebarItem type="form" label="Form Block" icon="fas fa-list-alt" />
                    </div>
                )}
            </div>

            <div className={styles['prop-category']} style={{ background: 'transparent', border: 'none', boxShadow: 'none', marginBottom: '4px' }}>
                <div className={`${styles['prop-header']} ${openToolCategories.basic ? styles.open : ''}`} onClick={() => toggleToolCategory('basic')} style={{ paddingLeft: 0, paddingRight: 0 }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}><i className="fas fa-font" style={{ marginRight: '6px' }}></i> Basic Elements</span>
                    <i className="fas fa-chevron-down"></i>
                </div>
                {openToolCategories.basic && (
                    <div className={styles['sidebar-tools-grid']} style={{ paddingTop: '10px' }}>
                        <SidebarItem type="text" label="Text" icon="fas fa-paragraph" />
                        <SidebarItem type="heading" label="Heading" icon="fas fa-heading" />
                        <SidebarItem type="button" label="Button" icon="fas fa-square" />
                        <SidebarItem type="image" label="Image" icon="fas fa-image" />
                        <SidebarItem type="divider" label="Divider" icon="fas fa-minus" />
                        <SidebarItem type="input" label="Input" icon="fas fa-i-cursor" />
                    </div>
                )}
            </div>

            <div className={styles['prop-category']} style={{ background: 'transparent', border: 'none', boxShadow: 'none', marginBottom: '4px' }}>
                <div className={`${styles['prop-header']} ${openToolCategories.media ? styles.open : ''}`} onClick={() => toggleToolCategory('media')} style={{ paddingLeft: 0, paddingRight: 0 }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}><i className="fas fa-photo-video" style={{ marginRight: '6px' }}></i> Media & Interactive</span>
                    <i className="fas fa-chevron-down"></i>
                </div>
                {openToolCategories.media && (
                    <div className={styles['sidebar-tools-grid']} style={{ paddingTop: '10px' }}>
                        <SidebarItem type="video" label="Video" icon="fas fa-video" />
                        <SidebarItem type="audio" label="Audio File" icon="fas fa-music" />
                        <SidebarItem type="iframe" label="Embed Code" icon="fas fa-code" />
                        <SidebarItem type="slider" label="Image Slider" icon="fas fa-images" />
                        <SidebarItem type="map" label="Google Maps" icon="fas fa-map-marker-alt" />
                        <SidebarItem type="icon" label="Icon" icon="fas fa-star" />
                    </div>
                )}
            </div>

            <div className={styles['prop-category']} style={{ background: 'transparent', border: 'none', boxShadow: 'none', marginBottom: '4px' }}>
                <div className={`${styles['prop-header']} ${openToolCategories.sections ? styles.open : ''}`} onClick={() => toggleToolCategory('sections')} style={{ paddingLeft: 0, paddingRight: 0 }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}><i className="fas fa-puzzle-piece" style={{ marginRight: '6px' }}></i> Prebuilt Sections</span>
                    <i className="fas fa-chevron-down"></i>
                </div>
                {openToolCategories.sections && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px', paddingTop: '10px' }}>
                        {PREBUILT_SECTIONS.map(section => (
                            <div
                                key={section.id}
                                className={styles['sidebar-item']}
                                onClick={() => addSectionToCanvas(section)}
                                style={{ justifyContent: 'flex-start' }}
                            >
                                <i className={`${section.icon}`} style={{ marginRight: '10px', width: '16px' }}></i>
                                <span>{section.name}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className={styles['prop-category']} style={{ background: 'transparent', border: 'none', boxShadow: 'none', marginBottom: '4px' }}>
                <div className={`${styles['prop-header']} ${openToolCategories.pages ? styles.open : ''}`} onClick={() => toggleToolCategory('pages')} style={{ paddingLeft: 0, paddingRight: 0 }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}><i className="fas fa-file-alt" style={{ marginRight: '6px' }}></i> Pages</span>
                    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button
                            onClick={(e) => { e.stopPropagation(); setNewPageName(''); setShowAddPageModal(true); }}
                            title="Add Page"
                            style={{ fontSize: '11px', padding: '3px 7px', background: 'rgba(16, 185, 129, 0.12)', color: '#10b981', borderRadius: '4px', cursor: 'pointer', border: 'none', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '3px' }}
                        >
                            <i className="fas fa-plus" />
                        </button>
                        <i className="fas fa-chevron-down"></i>
                    </div>
                </div>
                {openToolCategories.pages && (
                    <div className={styles['pages-list']} style={{ paddingTop: '10px' }}>
                        {pages.map(page => (
                            <div
                                key={page.id}
                                onClick={() => switchPage(page.id)}
                                className={`${styles['page-item']} ${activePageId === page.id ? styles.active : ''}`}
                            >
                                <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{page.name}</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                                    {/* Edit button */}
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setEditingPage(page); setEditPageName(page.name); }}
                                        title="Rename Page"
                                        style={{ background: 'rgba(99,102,241,0.12)', border: 'none', color: '#6366f1', borderRadius: '4px', width: '22px', height: '22px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}
                                    >
                                        <i className="fas fa-pencil-alt" />
                                    </button>
                                    {/* Delete button — hidden for last page */}
                                    {pages.length > 1 && (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setDeletingPage(page); }}
                                            title="Delete Page"
                                            style={{ background: 'rgba(239,68,68,0.1)', border: 'none', color: '#ef4444', borderRadius: '4px', width: '22px', height: '22px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}
                                        >
                                            <i className="fas fa-trash-alt" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className={styles['prop-category']} style={{ background: 'transparent', border: 'none', boxShadow: 'none', marginBottom: '4px' }}>
                <div className={`${styles['prop-header']} ${openToolCategories.navigator ? styles.open : ''}`} onClick={() => toggleToolCategory('navigator')} style={{ paddingLeft: 0, paddingRight: 0 }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}><i className="fas fa-sitemap" style={{ marginRight: '6px' }}></i> Navigator</span>
                    <i className="fas fa-chevron-down"></i>
                </div>
                {openToolCategories.navigator && (
                    <div className={styles['pages-list']} style={{ paddingTop: '10px' }}>
                        {components.length === 0 ? (
                            <div style={{ padding: '10px', fontSize: '0.8rem', color: '#94a3b8', fontStyle: 'italic' }}>No elements yet</div>
                        ) : (
                            components.slice().reverse().map(comp => (
                                <div
                                    key={comp.id}
                                    onClick={() => setSelectedId(comp.id)}
                                    className={`${styles['page-item']} ${selectedId === comp.id ? styles.active : ''}`}
                                    style={{ fontSize: '0.85rem' }}
                                >
                                    <i className={
                                        comp.type === 'heading' ? 'fas fa-heading' :
                                            comp.type === 'image' ? 'fas fa-image' :
                                                comp.type === 'video' ? 'fas fa-video' :
                                                    comp.type === 'button' ? 'fas fa-square' :
                                                        comp.type === 'input' ? 'fas fa-i-cursor' :
                                                            comp.type === 'section' ? 'fas fa-layer-group' :
                                                                comp.type === 'div' ? 'fas fa-box' :
                                                                    comp.type === 'divider' ? 'fas fa-minus' : 'fas fa-font'
                                    } style={{ marginRight: '8px', width: '15px', color: 'var(--primary-color)', opacity: 0.8 }}></i>
                                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1, marginRight: '8px' }}>
                                        {comp.content || comp.type}
                                    </span>

                                    {/* Position Mode Indicator */}
                                    <div style={{ marginRight: '8px', opacity: 0.6 }}>
                                        {comp.style?.position === 'absolute' ? (
                                            <i className="fas fa-thumbtack" style={{ fontSize: '10px', color: '#818cf8' }} title="Pinned (Absolute)"></i>
                                        ) : (
                                            <i className="fas fa-stream" style={{ fontSize: '10px', color: '#10b981' }} title="Flow (Relative)"></i>
                                        )}
                                    </div>

                                    <div style={{ display: 'flex', gap: '4px', opacity: selectedId === comp.id ? 1 : 0.4 }}>
                                        <i className="fas fa-chevron-up" onClick={(e) => { e.stopPropagation(); reorderComponent(comp.id, 'up'); }} style={{ fontSize: '10px', cursor: 'pointer' }} title="Bring Forward"></i>
                                        <i className="fas fa-chevron-down" onClick={(e) => { e.stopPropagation(); reorderComponent(comp.id, 'down'); }} style={{ fontSize: '10px', cursor: 'pointer' }} title="Send Backward"></i>
                                        <i className="fas fa-trash" onClick={(e) => { e.stopPropagation(); deleteComponent(comp.id); }} style={{ fontSize: '10px', cursor: 'pointer', color: '#ef4444' }}></i>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
