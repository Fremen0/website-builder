import React, { useRef, useEffect, useState } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { motion, AnimatePresence } from 'framer-motion';

const ItemTypes = {
    CANVAS_ITEM: 'canvasItem',
};

const CanvasItem = ({ id, type, content, link, onSelect, style, responsiveStyles, states, onDragStart, previewMode, selected, updateComponentStyles, updateComponentContent, viewMode }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [isEditingText, setIsEditingText] = useState(false);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const ref = useRef(null);
    const contentEditableRef = useRef(null);

    const [{ isDragging, currentOffset }, drag, preview] = useDrag({
        type: ItemTypes.CANVAS_ITEM,
        item: () => {
            if (onDragStart) onDragStart();
            const rect = ref.current.getBoundingClientRect();
            return {
                id,
                initialClientRect: { x: rect.left, y: rect.top },
                width: rect.width,
                height: rect.height,
                originalLeft: parseFloat(style.left) || 0,
                originalTop: parseFloat(style.top) || 0
            };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            currentOffset: monitor.getDifferenceFromInitialOffset(),
        }),
    });

    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true });
    }, [preview]);

    useEffect(() => {
        if (selected && isEditingText && contentEditableRef.current) {
            contentEditableRef.current.focus();
            // Optional: Select all text when editing starts
            // document.execCommand('selectAll', false, null);
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

    // Only enable dragging if we are not editing text
    drag(isEditingText ? null : ref);

    const handleResizeMouseDown = (e, direction) => {
        e.stopPropagation();
        setIsResizing(true);
        const startX = e.clientX;
        const startY = e.clientY;
        const computedStyle = window.getComputedStyle(ref.current);
        const startWidth = parseFloat(computedStyle.width);
        const startHeight = parseFloat(computedStyle.height);
        const startLeft = parseFloat(style.left) || 0;

        // Canvas width limit (considering 1200px desktop max-width)
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
                // Clamp width (from current position to canvas edge)
                newWidth = Math.max(10, Math.min(newWidth, canvasWidth - startLeft));
                ref.current.style.width = `${newWidth}px`;
            }
            if (direction.includes('bottom')) {
                newHeight = Math.round((startHeight + deltaY) / gridSize) * gridSize;
                // Clamp height (reasonable min)
                newHeight = Math.max(10, newHeight);
                ref.current.style.height = `${newHeight}px`;
            }

            setDimensions({ width: Math.round(newWidth), height: Math.round(newHeight) });
        };

        const onMouseUp = () => {
            setIsResizing(false);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);

            if (ref.current && updateComponentStyles) {
                updateComponentStyles(id, {
                    width: ref.current.style.width,
                    height: ref.current.style.height
                });
            }
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    const renderContent = () => {
        if (type === 'image') {
            return <img src={content} alt="Uploaded" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: style.borderRadius }} />;
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
                            e.preventDefault(); // Don't allow line breaks in buttons or single-line headings
                            e.target.blur();
                        }
                    }}
                    style={{
                        width: '100%',
                        height: '100%',
                        outline: 'none',
                        cursor: isEditingText ? 'text' : 'inherit',
                        userSelect: isEditingText ? 'text' : 'none',
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

    const currentStyles = {
        ...style,
        position: style.position || 'absolute',
        ...(viewMode !== 'desktop' && responsiveStyles ? responsiveStyles[viewMode] : {}),
        ...(isHovered && states?.hover ? states.hover : {}),
        ...(isActive && states?.active ? states.active : {})
    };

    return (
        <motion.div
            ref={ref}
            id={`component-${id}`}
            animate={{
                outline: selected && !previewMode ? '2px solid #6366f1' : '0px solid transparent',
                outlineOffset: '2px',
                boxShadow: selected ? '0 10px 25px -5px rgba(0, 0, 0, 0.2)' : 'none',
                scale: isActive ? 0.98 : (isHovered && !selected ? 1.01 : 1),
                zIndex: selected || isDragging ? 1000 : style.zIndex || 1
            }}
            transition={isDragging ? { type: false, duration: 0 } : { type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => { e.stopPropagation(); onSelect(id); }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseDown={() => setIsActive(true)}
            onMouseUp={() => setIsActive(false)}
            onDoubleClick={(e) => {
                e.stopPropagation();
                if (['text', 'heading', 'button'].includes(type) && !previewMode) {
                    setIsEditingText(true);
                }
            }}
            style={{
                ...currentStyles,
                cursor: isEditingText ? 'text' : (previewMode ? (link ? 'pointer' : 'default') : 'move'),
                opacity: isDragging ? 0.4 : (currentStyles.opacity || 1),
                overflow: 'visible',
                transform: isDragging && currentOffset ? `translate(${Math.round(currentOffset.x)}px, ${Math.round(currentOffset.y)}px)` : undefined,
            }}
        >
            {/* Dimension Indicator */}
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

            {selected && !previewMode && (
                <>
                    {/* Visual Border */}
                    <div style={{ position: 'absolute', inset: '-2px', border: '2px solid #6366f1', pointerEvents: 'none', zIndex: 10, borderRadius: `calc(${style.borderRadius || '0px'} + 2px)` }}></div>

                    {/* Resize Handles */}
                    <motion.div
                        whileHover={{ scale: 1.2 }}
                        style={{ position: 'absolute', top: '50%', right: '-5px', width: '10px', height: '24px', background: '#6366f1', transform: 'translateY(-50%)', cursor: 'e-resize', zIndex: 20, borderRadius: '4px', border: '2px solid white' }}
                        onMouseDown={(e) => handleResizeMouseDown(e, 'right')}
                    />
                    <motion.div
                        whileHover={{ scale: 1.2 }}
                        style={{ position: 'absolute', bottom: '-5px', left: '50%', width: '24px', height: '10px', background: '#6366f1', transform: 'translateX(-50%)', cursor: 's-resize', zIndex: 20, borderRadius: '4px', border: '2px solid white' }}
                        onMouseDown={(e) => handleResizeMouseDown(e, 'bottom')}
                    />
                    <motion.div
                        whileHover={{ scale: 1.3 }}
                        style={{ position: 'absolute', bottom: '-6px', right: '-6px', width: '14px', height: '14px', background: '#6366f1', cursor: 'se-resize', zIndex: 21, borderRadius: '50%', border: '2px solid white', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}
                        onMouseDown={(e) => handleResizeMouseDown(e, 'bottom-right')}
                    />
                </>
            )}
        </motion.div>
    );
};

export default CanvasItem;