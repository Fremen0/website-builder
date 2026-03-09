import React, { useState, useCallback } from 'react';
import { TEMPLATES, TEMPLATE_CATEGORIES } from '../../data/templates';
import styles from './TemplateGallery.module.css';

// ─── Thumbnail Renderer ─────────────────────────────────────
const TemplateThumbnail = ({ thumbnail }) => {
    const { bg, preview = [] } = thumbnail || {};

    return (
        <div className={styles.thumbnailCanvas} style={{ background: bg || '#1e293b' }}>
            {preview.map((item, i) => {
                if (item.type === 'bar') {
                    return (
                        <div key={i} className={styles.thumbBar} style={{
                            backgroundColor: item.color,
                            width: item.width,
                            height: item.height,
                            top: item.y,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            borderRadius: '3px',
                        }} />
                    );
                }
                if (item.type === 'btn') {
                    return (
                        <div key={i} className={styles.thumbBar} style={{
                            backgroundColor: item.color,
                            width: item.width,
                            height: item.height,
                            top: item.y,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            borderRadius: '6px',
                        }} />
                    );
                }
                if (item.type === 'badge') {
                    return (
                        <div key={i} className={styles.thumbBar} style={{
                            backgroundColor: item.color,
                            width: item.width,
                            height: item.height,
                            top: item.y,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            borderRadius: '20px',
                            opacity: 0.5,
                        }} />
                    );
                }
                if (item.type === 'circle') {
                    return (
                        <div key={i} className={styles.thumbBar} style={{
                            backgroundColor: item.color,
                            width: item.size,
                            height: item.size,
                            top: item.y,
                            left: item.x || '50%',
                            transform: 'translateX(-50%)',
                            borderRadius: '50%',
                        }} />
                    );
                }
                if (item.type === 'rect') {
                    return (
                        <div key={i} className={styles.thumbBar} style={{
                            backgroundColor: item.color,
                            width: item.width,
                            height: item.height,
                            top: item.y,
                            left: item.x || '50%',
                            borderRadius: '6px',
                        }} />
                    );
                }
                return null;
            })}
            {/* Overlay shine effect */}
            <div className={styles.thumbnailShine} />
        </div>
    );
};

// ─── Preview Modal ──────────────────────────────────────────
const PreviewModal = ({ template, onClose, onUse }) => {
    if (!template) return null;

    const generatePreviewHTML = (template) => {
        const componentToHTML = (comp) => {
            const styleStr = Object.entries(comp.style || {}).map(([k, v]) =>
                `${k.replace(/[A-Z]/g, m => '-' + m.toLowerCase())}:${v}`
            ).join(';');

            switch (comp.type) {
                case 'heading':
                    return `<h2 style="margin:0;${styleStr}">${comp.content}</h2>`;
                case 'text':
                    return `<p style="margin:0;${styleStr}">${comp.content}</p>`;
                case 'button':
                    return `<button style="${styleStr}">${comp.content}</button>`;
                case 'image':
                    return `<img src="${comp.content}" style="${styleStr}" alt="" />`;
                case 'divider':
                    return `<hr style="border:none;${styleStr}" />`;
                default:
                    return `<div style="${styleStr}">${comp.content}</div>`;
            }
        };

        const body = template.components.map(componentToHTML).join('\n');
        return `<!DOCTYPE html>
<html><head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=Georgia&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; }
  body { font-family: 'Inter', sans-serif; overflow-x: hidden; }
</style>
</head><body>${body}</body></html>`;
    };

    return (
        <div className={styles.previewOverlay} onClick={onClose}>
            <div className={styles.previewModal} onClick={e => e.stopPropagation()}>
                <div className={styles.previewHeader}>
                    <div className={styles.previewMeta}>
                        <span className={styles.previewCategory}>{template.category}</span>
                        <h2 className={styles.previewTitle}>{template.name}</h2>
                        <p className={styles.previewDesc}>{template.description}</p>
                    </div>
                    <div className={styles.previewActions}>
                        <button className={styles.previewUseBtn} onClick={() => { onUse(template); onClose(); }}>
                            <i className="fas fa-check" /> Use This Template
                        </button>
                        <button className={styles.previewCloseBtn} onClick={onClose}>
                            <i className="fas fa-times" />
                        </button>
                    </div>
                </div>
                <div className={styles.previewFrame}>
                    <iframe
                        title={template.name}
                        srcDoc={generatePreviewHTML(template)}
                        className={styles.previewIframe}
                        sandbox="allow-same-origin"
                    />
                </div>
            </div>
        </div>
    );
};

// ─── Main Template Gallery ──────────────────────────────────
const TemplateGallery = ({ onSelect, onClose }) => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [previewTemplate, setPreviewTemplate] = useState(null);
    const [hoveredId, setHoveredId] = useState(null);

    const filtered = TEMPLATES.filter(t => {
        const matchCat = activeCategory === 'all' || t.category === activeCategory;
        const q = searchQuery.toLowerCase();
        const matchSearch = !q || t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || t.tags.some(tag => tag.includes(q));
        return matchCat && matchSearch;
    });

    const handleUse = useCallback((template) => {
        onSelect(template);
    }, [onSelect]);

    return (
        <div className={styles.galleryOverlay}>
            {/* Background decorative blobs */}
            <div className={styles.bgBlob1} />
            <div className={styles.bgBlob2} />

            <div className={styles.galleryContainer}>
                {/* ─── Header ─── */}
                <div className={styles.galleryHeader}>
                    <div className={styles.headerLeft}>
                        <div className={styles.logoMark}>
                            <i className="fas fa-layer-group" />
                        </div>
                        <div>
                            <h1 className={styles.galleryTitle}>Choose a Template</h1>
                            <p className={styles.gallerySubtitle}>Start with a professionally designed template and make it yours</p>
                        </div>
                    </div>
                    <div className={styles.headerRight}>
                        <button className={styles.blankBtn} onClick={() => onSelect(null)}>
                            <i className="fas fa-plus" />
                            Start from Blank
                        </button>
                        <button className={styles.closeBtn} onClick={onClose} title="Close">
                            <i className="fas fa-times" />
                        </button>
                    </div>
                </div>

                {/* ─── Search & Filter Bar ─── */}
                <div className={styles.filterBar}>
                    <div className={styles.searchWrapper}>
                        <i className={`fas fa-search ${styles.searchIcon}`} />
                        <input
                            className={styles.searchInput}
                            type="text"
                            placeholder="Search templates..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button className={styles.searchClear} onClick={() => setSearchQuery('')}>
                                <i className="fas fa-times" />
                            </button>
                        )}
                    </div>
                    <div className={styles.categoryTabs}>
                        {TEMPLATE_CATEGORIES.map(cat => (
                            <button
                                key={cat.id}
                                className={`${styles.categoryTab} ${activeCategory === cat.id ? styles.activeTab : ''}`}
                                onClick={() => setActiveCategory(cat.id)}
                            >
                                <i className={cat.icon} />
                                <span>{cat.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* ─── Template Grid ─── */}
                <div className={styles.galleryBody}>
                    {filtered.length === 0 ? (
                        <div className={styles.emptyState}>
                            <i className="fas fa-search" />
                            <p>No templates match your search</p>
                            <button onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}>
                                Clear filters
                            </button>
                        </div>
                    ) : (
                        <div className={styles.templateGrid}>
                            {filtered.map(template => (
                                <div
                                    key={template.id}
                                    className={`${styles.templateCard} ${hoveredId === template.id ? styles.cardHovered : ''}`}
                                    onMouseEnter={() => setHoveredId(template.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                >
                                    {/* Thumbnail */}
                                    <div className={styles.cardThumb}>
                                        <TemplateThumbnail thumbnail={template.thumbnail} />
                                        {/* Hover overlay */}
                                        <div className={styles.cardOverlay}>
                                            <button
                                                className={styles.previewBtn}
                                                onClick={() => setPreviewTemplate(template)}
                                            >
                                                <i className="fas fa-eye" />
                                                Preview
                                            </button>
                                            <button
                                                className={styles.useBtn}
                                                onClick={() => handleUse(template)}
                                            >
                                                <i className="fas fa-arrow-right" />
                                                Use Template
                                            </button>
                                        </div>
                                    </div>

                                    {/* Card Info */}
                                    <div className={styles.cardInfo}>
                                        <div className={styles.cardMeta}>
                                            <span className={styles.cardCategory}>{template.category}</span>
                                        </div>
                                        <h3 className={styles.cardName}>{template.name}</h3>
                                        <p className={styles.cardDesc}>{template.description}</p>
                                        <div className={styles.cardTags}>
                                            {template.tags.slice(0, 3).map(tag => (
                                                <span key={tag} className={styles.cardTag}>{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* ─── Footer ─── */}
                <div className={styles.galleryFooter}>
                    <span className={styles.footerCount}>
                        {filtered.length} template{filtered.length !== 1 ? 's' : ''}
                    </span>
                </div>
            </div>

            {/* ─── Preview Modal ─── */}
            {previewTemplate && (
                <PreviewModal
                    template={previewTemplate}
                    onClose={() => setPreviewTemplate(null)}
                    onUse={handleUse}
                />
            )}
        </div>
    );
};

export default TemplateGallery;
