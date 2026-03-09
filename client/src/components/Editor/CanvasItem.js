import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CanvasItem = ({ id, type, content, link, onSelect, style, responsiveStyles, states, onDragStart, previewMode, selected, updateComponentStyles, updateComponentContent, viewMode, onMove }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [isEditingText, setIsEditingText] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const ref = useRef(null);
    const contentEditableRef = useRef(null);
    const dragFlagRef = useRef(false);

    useEffect(() => {
        if (selected && isEditingText && contentEditableRef.current) {
            contentEditableRef.current.focus();
        } else {
            setIsEditingText(false);
        }
    }, [selected, isEditingText]);

    const handleTextBlur = (e) => {
        setIsEditingText(false);
        if (updateComponentContent && typeof updateComponentContent === 'function') {
            updateComponentContent(id, e.target.innerText);
        }
    };

    // ─────────────────────────────────────────────────────────
    // Wix-style custom mouse drag — zero-latency direct DOM updates
    // ─────────────────────────────────────────────────────────
    const handleMouseDown = useCallback((e) => {
        if (previewMode || isEditingText || isResizing) return;
        if (e.button !== 0) return;
        // Don't start drag from resize handles or editable content
        if (e.target.closest('[data-resize-handle]')) return;
        if (e.target.isContentEditable) return;

        e.stopPropagation();
        onSelect(id);

        const el = ref.current;
        if (!el) return;

        // Find canvas container (direct parent with position:relative)
        const canvas = el.parentElement;
        if (!canvas) return;

        const canvasRect = canvas.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();
        const scrollLeft = canvas.scrollLeft || 0;
        const scrollTop = canvas.scrollTop || 0;

        // Calculate starting absolute position relative to canvas
        let startLeft, startTop;
        if (style.position === 'absolute' && style.left != null && style.top != null) {
            startLeft = parseFloat(style.left) || 0;
            startTop = parseFloat(style.top) || 0;
        } else {
            // Convert relative/static position to absolute coords
            startLeft = elRect.left - canvasRect.left + scrollLeft;
            startTop = elRect.top - canvasRect.top + scrollTop;
        }

        const startMouseX = e.clientX;
        const startMouseY = e.clientY;
        const moveThreshold = 3; // Pixels before drag starts (allows clicking)
        let hasDragStarted = false;
        dragFlagRef.current = false;

        const gridSize = 10;
        const canvasWidth = canvas.clientWidth;
        const elWidth = elRect.width;
        const centerX = canvasWidth / 2;
        const snapThreshold = 12;

        const onMouseMove = (moveEvent) => {
            const dx = moveEvent.clientX - startMouseX;
            const dy = moveEvent.clientY - startMouseY;

            // Don't start drag until threshold is exceeded (prevents accidental drags on click)
            if (!hasDragStarted) {
                if (Math.abs(dx) < moveThreshold && Math.abs(dy) < moveThreshold) return;
                hasDragStarted = true;
                dragFlagRef.current = true;
                setIsDragging(true);
                if (onDragStart) onDragStart();
                // Force absolute mode
                el.style.position = 'absolute';
                el.style.margin = '0';
            }

            let newLeft = startLeft + dx;
            let newTop = startTop + dy;

            // Grid snap
            newLeft = Math.round(newLeft / gridSize) * gridSize;
            newTop = Math.round(newTop / gridSize) * gridSize;

            // Boundaries
            newLeft = Math.max(0, Math.min(newLeft, canvasWidth - elWidth));
            newTop = Math.max(0, newTop);

            // Center snap
            const itemCenterX = newLeft + elWidth / 2;
            if (Math.abs(itemCenterX - centerX) < snapThreshold) {
                newLeft = Math.round((centerX - elWidth / 2) / gridSize) * gridSize;
            }

            // ★ Direct DOM update — bypasses React for instant feedback
            el.style.left = `${newLeft}px`;
            el.style.top = `${newTop}px`;
            el.style.zIndex = '1000';
            el.style.willChange = 'left, top';
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);

            if (hasDragStarted) {
                const finalLeft = parseFloat(el.style.left) || 0;
                const finalTop = parseFloat(el.style.top) || 0;

                el.style.willChange = '';
                setIsDragging(false);

                // Commit final position to React state
                if (onMove) {
                    onMove(id, finalLeft, finalTop);
                }
            }

            // Defer resetting the flag so onClick doesn't fire after drag
            setTimeout(() => { dragFlagRef.current = false; }, 0);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }, [previewMode, isEditingText, isResizing, style, id, onSelect, onDragStart, onMove]);

    // ─────────────────────────────────────────────────────────
    // Resize handler (unchanged)
    // ─────────────────────────────────────────────────────────
    const handleResizeMouseDown = (e, direction) => {
        e.stopPropagation();
        setIsResizing(true);
        const startX = e.clientX;
        const startY = e.clientY;
        const computedStyle = window.getComputedStyle(ref.current);
        const startWidth = parseFloat(computedStyle.width);
        const startHeight = parseFloat(computedStyle.height);
        const startLeft = parseFloat(style.left) || 0;

        const canvasWidth = 1200;

        setDimensions({ width: Math.round(startWidth), height: Math.round(startHeight) });

        const onMouseMove = (moveEvent) => {
            if (!ref.current) return;
            const deltaX = moveEvent.clientX - startX;
            const deltaY = moveEvent.clientY - startY;

            let newWidth = startWidth;
            let newHeight = startHeight;
            const gridSize = 10;

            if (direction.includes('right')) {
                newWidth = Math.round((startWidth + deltaX) / gridSize) * gridSize;
                newWidth = Math.max(10, Math.min(newWidth, canvasWidth - startLeft));
                ref.current.style.width = `${newWidth}px`;
            }
            if (direction.includes('bottom')) {
                newHeight = Math.round((startHeight + deltaY) / gridSize) * gridSize;
                newHeight = Math.max(10, newHeight);
                ref.current.style.height = `${newHeight}px`;
            }
            if (direction.includes('left')) {
                const newLeftEdge = startLeft + deltaX;
                newWidth = Math.round((startWidth - deltaX) / gridSize) * gridSize;
                newWidth = Math.max(10, newWidth);
                ref.current.style.width = `${newWidth}px`;
                ref.current.style.left = `${Math.round(newLeftEdge / gridSize) * gridSize}px`;
            }

            setDimensions({ width: Math.round(newWidth), height: Math.round(newHeight) });
        };

        const onMouseUp = () => {
            setIsResizing(false);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);

            if (ref.current && updateComponentStyles) {
                const newStyles = {
                    width: ref.current.style.width,
                    height: ref.current.style.height
                };
                if (direction.includes('left')) {
                    newStyles.left = ref.current.style.left;
                }
                updateComponentStyles(id, newStyles);
            }
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    // ─────────────────────────────────────────────────────────
    // Render content
    // ─────────────────────────────────────────────────────────
    const renderContent = () => {
        if (type === 'image') {
            return <img src={content} alt="Uploaded" draggable={false} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: style.borderRadius, pointerEvents: 'none' }} />;
        } else if (type === 'video') {
            return (
                <div style={{ pointerEvents: 'none', width: '100%', height: '100%', minHeight: '100px', background: '#000', borderRadius: style.borderRadius, overflow: 'hidden' }}>
                    <iframe width="100%" height="100%" src={content.replace('watch?v=', 'embed/')} title="Video" frameBorder="0" allowFullScreen></iframe>
                </div>
            );
        } else if (type === 'input') {
            return <input type="text" placeholder={content} style={{ width: '100%', height: '100%', padding: '10px', pointerEvents: 'none', borderRadius: style.borderRadius, border: '1px solid #ddd' }} readOnly />;
        } else if (['text', 'heading', 'button'].includes(type) && !previewMode) {
            return (
                <div
                    ref={contentEditableRef}
                    contentEditable={isEditingText}
                    suppressContentEditableWarning={true}
                    onDoubleClick={(e) => {
                        e.stopPropagation();
                        if (!previewMode) setIsEditingText(true);
                    }}
                    onBlur={handleTextBlur}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && type !== 'text') {
                            e.preventDefault();
                            e.target.blur();
                        }
                    }}
                    style={{
                        width: '100%',
                        height: '100%',
                        outline: 'none',
                        cursor: isEditingText ? 'text' : 'inherit',
                        userSelect: isEditingText ? 'text' : 'none',
                        WebkitUserSelect: isEditingText ? 'text' : 'none',
                        display: 'flex',
                        alignItems: style.alignItems || 'center',
                        justifyContent: style.justifyContent || 'center',
                        textAlign: style.textAlign || 'inherit'
                    }}
                >
                    {content}
                </div>
            );
        } else {
            return content;
        }
    };

    // ─────────────────────────────────────────────────────────
    // Computed styles
    // ─────────────────────────────────────────────────────────
    const currentStyles = {
        ...style,
        position: style?.position || 'absolute',
        ...(viewMode !== 'desktop' && responsiveStyles ? responsiveStyles[viewMode] : {}),
        ...(isHovered && states?.hover ? states.hover : {}),
    };

    // ─────────────────────────────────────────────────────────
    // Render
    // ─────────────────────────────────────────────────────────
    return (
        <div
            ref={ref}
            id={`component-${id}`}
            onMouseDown={handleMouseDown}
            onClick={(e) => {
                e.stopPropagation();
                // Prevent selection after drag
                if (!dragFlagRef.current) onSelect(id);
            }}
            onMouseEnter={() => !isDragging && setIsHovered(true)}
            onMouseLeave={() => { setIsHovered(false); }}
            onDoubleClick={(e) => {
                e.stopPropagation();
                if (['text', 'heading', 'button'].includes(type) && !previewMode) {
                    setIsEditingText(true);
                }
            }}
            style={{
                ...currentStyles,
                cursor: isEditingText
                    ? 'text'
                    : (previewMode
                        ? (link ? 'pointer' : 'default')
                        : isDragging ? 'grabbing' : 'grab'),
                opacity: isDragging ? 0.88 : (currentStyles.opacity || 1),
                overflow: 'visible',
                // Selection / drag visual feedback
                outline: (selected && !previewMode)
                    ? (isDragging ? '2px solid #818cf8' : '2px solid #6366f1')
                    : (isHovered && !previewMode ? '1px dashed rgba(99,102,241,0.5)' : 'none'),
                outlineOffset: '2px',
                boxShadow: isDragging
                    ? '0 20px 40px -8px rgba(99, 102, 241, 0.5), 0 0 0 1px rgba(99,102,241,0.3)'
                    : (selected && !previewMode ? '0 10px 25px -5px rgba(0, 0, 0, 0.2)' : 'none'),
                zIndex: isDragging ? 10000 : (selected ? 1000 : (style.zIndex || 1)),
                transition: isDragging
                    ? 'opacity 0.15s ease, box-shadow 0.15s ease'
                    : 'box-shadow 0.25s ease, outline 0.15s ease, opacity 0.15s ease',
                userSelect: isEditingText ? 'text' : 'none',
                WebkitUserSelect: isEditingText ? 'text' : 'none',
            }}
        >
            {/* Coordinates tooltip during drag */}
            {isDragging && (
                <div
                    style={{
                        position: 'absolute', top: '-32px', left: '50%', transform: 'translateX(-50%)',
                        background: '#6366f1', color: 'white', padding: '3px 10px', borderRadius: '6px',
                        fontSize: '10px', fontWeight: '700', whiteSpace: 'nowrap', zIndex: 10001,
                        boxShadow: '0 4px 12px rgba(99, 102, 241, 0.5)',
                        letterSpacing: '0.5px', fontFamily: 'monospace',
                    }}
                >
                    {Math.round(parseFloat(ref.current?.style.left) || 0)}, {Math.round(parseFloat(ref.current?.style.top) || 0)}
                </div>
            )}

            {/* Dimension indicator during resize */}
            <AnimatePresence>
                {isResizing && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'absolute', top: '-30px', left: '50%', transform: 'translateX(-50%)',
                            background: '#6366f1', color: 'white', padding: '2px 8px', borderRadius: '4px',
                            fontSize: '10px', fontWeight: 'bold', whiteSpace: 'nowrap', zIndex: 1000,
                            boxShadow: '0 4px 10px rgba(99, 102, 241, 0.4)'
                        }}
                    >
                        {dimensions.width}px × {dimensions.height}px
                    </motion.div>
                )}
            </AnimatePresence>

            {link ? (
                <a
                    href={link}
                    onClick={(e) => !previewMode && e.preventDefault()}
                    target={previewMode ? "_blank" : undefined}
                    rel={previewMode ? "noopener noreferrer" : undefined}
                    style={{ display: 'block', textDecoration: 'none', color: 'inherit', width: '100%', height: '100%' }}
                >
                    {renderContent()}
                </a>
            ) : renderContent()}

            {selected && !previewMode && !isDragging && (
                <>
                    {/* Selection border */}
                    <div style={{ position: 'absolute', inset: '-2px', border: '2px solid #6366f1', pointerEvents: 'none', zIndex: 10, borderRadius: `calc(${style.borderRadius || '0px'} + 2px)` }} />

                    {/* Resize Handles */}
                    <motion.div
                        data-resize-handle="true"
                        whileHover={{ scale: 1.3 }}
                        style={{ position: 'absolute', top: '50%', right: '-5px', width: '10px', height: '24px', background: '#6366f1', transform: 'translateY(-50%)', cursor: 'e-resize', zIndex: 20, borderRadius: '4px', border: '2px solid white' }}
                        onMouseDown={(e) => handleResizeMouseDown(e, 'right')}
                    />
                    <motion.div
                        data-resize-handle="true"
                        whileHover={{ scale: 1.3 }}
                        style={{ position: 'absolute', top: '50%', left: '-5px', width: '10px', height: '24px', background: '#6366f1', transform: 'translateY(-50%)', cursor: 'w-resize', zIndex: 20, borderRadius: '4px', border: '2px solid white' }}
                        onMouseDown={(e) => handleResizeMouseDown(e, 'left')}
                    />
                    <motion.div
                        data-resize-handle="true"
                        whileHover={{ scale: 1.3 }}
                        style={{ position: 'absolute', bottom: '-5px', left: '50%', width: '24px', height: '10px', background: '#6366f1', transform: 'translateX(-50%)', cursor: 's-resize', zIndex: 20, borderRadius: '4px', border: '2px solid white' }}
                        onMouseDown={(e) => handleResizeMouseDown(e, 'bottom')}
                    />
                    <motion.div
                        data-resize-handle="true"
                        whileHover={{ scale: 1.5 }}
                        style={{ position: 'absolute', bottom: '-6px', right: '-6px', width: '14px', height: '14px', background: '#6366f1', cursor: 'se-resize', zIndex: 21, borderRadius: '50%', border: '2px solid white', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}
                        onMouseDown={(e) => handleResizeMouseDown(e, 'bottom-right')}
                    />
                </>
            )}
        </div>
    );
};

export default CanvasItem;