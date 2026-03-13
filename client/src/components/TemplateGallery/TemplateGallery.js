import React, { useState, useCallback } from 'react';
import { TEMPLATES, TEMPLATE_CATEGORIES } from '../../data/templates';
import styles from './TemplateGallery.module.css';

// ─── Shared HTML generator ───────────────────────────────────
const generatePreviewHTML = (template) => {
    const components = template.components || (template.pages && template.pages[0]?.components) || [];
    
    const componentToHTML = (comp) => {
        const styleStr = Object.entries(comp.style || {}).map(([k, v]) =>
            `${k.replace(/[A-Z]/g, m => '-' + m.toLowerCase())}:${v}`
        ).join(';');
        switch (comp.type) {
            case 'heading': return `<h2 style="margin:0;${styleStr}">${comp.content}</h2>`;
            case 'text':    return `<p style="margin:0;${styleStr}">${comp.content}</p>`;
            case 'button':  return `<button style="${styleStr}">${comp.content}</button>`;
            case 'image':   return `<img src="${comp.content}" style="${styleStr}" alt="" />`;
            case 'divider': return `<hr style="border:none;${styleStr}" />`;
            default:        return `<div style="${styleStr}">${comp.content}</div>`;
        }
    };
    const body = components.map(componentToHTML).join('\n');
    return `<!DOCTYPE html><html><head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" rel="stylesheet">
<style>* { box-sizing: border-box; margin: 0; } body { font-family: 'Inter', sans-serif; overflow: hidden; }</style>
</head><body style="position:relative;width:1200px;min-height:800px;">${body}</body></html>`;
};

// ─── Live iframe thumbnail ───────────────────────────────────
const LiveThumbnail = ({ template }) => (
    <div className={styles.liveThumb}>
        <div className={styles.iframeWrap}>
            <iframe
                title={`thumb-${template.id}`}
                srcDoc={generatePreviewHTML(template)}
                className={styles.thumbIframe}
                sandbox="allow-same-origin"
                scrolling="no"
            />
        </div>
        <div className={styles.thumbGlass} />
    </div>
);

// ─── Preview Modal ───────────────────────────────────────────
const PreviewModal = ({ template, onClose, onUse }) => {
    if (!template) return null;
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

// ─── Main Gallery ────────────────────────────────────────────
const TemplateGallery = ({ onSelect, onClose }) => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery]       = useState('');
    const [previewTemplate, setPreviewTemplate] = useState(null);

    const filtered = TEMPLATES.filter(t => {
        const matchCat = activeCategory === 'all' || t.category === activeCategory;
        const q = searchQuery.toLowerCase();
        const matchSearch = !q ||
            t.name.toLowerCase().includes(q) ||
            t.description.toLowerCase().includes(q) ||
            t.tags.some(tag => tag.includes(q));
        return matchCat && matchSearch;
    });

    const handleUse = useCallback((template) => onSelect(template), [onSelect]);

    return (
        <div className={styles.galleryOverlay}>
            <div className={styles.bgBlob1} />
            <div className={styles.bgBlob2} />

            <div className={styles.galleryContainer}>

                {/* ── Header ── */}
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
                            <i className="fas fa-plus" /> Start from Blank
                        </button>
                        <button className={styles.closeBtn} onClick={onClose}>
                            <i className="fas fa-times" />
                        </button>
                    </div>
                </div>

                {/* ── Filter Bar ── */}
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

                {/* ── Template Grid ── */}
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
                                <div key={template.id} className={styles.templateCard}>

                                    {/* Live preview thumbnail */}
                                    <div className={styles.cardThumb}>
                                        <LiveThumbnail template={template} />
                                        {/* Hover overlay */}
                                        <div className={styles.cardOverlay}>
                                            <button
                                                className={styles.previewBtn}
                                                onClick={() => setPreviewTemplate(template)}
                                            >
                                                <i className="fas fa-eye" /> Preview
                                            </button>
                                            <button
                                                className={styles.useBtn}
                                                onClick={() => handleUse(template)}
                                            >
                                                <i className="fas fa-arrow-right" /> Use Template
                                            </button>
                                        </div>
                                    </div>

                                    {/* Card info */}
                                    <div className={styles.cardInfo}>
                                        <div className={styles.cardMeta}>
                                            <span className={`${styles.cardCategory} ${styles['cat_' + template.category]}`}>
                                                {template.category}
                                            </span>
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

                {/* ── Footer ── */}
                <div className={styles.galleryFooter}>
                    <span className={styles.footerCount}>
                        {filtered.length} template{filtered.length !== 1 ? 's' : ''}
                    </span>
                </div>
            </div>

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
