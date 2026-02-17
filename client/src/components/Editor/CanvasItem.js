import React, { useRef, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

const ItemTypes = {
    CANVAS_ITEM: 'canvasItem',
};

const CanvasItem = ({ id, type, content, link, onSelect, style, onDragStart, previewMode, selected, updateComponentStyles }) => {
    const ref = useRef(null);
    const [{ isDragging }, drag, preview] = useDrag({
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
        }),
    });

    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true });
    }, [preview]);

    const opacity = isDragging ? 0.5 : 1;
    drag(ref);

    const handleResizeMouseDown = (e, direction) => {
        e.stopPropagation(); // Prevent drag start
        const startX = e.clientX;
        const startY = e.clientY;
        const computedStyle = window.getComputedStyle(ref.current);
        const startWidth = parseFloat(computedStyle.width);
        const startHeight = parseFloat(computedStyle.height);

        const onMouseMove = (moveEvent) => {
            if (!ref.current) return;
            const deltaX = moveEvent.clientX - startX;
            const deltaY = moveEvent.clientY - startY;

            if (direction.includes('right')) {
                ref.current.style.width = `${startWidth + deltaX}px`;
            }
            if (direction.includes('bottom')) {
                ref.current.style.height = `${startHeight + deltaY}px`;
            }
        };

        const onMouseUp = () => {
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
            return <img src={content} alt="Uploaded" style={{ maxWidth: '100%', height: '100%', display: 'block' }} />;
        } else if (type === 'video') {
            return (
                <div style={{ pointerEvents: 'none', width: '100%', height: '100%', minHeight: '200px', background: '#000' }}>
                    <iframe width="100%" height="100%" src={content.replace('watch?v=', 'embed/')} title="Video" frameBorder="0" allowFullScreen></iframe>
                </div>
            );
        } else if (type === 'input') {
            return <input type="text" placeholder={content} style={{ width: '100%', padding: '5px', pointerEvents: 'none' }} readOnly />;
        } else {
            return content;
        }
    };

    const contentElement = renderContent();

    return (
        <div
            ref={ref}
            id={`component-${id}`}
            onClick={(e) => {
                e.stopPropagation();
                onSelect(id);
            }}
            style={{
                border: selected && !previewMode ? '2px solid #3498db' : '1px solid #ddd',
                background: '#fff', cursor: 'move', opacity, position: style.position || 'relative', ...style
            }}
        >
            {link ? (
                <a
                    href={link}
                    onClick={(e) => !previewMode && e.preventDefault()}
                    target={previewMode ? "_blank" : undefined}
                    rel={previewMode ? "noopener noreferrer" : undefined}
                    style={{ display: 'block', textDecoration: 'none', color: 'inherit', width: '100%', height: '100%' }}
                >
                    {contentElement}
                </a>
            ) : (
                contentElement
            )}

            {selected && !previewMode && (
                <>
                    {/* Visual Border */}
                    <div style={{ position: 'absolute', top: -1, left: -1, right: -1, bottom: -1, border: '2px solid #6366f1', pointerEvents: 'none', zIndex: 10 }}></div>

                    {/* Handles */}
                    <div
                        style={{ position: 'absolute', top: '50%', right: '-6px', width: '12px', height: '12px', background: 'white', border: '2px solid #6366f1', transform: 'translateY(-50%)', cursor: 'e-resize', zIndex: 20, borderRadius: '2px' }}
                        onMouseDown={(e) => handleResizeMouseDown(e, 'right')}
                    />
                    <div
                        style={{ position: 'absolute', bottom: '-6px', left: '50%', width: '12px', height: '12px', background: 'white', border: '2px solid #6366f1', transform: 'translateX(-50%)', cursor: 's-resize', zIndex: 20, borderRadius: '2px' }}
                        onMouseDown={(e) => handleResizeMouseDown(e, 'bottom')}
                    />
                    <div
                        style={{ position: 'absolute', bottom: '-6px', right: '-6px', width: '14px', height: '14px', background: '#6366f1', cursor: 'se-resize', zIndex: 21, borderRadius: '2px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}
                        onMouseDown={(e) => handleResizeMouseDown(e, 'bottom-right')}
                    />
                </>
            )}
        </div>
    );
};

export default CanvasItem;