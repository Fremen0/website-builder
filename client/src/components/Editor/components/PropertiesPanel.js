import React from 'react';
import styles from '../Editor.module.css';
import FONT_FAMILIES from '../../../constants/fontFamilies';

/**
 * PropertiesPanel.js
 * 
 * Renders the right-hand Inspector tab. 
 * This acts as a central UI bound to the currently selected component.
 * It maps form inputs (fonts, colors, sizes, flexbox) back to the parent `Editor.js` state.
 * If no component is selected, it falls back to rendering global Page-level settings (Backgrounds).
 */
const PropertiesPanel = ({
    // component
    selectedComponent,
    onStyleChange,
    onStylesChange,
    onContentChange,
    onLinkChange,
    onDelete,
    onDuplicate,
    onAlign,
    onReorder,
    activeState,
    setActiveState,
    openCategories,
    toggleCategory,
    viewMode,
    // page (shown when nothing is selected)
    activePage,
    backgroundImage,
    setBackgroundImage,
    backgroundSize,
    setBackgroundSize,
    backgroundPosition,
    setBackgroundPosition,
    backgroundRepeat,
    setBackgroundRepeat,
    updatePageStyle,
    handlePageBackgroundUpload,
}) => {
    const s = selectedComponent; // shorthand

    return (
        <div className={styles['properties-panel']}>
            <h3>Properties</h3>

            {s ? (
                <div style={{ marginTop: '20px' }}>

                    {/* ── Video URL ────────────────────────────────────────── */}
                    {s.type === 'video' && (
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Video URL (Embed)</label>
                            <input type="text" value={s.content} onChange={(e) => onContentChange(s.id, e.target.value)}
                                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                        </div>
                    )}

                    {/* ── State Selector ───────────────────────────────────── */}
                    {/* 
                      * This toggle intercepts property updates. If 'hover' or 'active' is active,
                      * any subsequent style changes (e.g., color) will be strictly mapped to the 
                      * CSS pseudo-class object in the component's data model, rather than its base style.
                      */}
                    <div className={styles['form-group']} style={{ marginBottom: '24px' }}>
                        <label className={styles['form-label']}>EDITING STATE</label>
                        <div className={styles['view-mode-toggle']}>
                            <button onClick={() => setActiveState('normal')} className={activeState === 'normal' ? styles.active : ''}>Normal</button>
                            <button onClick={() => setActiveState('hover')}  className={activeState === 'hover'  ? styles.active : ''}>Hover</button>
                            <button onClick={() => setActiveState('active')} className={activeState === 'active' ? styles.active : ''}>Active</button>
                        </div>
                        {activeState !== 'normal' && (
                            <div style={{ fontSize: '0.75rem', color: '#818cf8', marginTop: '8px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <i className="fas fa-info-circle" /> Mode: {activeState.toUpperCase()}
                            </div>
                        )}
                    </div>

                    <h3>Inspector</h3>

                    {/* ── CONTENT ─────────────────────────────────────────── */}
                    <div className={styles['prop-category']}>
                        <div className={`${styles['prop-header']} ${openCategories.content ? styles.open : ''}`} onClick={() => toggleCategory('content')}>
                            <span><i className="fas fa-edit" /> CONTENT</span>
                            <i className="fas fa-chevron-down" />
                        </div>
                        {openCategories.content && (
                            <div className={styles['prop-content']}>
                                <div className={styles['form-group']}>
                                    <label className={styles['form-label']}>{s.type === 'input' ? 'Placeholder Text' : 'Content'}</label>
                                    <input type="text" value={s.content} onChange={(e) => onContentChange(s.id, e.target.value)} className={styles['form-control']} />
                                </div>
                                {['text', 'heading', 'button', 'image'].includes(s.type) && (
                                    <div className={styles['form-group']}>
                                        <label className={styles['form-label']}>Link URL</label>
                                        <input type="text" value={s.link || ''} onChange={(e) => onLinkChange(s.id, e.target.value)}
                                            placeholder="https://" className={styles['form-control']} />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* ── TYPOGRAPHY ──────────────────────────────────────── */}
                    <div className={styles['prop-category']}>
                        <div className={`${styles['prop-header']} ${openCategories.typography ? styles.open : ''}`} onClick={() => toggleCategory('typography')}>
                            <span><i className="fas fa-font" /> TYPOGRAPHY</span>
                            <i className="fas fa-chevron-down" />
                        </div>
                        {openCategories.typography && (
                            <div className={styles['prop-content']}>
                                <div className={styles['form-group']}>
                                    <label className={styles['form-label']}>Font Family</label>
                                    <select value={s.style?.fontFamily || 'Arial, sans-serif'} onChange={(e) => onStyleChange(s.id, 'fontFamily', e.target.value)} className={styles['form-control']}>
                                        {FONT_FAMILIES.map(font => (
                                            <option key={font} value={font}>{font.split(',')[0].replace(/'/g, '')}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className={styles.flex} style={{ gap: '10px' }}>
                                    <div className={styles['form-group']} style={{ flex: 1 }}>
                                        <label className={styles['form-label']}>Size</label>
                                        <input type="number" value={parseInt(s.style?.fontSize) || 16} onChange={(e) => onStyleChange(s.id, 'fontSize', `${e.target.value}px`)} className={styles['form-control']} />
                                    </div>
                                    <div className={styles['form-group']} style={{ flex: 1 }}>
                                        <label className={styles['form-label']}>Weight</label>
                                        <select value={s.style?.fontWeight || '400'} onChange={(e) => onStyleChange(s.id, 'fontWeight', e.target.value)} className={styles['form-control']}>
                                            <option value="300">Light</option>
                                            <option value="400">Normal</option>
                                            <option value="600">Semi</option>
                                            <option value="700">Bold</option>
                                            <option value="900">Black</option>
                                        </select>
                                    </div>
                                </div>
                                <div className={styles.flex} style={{ gap: '10px' }}>
                                    <div className={styles['form-group']} style={{ flex: 1 }}>
                                        <label className={styles['form-label']}>Line H</label>
                                        <input type="number" step="0.1" value={parseFloat(s.style?.lineHeight) || 1.5} onChange={(e) => onStyleChange(s.id, 'lineHeight', e.target.value)} className={styles['form-control']} />
                                    </div>
                                    <div className={styles['form-group']} style={{ flex: 1 }}>
                                        <label className={styles['form-label']}>Spacing</label>
                                        <input type="number" step="1" value={parseInt(s.style?.letterSpacing) || 0} onChange={(e) => onStyleChange(s.id, 'letterSpacing', `${e.target.value}px`)} className={styles['form-control']} />
                                    </div>
                                </div>
                                <div className={styles['form-group']}>
                                    <label className={styles['form-label']}>Transform</label>
                                    <div className={styles['button-group']}>
                                        <button onClick={() => onStyleChange(s.id, 'textTransform', 'none')}      className={!s.style?.textTransform || s.style.textTransform === 'none'      ? styles.active : ''}>None</button>
                                        <button onClick={() => onStyleChange(s.id, 'textTransform', 'uppercase')} className={s.style?.textTransform === 'uppercase'  ? styles.active : ''}>ABC</button>
                                        <button onClick={() => onStyleChange(s.id, 'textTransform', 'capitalize')}className={s.style?.textTransform === 'capitalize' ? styles.active : ''}>Abc</button>
                                        <button onClick={() => onStyleChange(s.id, 'textTransform', 'lowercase')} className={s.style?.textTransform === 'lowercase'  ? styles.active : ''}>abc</button>
                                    </div>
                                </div>
                                <div className={styles['form-group']}>
                                    <label className={styles['form-label']}>Text Color</label>
                                    <input type="color" value={s.style?.color || '#000000'} onChange={(e) => onStyleChange(s.id, 'color', e.target.value)} className={styles['form-control']} style={{ height: '40px' }} />
                                </div>
                                <div className={styles['button-group']} style={{ marginTop: '10px' }}>
                                    <button onClick={() => onStyleChange(s.id, 'textAlign', 'left')}   className={s.style?.textAlign === 'left'   ? styles.active : ''}><i className="fas fa-align-left" /></button>
                                    <button onClick={() => onStyleChange(s.id, 'textAlign', 'center')} className={s.style?.textAlign === 'center' ? styles.active : ''}><i className="fas fa-align-center" /></button>
                                    <button onClick={() => onStyleChange(s.id, 'textAlign', 'right')}  className={s.style?.textAlign === 'right'  ? styles.active : ''}><i className="fas fa-align-right" /></button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ── SIZE & DIMENSIONS ───────────────────────────────── */}
                    <div className={styles['prop-category']}>
                        <div className={`${styles['prop-header']} ${openCategories.size ? styles.open : ''}`} onClick={() => toggleCategory('size')}>
                            <span><i className="fas fa-expand-arrows-alt" /> SIZE &amp; DIMENSIONS</span>
                            <i className="fas fa-chevron-down" />
                        </div>
                        {openCategories.size && (
                            <div className={styles['prop-content']}>
                                <div className={styles.flex} style={{ gap: '10px' }}>
                                    <div className={styles['form-group']} style={{ flex: 1 }}>
                                        <label className={styles['form-label']}>Width</label>
                                        <input type="text" value={s.style?.width || 'auto'} onChange={(e) => onStyleChange(s.id, 'width', e.target.value)} className={styles['form-control']} />
                                    </div>
                                    <div className={styles['form-group']} style={{ flex: 1 }}>
                                        <label className={styles['form-label']}>Height</label>
                                        <input type="text" value={s.style?.height || 'auto'} onChange={(e) => onStyleChange(s.id, 'height', e.target.value)} className={styles['form-control']} />
                                    </div>
                                </div>
                                <div className={styles.flex} style={{ gap: '10px' }}>
                                    <div className={styles['form-group']} style={{ flex: 1 }}>
                                        <label className={styles['form-label']}>Min W</label>
                                        <input type="text" placeholder="auto" value={s.style?.minWidth || ''} onChange={(e) => onStyleChange(s.id, 'minWidth', e.target.value)} className={styles['form-control']} />
                                    </div>
                                    <div className={styles['form-group']} style={{ flex: 1 }}>
                                        <label className={styles['form-label']}>Max W</label>
                                        <input type="text" placeholder="none" value={s.style?.maxWidth || ''} onChange={(e) => onStyleChange(s.id, 'maxWidth', e.target.value)} className={styles['form-control']} />
                                    </div>
                                </div>
                                <div className={styles['form-group']}>
                                    <label className={styles['form-label']}>Overflow</label>
                                    <select value={s.style?.overflow || 'visible'} onChange={(e) => onStyleChange(s.id, 'overflow', e.target.value)} className={styles['form-control']}>
                                        <option value="visible">Visible</option>
                                        <option value="hidden">Hidden</option>
                                        <option value="scroll">Scroll</option>
                                        <option value="auto">Auto</option>
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ── LAYOUT & SPACING ────────────────────────────────── */}
                    <div className={styles['prop-category']}>
                        <div className={`${styles['prop-header']} ${openCategories.layout ? styles.open : ''}`} onClick={() => toggleCategory('layout')}>
                            <span><i className="fas fa-th-large" /> LAYOUT &amp; SPACING</span>
                            <i className="fas fa-chevron-down" />
                        </div>
                        {openCategories.layout && (
                            <div className={styles['prop-content']}>
                                {/* Spacing visualizer */}
                                <div className={styles['spacing-visualizer']}>
                                    <div className={styles['spacing-container']}>
                                        <span className={styles['spacing-label']} style={{ top: '6px' }}>Margin</span>
                                        {[
                                            { prop: 'marginTop',    style: { top: '4px',    left: '50%', transform: 'translateX(-50%)' },     title: 'Margin Top'    },
                                            { prop: 'marginBottom', style: { bottom: '4px', left: '50%', transform: 'translateX(-50%)' },     title: 'Margin Bottom' },
                                            { prop: 'marginLeft',   style: { left: '4px',   top: '50%',  transform: 'translateY(-50%)' },      title: 'Margin Left'   },
                                            { prop: 'marginRight',  style: { right: '4px',  top: '50%',  transform: 'translateY(-50%)' },      title: 'Margin Right'  },
                                        ].map(({ prop, style, title }) => (
                                            <input key={prop} type="number" title={title}
                                                className={`${styles['spacing-input-mini']} ${styles.margin}`}
                                                style={style}
                                                value={parseInt(s.style?.[prop]) || 0}
                                                onChange={(e) => onStyleChange(s.id, prop, `${e.target.value}px`)}
                                            />
                                        ))}
                                        <div className={styles['spacing-inner-box']}>
                                            <span className={styles['spacing-label']} style={{ top: '2px', fontSize: '8px' }}>Padding</span>
                                            {[
                                                { prop: 'paddingTop',    style: { top: '2px',    left: '50%', transform: 'translateX(-50%) scale(0.8)' }  },
                                                { prop: 'paddingBottom', style: { bottom: '2px', left: '50%', transform: 'translateX(-50%) scale(0.8)' }  },
                                                { prop: 'paddingLeft',   style: { left: '2px',   top: '50%',  transform: 'translateY(-50%) scale(0.8)' }  },
                                                { prop: 'paddingRight',  style: { right: '2px',  top: '50%',  transform: 'translateY(-50%) scale(0.8)' }  },
                                            ].map(({ prop, style }) => (
                                                <input key={prop} type="number"
                                                    className={`${styles['spacing-input-mini']} ${styles.padding}`}
                                                    style={style}
                                                    value={parseInt(s.style?.[prop]) || 0}
                                                    onChange={(e) => onStyleChange(s.id, prop, `${e.target.value}px`)}
                                                />
                                            ))}
                                            <div className={styles['spacing-center-icon']}><i className="fas fa-expand" /></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Position mode */}
                                <div className={styles['form-group']}>
                                    <label className={styles['form-label']}>Position Mode</label>
                                    <div className={styles['button-group']}>
                                        <button onClick={() => onStyleChange(s.id, 'position', 'absolute')} className={s.style?.position === 'absolute' ? styles.active : ''}>Absolute</button>
                                        <button onClick={() => onStyleChange(s.id, 'position', 'relative')} className={s.style?.position === 'relative' ? styles.active : ''}>Relative</button>
                                    </div>
                                    <p style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '5px' }}>
                                        {s.style?.position === 'absolute' ? 'Free dragging enabled (Wix Style)' : 'Auto-stacking enabled (Webflow Style)'}
                                    </p>
                                    {s.style?.position === 'absolute' && (
                                        <div className={styles.flex} style={{ gap: '10px', marginTop: '12px' }}>
                                            <div className={styles['form-group']} style={{ flex: 1, marginBottom: 0 }}>
                                                <label className={styles['form-label']} style={{ fontSize: '10px' }}>X (Left)</label>
                                                <input type="number" value={parseInt(s.style?.left) || 0} onChange={(e) => onStyleChange(s.id, 'left', `${e.target.value}px`)} className={styles['form-control']} />
                                            </div>
                                            <div className={styles['form-group']} style={{ flex: 1, marginBottom: 0 }}>
                                                <label className={styles['form-label']} style={{ fontSize: '10px' }}>Y (Top)</label>
                                                <input type="number" value={parseInt(s.style?.top) || 0} onChange={(e) => onStyleChange(s.id, 'top', `${e.target.value}px`)} className={styles['form-control']} />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Quick Align */}
                                <label className={styles['form-label']}>Quick Align</label>
                                <div className={`${styles.flex} ${styles['justify-between']} ${styles['mb-5']}`} style={{ gap: '4px' }}>
                                    <button onClick={() => onAlign('left')}   className={`${styles.btn} ${styles['btn-secondary']} ${styles['btn-sm']}`} style={{ flex: 1 }} title="Left"><i className="fas fa-arrow-left" /></button>
                                    <button onClick={() => onAlign('center')} className={`${styles.btn} ${styles['btn-secondary']} ${styles['btn-sm']}`} style={{ flex: 1 }} title="Center"><i className="fas fa-arrows-alt-h" /></button>
                                    <button onClick={() => onAlign('right')}  className={`${styles.btn} ${styles['btn-secondary']} ${styles['btn-sm']}`} style={{ flex: 1 }} title="Right"><i className="fas fa-arrow-right" /></button>
                                </div>
                                <div className={`${styles.flex} ${styles['justify-between']}`} style={{ gap: '4px' }}>
                                    <button onClick={() => onAlign('top')}    className={`${styles.btn} ${styles['btn-secondary']} ${styles['btn-sm']}`} style={{ flex: 1 }} title="Top"><i className="fas fa-arrow-up" /></button>
                                    <button onClick={() => onAlign('middle')} className={`${styles.btn} ${styles['btn-secondary']} ${styles['btn-sm']}`} style={{ flex: 1 }} title="Middle"><i className="fas fa-arrows-alt-v" /></button>
                                    <button onClick={() => onAlign('bottom')} className={`${styles.btn} ${styles['btn-secondary']} ${styles['btn-sm']}`} style={{ flex: 1 }} title="Bottom"><i className="fas fa-arrow-down" /></button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ── FLEXBOX ─────────────────────────────────────────── */}
                    <div className={styles['prop-category']}>
                        <div className={`${styles['prop-header']} ${openCategories.flexbox ? styles.open : ''}`} onClick={() => toggleCategory('flexbox')}>
                            <span><i className="fas fa-layer-group" /> FLEXBOX</span>
                            <i className="fas fa-chevron-down" />
                        </div>
                        {openCategories.flexbox && (
                            <div className={styles['prop-content']}>
                                <div className={styles['form-group']}>
                                    <label className={styles['form-label']}>Display</label>
                                    <select value={s.style?.display || 'block'} onChange={(e) => onStyleChange(s.id, 'display', e.target.value)} className={styles['form-control']}>
                                        <option value="block">Block</option>
                                        <option value="flex">Flex</option>
                                        <option value="inline-block">Inline Block</option>
                                    </select>
                                </div>
                                {s.style?.display === 'flex' && (
                                    <>
                                        <div className={styles['form-group']}>
                                            <label className={styles['form-label']}>Direction</label>
                                            <select value={s.style?.flexDirection || 'row'} onChange={(e) => onStyleChange(s.id, 'flexDirection', e.target.value)} className={styles['form-control']}>
                                                <option value="row">Row</option>
                                                <option value="column">Column</option>
                                            </select>
                                        </div>
                                        <div className={styles['form-group']}>
                                            <label className={styles['form-label']}>Align Items</label>
                                            <select value={s.style?.alignItems || 'stretch'} onChange={(e) => onStyleChange(s.id, 'alignItems', e.target.value)} className={styles['form-control']}>
                                                <option value="flex-start">Start</option>
                                                <option value="center">Center</option>
                                                <option value="flex-end">End</option>
                                                <option value="stretch">Stretch</option>
                                            </select>
                                        </div>
                                        <div className={styles['form-group']}>
                                            <label className={styles['form-label']}>Justify Content</label>
                                            <select value={s.style?.justifyContent || 'flex-start'} onChange={(e) => onStyleChange(s.id, 'justifyContent', e.target.value)} className={styles['form-control']}>
                                                <option value="flex-start">Start</option>
                                                <option value="center">Center</option>
                                                <option value="flex-end">End</option>
                                                <option value="space-between">Between</option>
                                                <option value="space-around">Around</option>
                                            </select>
                                        </div>
                                        <div className={styles['form-group']}>
                                            <label className={styles['form-label']}>Gap (px)</label>
                                            <input type="number" value={parseInt(s.style?.gap) || 0} onChange={(e) => onStyleChange(s.id, 'gap', `${e.target.value}px`)} className={styles['form-control']} />
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    {/* ── BORDERS ─────────────────────────────────────────── */}
                    <div className={styles['prop-category']}>
                        <div className={`${styles['prop-header']} ${openCategories.borders ? styles.open : ''}`} onClick={() => toggleCategory('borders')}>
                            <span><i className="fas fa-border-all" /> BORDERS</span>
                            <i className="fas fa-chevron-down" />
                        </div>
                        {openCategories.borders && (
                            <div className={styles['prop-content']}>
                                <div className={styles['form-group']}>
                                    <label className={styles['form-label']}>Radius</label>
                                    <input type="number" value={parseInt(s.style?.borderRadius) || 0} onChange={(e) => onStyleChange(s.id, 'borderRadius', `${e.target.value}px`)} className={styles['form-control']} />
                                </div>
                                <div className={styles.flex} style={{ gap: '10px' }}>
                                    <div className={styles['form-group']} style={{ flex: 1 }}>
                                        <label className={styles['form-label']}>Width</label>
                                        <input type="number" value={parseInt(s.style?.borderWidth) || 0} onChange={(e) => onStyleChange(s.id, 'borderWidth', `${e.target.value}px`)} className={styles['form-control']} />
                                    </div>
                                    <div className={styles['form-group']} style={{ flex: 1 }}>
                                        <label className={styles['form-label']}>Style</label>
                                        <select value={s.style?.borderStyle || 'solid'} onChange={(e) => onStyleChange(s.id, 'borderStyle', e.target.value)} className={styles['form-control']}>
                                            <option value="solid">Solid</option>
                                            <option value="dashed">Dashed</option>
                                            <option value="dotted">Dotted</option>
                                            <option value="none">None</option>
                                        </select>
                                    </div>
                                </div>
                                <div className={styles['form-group']}>
                                    <label className={styles['form-label']}>Border Color</label>
                                    <input type="color" value={s.style?.borderColor || '#000000'} onChange={(e) => onStyleChange(s.id, 'borderColor', e.target.value)} className={styles['form-control']} style={{ height: '40px' }} />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ── EFFECTS ─────────────────────────────────────────── */}
                    <div className={styles['prop-category']}>
                        <div className={`${styles['prop-header']} ${openCategories.effects ? styles.open : ''}`} onClick={() => toggleCategory('effects')}>
                            <span><i className="fas fa-wand-magic-sparkles" /> EFFECTS</span>
                            <i className="fas fa-chevron-down" />
                        </div>
                        {openCategories.effects && (
                            <div className={styles['prop-content']}>
                                <div className={styles['form-group']}>
                                    <label className={styles['form-label']}>Box Shadow</label>
                                    <select value={s.style?.boxShadow || 'none'} onChange={(e) => onStyleChange(s.id, 'boxShadow', e.target.value)} className={styles['form-control']}>
                                        <option value="none">None</option>
                                        <option value="0px 2px 5px rgba(0,0,0,0.1)">Soft</option>
                                        <option value="0px 4px 10px rgba(0,0,0,0.15)">Medium</option>
                                        <option value="0px 10px 20px rgba(0,0,0,0.2)">Strong</option>
                                        <option value="0px 20px 40px rgba(0,0,0,0.3)">Extra Strong</option>
                                        <option value="inset 0px 4px 10px rgba(0,0,0,0.1)">Inset Shadow</option>
                                    </select>
                                </div>
                                <div className={styles['form-group']}>
                                    <label className={styles['form-label']}>Opacity ({Math.round((s.style?.opacity || 1) * 100)}%)</label>
                                    <input type="range" min="0" max="1" step="0.1"
                                        value={s.style?.opacity !== undefined ? s.style.opacity : 1}
                                        onChange={(e) => onStyleChange(s.id, 'opacity', parseFloat(e.target.value))}
                                        className={styles['w-100']} />
                                </div>
                                <div className={styles['form-group']}>
                                    <label className={styles['form-label']}>Z-Index</label>
                                    <input type="number" value={s.style?.zIndex || 0} onChange={(e) => onStyleChange(s.id, 'zIndex', parseInt(e.target.value))} className={styles['form-control']} />
                                </div>
                                <div className={styles['form-group']}>
                                    <label className={styles['form-label']}>Filter (Blur)</label>
                                    <input type="range" min="0" max="20" step="1"
                                        value={parseInt(s.style?.filter?.replace('blur(', '').replace('px)', '')) || 0}
                                        onChange={(e) => onStyleChange(s.id, 'filter', `blur(${e.target.value}px)`)}
                                        className={styles['w-100']} />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ── Delete ──────────────────────────────────────────── */}
                    <button onClick={() => onDelete(s.id)} className={`${styles.btn} ${styles['btn-danger']} ${styles['w-100']} ${styles['mt-20']}`}>
                        <i className="fas fa-trash" /> Delete Component
                    </button>
                </div>

            ) : (
                /* ── PAGE SETTINGS (no component selected) ──────────────── */
                <div className={styles['mt-20']}>
                    <h4>Page Settings</h4>
                    <label className={`${styles['d-block']} ${styles['mb-5']} ${styles['fw-bold']}`}>Background Image</label>
                    <div className={styles['mb-10']}>
                        <input type="file" accept="image/*" onChange={handlePageBackgroundUpload} className={styles['w-100']} />
                    </div>
                    <label className={`${styles['d-block']} ${styles['mb-5']} ${styles['fw-bold']}`}>Or Image URL</label>
                    <input type="text" value={backgroundImage} onChange={(e) => setBackgroundImage(e.target.value)}
                        placeholder="https://" className={styles['form-control']} />

                    {backgroundImage && (
                        <>
                            <button onClick={() => setBackgroundImage('')} className={`${styles.btn} ${styles['btn-danger']} ${styles['w-100']} ${styles['mt-10']} ${styles['mb-15']}`}>
                                Remove Background
                            </button>
                            <label className={`${styles['d-block']} ${styles['mb-5']} ${styles['fw-bold']}`}>Background Gradient</label>
                            <select value={activePage.style.background || 'none'} onChange={(e) => updatePageStyle('background', e.target.value)} className={`${styles['form-control']} ${styles['mb-15']}`}>
                                <option value="none">None</option>
                                <option value="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">Royal Purple</option>
                                <option value="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)">Soft Pink</option>
                                <option value="linear-gradient(135deg, #2af598 0%, #009efd 100%)">Ocean Blue</option>
                                <option value="linear-gradient(135deg, #0a0a0a 0%, #2e2e2e 100%)">Dark Studio</option>
                                <option value="linear-gradient(135deg, #d4af37 0%, #aa8b2c 100%)">Gold Luxury</option>
                            </select>
                            <label className={`${styles['d-block']} ${styles['mb-5']} ${styles['fw-bold']}`}>Background Size</label>
                            <select value={backgroundSize} onChange={(e) => setBackgroundSize(e.target.value)} className={`${styles['form-control']} ${styles['mb-10']}`}>
                                <option value="cover">Cover (Fill)</option>
                                <option value="contain">Contain (Fit)</option>
                                <option value="auto">Auto (Original Size)</option>
                                <option value="100% 100%">Stretch (100% 100%)</option>
                            </select>
                            <label className={`${styles['d-block']} ${styles['mb-5']} ${styles['fw-bold']}`}>Background Position</label>
                            <select value={backgroundPosition} onChange={(e) => setBackgroundPosition(e.target.value)} className={`${styles['form-control']} ${styles['mb-10']}`}>
                                <option value="center">Center</option>
                                <option value="top">Top</option>
                                <option value="bottom">Bottom</option>
                                <option value="left">Left</option>
                                <option value="right">Right</option>
                                <option value="top left">Top Left</option>
                                <option value="top right">Top Right</option>
                                <option value="bottom left">Bottom Left</option>
                                <option value="bottom right">Bottom Right</option>
                            </select>
                            <label className={`${styles['d-block']} ${styles['mb-5']} ${styles['fw-bold']}`}>Background Repeat</label>
                            <select value={backgroundRepeat} onChange={(e) => setBackgroundRepeat(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '10px' }}>
                                <option value="no-repeat">No Repeat</option>
                                <option value="repeat">Repeat</option>
                                <option value="repeat-x">Repeat X (Horizontal)</option>
                                <option value="repeat-y">Repeat Y (Vertical)</option>
                            </select>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default PropertiesPanel;
