import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import axios from 'axios';

import SidebarItem from './SidebarItem';
import CanvasItem from './CanvasItem';
import styles from './Editor.module.css';
import { INITIAL_TEMPLATES, PREBUILT_SECTIONS } from './templates';

const ItemTypes = {
    SIDEBAR_ITEM: 'sidebarItem',
    CANVAS_ITEM: 'canvasItem',
};

const FONT_FAMILIES = [
    'Arial, sans-serif',
    'Georgia, serif',
    'Times New Roman, serif',
    'Courier New, monospace',
    'Verdana, sans-serif',
    'Roboto, sans-serif',
    'Open Sans, sans-serif',
    'Montserrat, sans-serif',
    'Playfair Display, serif',
    'Inter, sans-serif',
];



const Editor = () => {
    // State to store page components (will be connected to Backend later)
    // State to store page components (will be connected to Backend later)
    const [pages, setPages] = useState([{
        id: 'home',
        name: 'Home',
        path: '/',
        components: [],
        style: {
            backgroundImage: '',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }
    }]);
    const [activePageId, setActivePageId] = useState('home');

    // Derived state for backward compatibility within component
    const activePage = pages.find(p => p.id === activePageId) || pages[0];
    const components = activePage.components;

    // Setters that update the active page
    const setComponents = useCallback((newComponentsOrUpdater) => {
        setPages(prevPages => prevPages.map(page => {
            if (page.id === activePageId) {
                const newComponents = typeof newComponentsOrUpdater === 'function'
                    ? newComponentsOrUpdater(page.components)
                    : newComponentsOrUpdater;
                return { ...page, components: newComponents };
            }
            return page;
        }));
    }, [activePageId]);

    const updatePageStyle = useCallback((key, value) => {
        setPages(prevPages => prevPages.map(page => {
            if (page.id === activePageId) {
                return { ...page, style: { ...page.style, [key]: value } };
            }
            return page;
        }));
    }, [activePageId]);

    const backgroundImage = activePage.style.backgroundImage;
    const setBackgroundImage = (val) => updatePageStyle('backgroundImage', val);

    const backgroundSize = activePage.style.backgroundSize;
    const setBackgroundSize = (val) => updatePageStyle('backgroundSize', val);

    const backgroundPosition = activePage.style.backgroundPosition;
    const setBackgroundPosition = (val) => updatePageStyle('backgroundPosition', val);

    const backgroundRepeat = activePage.style.backgroundRepeat;
    const setBackgroundRepeat = (val) => updatePageStyle('backgroundRepeat', val);

    const canvasRef = useRef(null);
    const [guides, setGuides] = useState({ x: null, y: null });
    const [selectedId, setSelectedId] = useState(null);
    const [previewMode, setPreviewMode] = useState(false);
    const [viewMode, setViewMode] = useState('desktop');
    const [projectId, setProjectId] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    // const [saving, setSaving] = useState(false); // Unused
    const isFirstLoad = useRef(true);
    const [history, setHistory] = useState([]);
    const [future, setFuture] = useState([]);
    const [templates, setTemplates] = useState(INITIAL_TEMPLATES);
    const [showTemplates, setShowTemplates] = useState(false);
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [tempTemplateName, setTempTemplateName] = useState('');
    const [openCategories, setOpenCategories] = useState({
        content: true,
        layout: true,
        typography: true,
        borders: false,
        effects: false
    });
    const [toolbarPos, setToolbarPos] = useState({ top: 0, left: 0, visible: false });

    const toggleCategory = (cat) => {
        setOpenCategories(prev => ({ ...prev, [cat]: !prev[cat] }));
    };

    // Page Management Functions
    const addPage = () => {
        const name = prompt('Enter page name (e.g., About):');
        if (!name) return;
        const id = name.toLowerCase().replace(/\s+/g, '-');

        if (pages.some(p => p.name === name || p.id === id)) {
            alert('Page name already exists');
            return;
        }

        setPages(prev => [...prev, {
            id,
            name,
            path: `/${id === 'home' ? '' : id}`,
            components: [],
            style: {
                backgroundImage: '',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }
        }]);
        setActivePageId(id);
    };

    const deletePage = (e, id) => {
        e.stopPropagation();
        if (pages.length <= 1) {
            alert('Cannot delete the last page.');
            return;
        }
        if (!window.confirm(`Are you sure you want to delete page "${id}"?`)) return;

        setPages(prev => prev.filter(p => p.id !== id));
        if (activePageId === id) {
            setActivePageId(pages[0].id === id ? pages[1].id : pages[0].id);
        }
    };

    const switchPage = (id) => {
        setActivePageId(id);
        setSelectedId(null);
    };

    // Track selected element for floating toolbar
    useEffect(() => {
        if (!selectedId || previewMode) {
            setToolbarPos(prev => ({ ...prev, visible: false }));
            return;
        }

        const element = document.getElementById(`component-${selectedId}`);
        if (element && canvasRef.current) {
            const rect = element.getBoundingClientRect();
            const canvasRect = canvasRef.current.getBoundingClientRect();

            setToolbarPos({
                top: rect.top - canvasRect.top - 45,
                left: rect.left - canvasRect.left + (rect.width / 2),
                visible: true
            });
        }
    }, [selectedId, components, previewMode]);

    const saveHistory = useCallback(() => {
        setHistory(prev => [...prev, components]);
        setFuture([]);
    }, [components, setHistory, setFuture]);

    const undo = () => {
        if (history.length === 0) return;
        const previous = history[history.length - 1];
        const newHistory = history.slice(0, -1);
        setFuture(prev => [components, ...prev]);
        setComponents(previous);
        setHistory(newHistory);
    };

    const redo = () => {
        if (future.length === 0) return;
        const next = future[0];
        const newFuture = future.slice(1);
        setHistory(prev => [...prev, components]);
        setComponents(next);
        setFuture(newFuture);
    };

    const moveComponent = (id, left, top) => {
        saveHistory();
        setComponents((prev) =>
            prev.map((comp) => {
                if (comp.id === id) {
                    return {
                        ...comp,
                        style: { ...comp.style, position: 'absolute', left: `${left}px`, top: `${top}px` }
                    };
                }
                return comp;
            })
        );
    };

    useEffect(() => {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&family=Roboto:wght@400;500;700&family=Montserrat:wght@400;700&family=Playfair+Display:wght@700&family=Inter:wght@400;700&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }, []);

    useEffect(() => {
        const loadTemplates = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/templates');
                if (res.data && res.data.length > 0) {
                    // Combine DB templates with initial ones, avoiding duplicates
                    const dbTemplates = res.data.map(t => ({ ...t, id: t._id })); // use _id as id
                    const allTemplateNames = new Set(dbTemplates.map(t => t.name));
                    const uniqueInitial = INITIAL_TEMPLATES.filter(t => !allTemplateNames.has(t.name));
                    setTemplates([...dbTemplates, ...uniqueInitial]);
                }
            } catch (error) {
                console.error('Failed to load templates:', error);
                // Fallback to initial templates
                setTemplates(INITIAL_TEMPLATES);
            }
        };
        loadTemplates();
    }, []);

    useEffect(() => {
        const loadLatestProject = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/projects');
                if (res.data && res.data.length > 0) {
                    const latestProject = res.data[0];
                    setProjectId(latestProject._id);
                    if (latestProject.data) {
                        if (latestProject.data.pages) {
                            setPages(latestProject.data.pages);
                            setActivePageId(latestProject.data.activePageId || latestProject.data.pages[0].id);
                        } else {
                            // Migration for old data
                            const oldComponents = latestProject.data.components || [];
                            const oldStyle = {
                                backgroundImage: latestProject.data.backgroundImage || '',
                                backgroundSize: latestProject.data.backgroundSize || 'cover',
                                backgroundPosition: latestProject.data.backgroundPosition || 'center',
                                backgroundRepeat: latestProject.data.backgroundRepeat || 'no-repeat',
                            };
                            setPages([{
                                id: 'home',
                                name: 'Home',
                                path: '/',
                                components: oldComponents,
                                style: oldStyle
                            }]);
                            setActivePageId('home');
                        }
                    }
                    console.log('Latest project loaded:', latestProject.title);
                }
            } catch (error) {
                console.error('Failed to load project:', error);
            } finally {
                setIsLoaded(true);
            }
        };

        loadLatestProject();
    }, []);

    useEffect(() => {
        if (!isLoaded) return;

        // Prevent saving immediately after loading the project
        if (isFirstLoad.current) {
            isFirstLoad.current = false;
            return;
        }

        const saveProject = async () => {
            // setSaving(true);
            const projectData = {
                title: projectId ? 'My Saved Project' : 'New Project',
                data: { pages, activePageId }
            };

            try {
                const response = projectId
                    ? await axios.put(`http://localhost:5000/api/projects/${projectId}`, projectData)
                    : await axios.post('http://localhost:5000/api/projects', projectData);

                if (!projectId) setProjectId(response.data._id);
            } catch (error) {
                console.error('Error auto-saving project:', error);
            } finally {
                // setSaving(false);
            }
        };

        const debounceTimer = setTimeout(() => {
            saveProject();
        }, 1000);

        return () => clearTimeout(debounceTimer);
    }, [pages, activePageId, isLoaded, projectId]);

    const addComponentToCanvas = (item, x, y) => {
        saveHistory();

        let defaultStyle = {};
        let defaultContent = '';

        switch (item.type) {
            case 'button':
                defaultStyle = {
                    backgroundColor: '#6366f1',
                    color: '#ffffff',
                    padding: '12px 24px',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '500',
                    textAlign: 'center',
                    display: 'inline-block',
                    margin: '10px',
                    boxShadow: '0 4px 6px -1px rgba(99, 102, 241, 0.2)'
                };
                defaultContent = 'Button';
                break;
            case 'image':
                defaultStyle = {
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    margin: '10px 0'
                };
                defaultContent = 'https://via.placeholder.com/400x200?text=Image';
                break;
            case 'heading':
                defaultStyle = {
                    color: '#1e293b',
                    fontSize: '32px',
                    fontWeight: 'bold',
                    padding: '10px',
                    margin: '10px',
                    textAlign: 'center',
                    fontFamily: 'Arial, sans-serif',
                    backgroundColor: 'transparent'
                };
                defaultContent = 'Heading';
                break;
            case 'video':
                defaultStyle = {
                    width: '100%',
                    height: '315px',
                    margin: '10px 0',
                    display: 'block'
                };
                defaultContent = 'https://www.youtube.com/embed/dQw4w9WgXcQ';
                break;
            case 'input':
                defaultStyle = {
                    padding: '12px 16px',
                    margin: '10px',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    width: '300px',
                    fontSize: '15px',
                    backgroundColor: '#ffffff',
                    color: '#1e293b',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                    transition: 'border-color 0.2s',
                    outline: 'none'
                };
                defaultContent = 'Input Field';
                break;
            case 'divider':
                defaultStyle = {
                    width: '100%',
                    height: '1px',
                    backgroundColor: '#94a3b8',
                    margin: '20px 0',
                    border: 'none',
                    opacity: '0.4'
                };
                defaultContent = '';
                break;
            case 'text':
            default:
                defaultStyle = {
                    color: '#1e293b',
                    fontSize: '16px',
                    padding: '10px',
                    margin: '10px',
                    backgroundColor: 'transparent',
                    lineHeight: '1.5',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'center'
                };
                defaultContent = 'Edit this text';
                break;
        }

        defaultStyle = {
            ...defaultStyle,
            position: 'absolute',
            left: `${x}px`,
            top: `${y}px`
        };

        setComponents((prev) => [
            ...prev,
            { id: Date.now(), type: item.type, content: defaultContent, style: defaultStyle, link: '' },
        ]);
    };

    const addSectionToCanvas = (section) => {
        saveHistory();
        const lastComponent = components.length > 0 ? components[components.length - 1] : null;
        let startY = 0;

        if (lastComponent && lastComponent.style?.top) {
            // Find the bottom of the last component roughly
            const top = parseInt(lastComponent.style.top) || 0;
            const height = 200; // placeholder height
            startY = top + height + 50;
        }

        const newComponents = section.components.map((comp, idx) => ({
            ...comp,
            id: Date.now() + idx,
            style: {
                ...comp.style,
                position: 'relative', // Sections usually stack relatively
                margin: comp.style?.margin || '0 auto'
            }
        }));

        setComponents(prev => [...prev, ...newComponents]);
    };

    const [{ isOver }, drop] = useDrop(() => ({
        accept: [ItemTypes.SIDEBAR_ITEM, ItemTypes.CANVAS_ITEM],
        hover: (item, monitor) => {
            if (!canvasRef.current) return;
            const canvasRect = canvasRef.current.getBoundingClientRect();
            const clientOffset = monitor.getClientOffset();

            if (!clientOffset) return;

            const borderLeft = canvasRef.current.clientLeft || 0;
            const borderTop = canvasRef.current.clientTop || 0;

            let x, y;

            if (item.width && item.height) {
                x = clientOffset.x - canvasRect.left - borderLeft - (item.width / 2);
                y = clientOffset.y - canvasRect.top - borderTop - (item.height / 2);
            } else {
                x = clientOffset.x - canvasRect.left - borderLeft;
                y = clientOffset.y - canvasRect.top - borderTop;
            }

            const w = item.width || 0;
            const h = item.height || 0;
            const itemCenterX = x + w / 2;
            const itemCenterY = y + h / 2;

            const centerX = canvasRect.width / 2;
            const centerY = canvasRect.height / 2;

            const threshold = 15;
            let newGuideX = null;
            let newGuideY = null;

            if (Math.abs(itemCenterX - centerX) < threshold) {
                newGuideX = centerX;
            }
            if (Math.abs(itemCenterY - centerY) < threshold) {
                newGuideY = centerY;
            }

            setGuides(prev => {
                if (prev.x !== newGuideX || prev.y !== newGuideY) return { x: newGuideX, y: newGuideY };
                return prev;
            });
        },
        drop: (item, monitor) => {
            if (!canvasRef.current) return;
            const canvasRect = canvasRef.current.getBoundingClientRect();
            const clientOffset = monitor.getClientOffset();

            if (!clientOffset) return;

            let x, y;

            if (item.id) {
                // Existing item: Use delta
                const delta = monitor.getDifferenceFromInitialOffset();
                if (!delta) return;

                x = Math.round(item.originalLeft + delta.x);
                y = Math.round(item.originalTop + delta.y);
            } else {
                // New item: relative to canvas
                const borderLeft = canvasRef.current.clientLeft || 0;
                const borderTop = canvasRef.current.clientTop || 0;
                x = clientOffset.x - canvasRect.left - borderLeft;
                y = clientOffset.y - canvasRect.top - borderTop;

                // Center new items if possible
                /*
                if (item.type) {
                     // Approximate centering for new items if needed
                     // Not strictly necessary as they don't have dims yet usually
                }
                */
            }

            // Snap to center logic
            const centerX = canvasRect.width / 2;
            const centerY = canvasRect.height / 2;
            const w = item.width || 0;
            const h = item.height || 0;
            const threshold = 15;

            // Only snap if we have dimensions (mostly for existing items)
            if (w > 0 && h > 0) {
                if (Math.abs((x + w / 2) - centerX) < threshold) {
                    x = centerX - w / 2;
                }
                if (Math.abs((y + h / 2) - centerY) < threshold) {
                    y = centerY - h / 2;
                }
            }

            setGuides({ x: null, y: null });
            if (item.id) {
                moveComponent(item.id, x, y);
            } else {
                addComponentToCanvas(item, x, y);
            }
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }), [components]);

    const updateComponentContent = (id, newContent) => {
        saveHistory();
        setComponents((prev) =>
            prev.map((comp) => comp.id === id ? { ...comp, content: newContent } : comp)
        );
    };

    const updateComponentLink = (id, newLink) => {
        saveHistory();
        setComponents((prev) =>
            prev.map((comp) => comp.id === id ? { ...comp, link: newLink } : comp)
        );
    };

    const updateComponentStyle = (id, property, value) => {
        saveHistory();
        setComponents((prev) =>
            prev.map((comp) => {
                if (comp.id === id) {
                    return { ...comp, style: { ...comp.style, [property]: value } };
                }
                return comp;
            })
        );
    };

    const updateComponentStyles = useCallback((id, styles) => {
        saveHistory();
        setComponents((prev) =>
            prev.map((comp) => {
                if (comp.id === id) {
                    return { ...comp, style: { ...comp.style, ...styles } };
                }
                return comp;
            })
        );
    }, [saveHistory, setComponents]);

    useEffect(() => {
        if (previewMode) return;

        const handleKeyDown = (e) => {
            if (!selectedId) return;
            // Ignore if typing in an input
            if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;

            const component = components.find(c => c.id === selectedId);
            if (!component) return;

            const step = e.shiftKey ? 10 : 1;
            let newStyle = {};
            let moved = false;

            const getVal = (prop) => {
                const val = component.style[prop];
                if (val && typeof val === 'string' && val.endsWith('px')) {
                    return parseFloat(val);
                }
                const element = document.getElementById(`component-${selectedId}`);
                if (element && canvasRef.current) {
                    const rect = element.getBoundingClientRect();
                    const canvasRect = canvasRef.current.getBoundingClientRect();
                    const borderLeft = canvasRef.current.clientLeft || 0;
                    const borderTop = canvasRef.current.clientTop || 0;

                    if (prop === 'left') return rect.left - canvasRect.left - borderLeft + canvasRef.current.scrollLeft;
                    if (prop === 'top') return rect.top - canvasRect.top - borderTop + canvasRef.current.scrollTop;
                }
                return 0;
            };

            let currentLeft = getVal('left');
            let currentTop = getVal('top');

            switch (e.key) {
                case 'ArrowUp': newStyle.top = `${currentTop - step}px`; moved = true; break;
                case 'ArrowDown': newStyle.top = `${currentTop + step}px`; moved = true; break;
                case 'ArrowLeft': newStyle.left = `${currentLeft - step}px`; moved = true; break;
                case 'ArrowRight': newStyle.left = `${currentLeft + step}px`; moved = true; break;
                default: return;
            }

            if (moved) {
                e.preventDefault();
                if (component.style.position !== 'absolute') {
                    newStyle.position = 'absolute';
                    if (newStyle.left === undefined) newStyle.left = `${currentLeft}px`;
                    if (newStyle.top === undefined) newStyle.top = `${currentTop}px`;
                }
                updateComponentStyles(selectedId, newStyle);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedId, components, previewMode, updateComponentStyles]);

    const deleteComponent = (id) => {
        saveHistory();
        setComponents((prev) => prev.filter((comp) => comp.id !== id));
        setSelectedId(null); // Deselect after deleting
    };

    const clearCanvas = () => {
        saveHistory();
        setComponents([]);
        setSelectedId(null);
    };

    const loadTemplate = (template) => {
        if (components.length > 0) {
            if (!window.confirm('Loading a template will replace your current work. Are you sure?')) {
                return;
            }
        }
        saveHistory();
        // Deep copy to ensure new IDs don't conflict with old references if needed, though simple replacement works here
        // For templates, we currently replace the *current page* content
        setComponents(JSON.parse(JSON.stringify(template.components)));
        setShowTemplates(false);
    };

    const handleSaveAsTemplate = () => {
        if (components.length === 0) {
            alert('Canvas is empty. Add some components before saving as a template.');
            return;
        }
        setTempTemplateName('');
        setShowSaveModal(true);
    };

    const confirmSaveTemplate = async () => {
        if (!tempTemplateName.trim()) {
            alert('Please enter a template name.');
            return;
        }

        try {
            const res = await axios.post('http://localhost:5000/api/templates', {
                name: tempTemplateName,
                components
            });
            const savedTemplate = { ...res.data, id: res.data._id };
            setTemplates(prev => [...prev, savedTemplate]);
            setShowSaveModal(false);
            alert(`Template "${tempTemplateName}" saved successfully!`);
        } catch (error) {
            const errorMsg = error.response?.data?.msg || 'An unknown error occurred.';
            console.error('Error saving template:', error);
            alert(`Failed to save template: ${errorMsg}`);
        }
    };

    const handleExportHTML = () => {
        const page = pages.find(p => p.id === activePageId);
        if (!page) return;

        const generateComponentHTML = (comp) => {
            const style = { ...comp.style, position: 'absolute' };
            const styleStr = Object.entries(style)
                .map(([k, v]) => `${k.replace(/[A-Z]/g, m => "-" + m.toLowerCase())}:${v}`)
                .join('; ');

            switch (comp.type) {
                case 'heading':
                    return `<h2 style="${styleStr}">${comp.content}</h2>`;
                case 'text':
                    return `<p style="${styleStr}">${comp.content}</p>`;
                case 'button':
                    return `<button style="${styleStr}">${comp.content}</button>`;
                case 'image':
                    return `<img src="${comp.content}" style="${styleStr}" alt="User content" />`;
                case 'video':
                    return `<div style="${styleStr}"><video src="${comp.content}" style="width:100%;height:100%" controls></video></div>`;
                case 'divider':
                    return `<hr style="${styleStr}" />`;
                case 'input':
                    return `<input type="text" placeholder="${comp.content}" style="${styleStr}" />`;
                default:
                    return `<div style="${styleStr}">${comp.content}</div>`;
            }
        };

        const pageStyle = page.style || {};
        const bgStyleStr = Object.entries(pageStyle)
            .filter(([k]) => ['backgroundImage', 'backgroundSize', 'backgroundPosition', 'backgroundRepeat'].includes(k))
            .map(([k, v]) => {
                if (k === 'backgroundImage' && v) return `background-image: url('${v}')`;
                return `${k.replace(/[A-Z]/g, m => "-" + m.toLowerCase())}:${v}`;
            })
            .join('; ');

        const componentsHTML = page.components.map(generateComponentHTML).join('\n        ');

        const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${page.name}</title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Open+Sans:wght@400;700&family=Montserrat:wght@400;700&family=Playfair+Display:wght@700&family=Inter:wght@400;700&display=swap" rel="stylesheet">
    <style>
        body { margin: 0; padding: 0; font-family: 'Roboto', sans-serif; }
        .canvas { 
            position: relative; 
            width: 100%; 
            min-height: 100vh; 
            overflow-x: hidden; 
            ${bgStyleStr} 
        }
        * { box-sizing: border-box; }
    </style>
</head>
<body>
    <div class="canvas">
        ${componentsHTML}
    </div>
</body>
</html>`;

        const blob = new Blob([fullHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${page.name.toLowerCase()}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleExportJSON = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(pages, null, 2));
        const a = document.createElement('a');
        a.setAttribute("href", dataStr);
        a.setAttribute("download", "project.json");
        document.body.appendChild(a);
        a.click();
        a.remove();
    };

    const handleDeleteTemplate = async (e, templateId) => {
        e.stopPropagation();
        if (!window.confirm('Are you sure you want to delete this template?')) {
            return;
        }

        try {
            await axios.delete(`http://localhost:5000/api/templates/${templateId}`);
            setTemplates(prev => prev.filter(t => t._id !== templateId));
        } catch (error) {
            console.error('Error deleting template:', error);
            alert('Failed to delete template');
        }
    };

    const duplicateComponent = (id) => {
        saveHistory();
        const componentIndex = components.findIndex(c => c.id === id);
        if (componentIndex === -1) return;

        const componentToDuplicate = components[componentIndex];
        const newComponent = {
            ...JSON.parse(JSON.stringify(componentToDuplicate)), // Deep copy to avoid reference issues
            id: Date.now() // Assign a new unique ID
        };

        const newComponents = [...components];
        newComponents.splice(componentIndex + 1, 0, newComponent); // Insert after the original
        setComponents(newComponents);
    };

    const alignComponent = (alignment) => {
        saveHistory();
        if (!selectedId || !canvasRef.current) return;

        const canvasRect = canvasRef.current.getBoundingClientRect();
        const element = document.getElementById(`component-${selectedId}`);

        if (!element) return;

        const elementRect = element.getBoundingClientRect();

        let newStyles = { position: 'absolute' };

        switch (alignment) {
            case 'left':
                newStyles.left = '0px';
                break;
            case 'center':
                newStyles.left = `${(canvasRect.width - elementRect.width) / 2}px`;
                break;
            case 'right':
                newStyles.left = `${canvasRect.width - elementRect.width}px`;
                break;
            case 'top':
                newStyles.top = '0px';
                break;
            case 'middle':
                newStyles.top = `${(canvasRect.height - elementRect.height) / 2}px`;
                break;
            case 'bottom':
                newStyles.top = `${canvasRect.height - elementRect.height}px`;
                break;
            default:
                break;
        }

        updateComponentStyles(selectedId, newStyles);
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await axios.post('http://localhost:5000/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            updateComponentContent(selectedId, res.data.filePath);
        } catch (err) {
            console.error('Error uploading image:', err);
            alert('Failed to upload image');
        }
    };

    const handlePageBackgroundUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await axios.post('http://localhost:5000/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setBackgroundImage(res.data.filePath);
        } catch (err) {
            console.error('Error uploading image:', err);
            alert('Failed to upload image');
        }
    };

    const selectedComponent = components.find(c => c.id === selectedId);

    const setCanvasRef = useCallback((node) => {
        drop(node);
        canvasRef.current = node;
    }, [drop]);

    const pageContentStyle = {
        minHeight: '800px',
        position: 'relative',
        backgroundColor: isOver ? '#f0f9ff' : '#fff',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        padding: '20px',
        border: isOver ? '2px dashed #3498db' : (previewMode ? 'none' : '2px dashed #ccc'),
        backgroundImage: backgroundImage ? `url("${backgroundImage}")` : 'none',
        backgroundSize: backgroundSize,
        backgroundPosition: backgroundPosition,
        backgroundRepeat: backgroundRepeat,
    };

    return (
        <div className={styles['editor-container']}>
            <div className={styles['editor-header']}>
                <h3>Website Builder</h3>
                <div style={{ display: 'flex', gap: '10px' }}>
                    {!previewMode && (
                        <>
                            <button onClick={handleSaveAsTemplate} className={`${styles.btn} ${styles['btn-success']}`}>Save as Template</button>
                            <button onClick={() => setShowTemplates(true)} className={`${styles.btn} ${styles['btn-primary']}`}>Templates</button>
                            <button onClick={undo} disabled={history.length === 0} className={`${styles.btn} ${styles['btn-warning']}`}>Undo</button>
                            <button onClick={redo} disabled={future.length === 0} className={`${styles.btn} ${styles['btn-warning']}`}>Redo</button>
                            <button onClick={handleExportHTML} className={`${styles.btn} ${styles['btn-primary']}`}>Export HTML</button>
                            <button onClick={handleExportJSON} className={`${styles.btn} ${styles['btn-secondary']}`}>Export JSON</button>
                            <button onClick={clearCanvas} className={`${styles.btn} ${styles['btn-danger']}`}>Clear All</button>
                        </>
                    )}
                    {previewMode && (
                        <div className={styles['button-group']}>
                            <button onClick={() => setViewMode('desktop')} className={viewMode === 'desktop' ? styles.active : ''}>Desktop</button>
                            <button onClick={() => setViewMode('tablet')} className={viewMode === 'tablet' ? styles.active : ''}>Tablet</button>
                            <button onClick={() => setViewMode('mobile')} className={viewMode === 'mobile' ? styles.active : ''}>Mobile</button>
                        </div>
                    )}
                </div>
                <button
                    onClick={() => setPreviewMode(!previewMode)}
                    className={`${styles.btn} ${previewMode ? styles['btn-primary'] : styles['btn-success']}`}
                >
                    {previewMode ? 'Edit Mode' : 'Preview Mode'}
                </button>
            </div>

            <div className={`${styles['editor-layout']} ${previewMode ? styles.center : ''}`}>
                {/* Sidebar Tools */}
                {!previewMode && (
                    <div className={styles.sidebar}>
                        <h3>Tools</h3>
                        <div className={styles['sidebar-tools-grid']}>
                            <SidebarItem type="text" label="Text" icon="fas fa-font" />
                            <SidebarItem type="heading" label="Heading" icon="fas fa-heading" />
                            <SidebarItem type="image" label="Image" icon="fas fa-image" />
                            <SidebarItem type="video" label="Video" icon="fas fa-video" />
                            <SidebarItem type="button" label="Button" icon="fas fa-square" />
                            <SidebarItem type="input" label="Input" icon="fas fa-i-cursor" />
                            <SidebarItem type="divider" label="Divider" icon="fas fa-minus" />
                        </div>

                        <div style={{ marginTop: '20px', borderTop: '1px solid #34495e', paddingTop: '20px' }}>
                            <h3 style={{ marginBottom: '10px' }}>Sections</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
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
                        </div>

                        <div style={{ marginTop: '20px', borderTop: '1px solid #34495e', paddingTop: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                <h3 style={{ margin: 0 }}>Pages</h3>
                                <button onClick={addPage} className={`${styles.btn} ${styles['btn-success']} ${styles['btn-sm']}`}>+ Add</button>
                            </div>
                            <div className={styles['pages-list']}>
                                {pages.map(page => (
                                    <div
                                        key={page.id}
                                        onClick={() => switchPage(page.id)}
                                        className={`${styles['page-item']} ${activePageId === page.id ? styles.active : ''}`}
                                    >
                                        <span>{page.name}</span>
                                        {pages.length > 1 && (
                                            <span
                                                onClick={(e) => deletePage(e, page.id)}
                                                className={styles['delete-icon']}
                                                title="Delete Page"
                                            >
                                                ✕
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={{ marginTop: '20px', borderTop: '1px solid #334155', paddingTop: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                <h3 style={{ margin: 0 }}>Navigator</h3>
                            </div>
                            <div className={styles['pages-list']}>
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
                                                                    comp.type === 'divider' ? 'fas fa-minus' : 'fas fa-font'
                                            } style={{ marginRight: '8px', width: '15px' }}></i>
                                            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                {comp.content || comp.type}
                                            </span>
                                            <div style={{ marginLeft: 'auto', display: 'flex', gap: '5px' }}>
                                                <i className="fas fa-trash" onClick={(e) => { e.stopPropagation(); deleteComponent(comp.id); }} style={{ fontSize: '10px', cursor: 'pointer', opacity: 0.5 }}></i>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Workspace (Canvas) */}
                <div className={styles['canvas-wrapper']}>
                    {/* Floating Toolbar */}
                    {toolbarPos.visible && !previewMode && (
                        <div
                            className={styles['floating-toolbar']}
                            style={{ top: `${toolbarPos.top}px`, left: `${toolbarPos.left}px` }}
                        >
                            <button title="Duplicate" onClick={() => duplicateComponent(selectedId)}><i className="fas fa-copy"></i></button>
                            <button title="Delete" onClick={() => deleteComponent(selectedId)}><i className="fas fa-trash"></i></button>
                            <div className={styles.divider}></div>
                            <button title="Bring Forward" onClick={() => updateComponentStyles(selectedId, { zIndex: (parseInt(selectedComponent?.style?.zIndex) || 0) + 1 })}><i className="fas fa-layer-group"></i> +</button>
                            <button title="Send Backward" onClick={() => updateComponentStyles(selectedId, { zIndex: (parseInt(selectedComponent?.style?.zIndex) || 0) - 1 })}><i className="fas fa-layer-group"></i> -</button>
                        </div>
                    )}

                    <div
                        ref={setCanvasRef}
                        className={`${styles['page-content']} ${isOver ? styles['is-over'] : ''} ${previewMode ? styles['preview-mode'] : styles['edit-mode']} ${styles[viewMode]}`}
                        style={pageContentStyle}
                        onClick={() => !previewMode && setSelectedId(null)}
                    >
                        {/* Smart Guides */}
                        {guides.x !== null && (
                            <div style={{ position: 'absolute', left: `${guides.x}px`, top: 0, bottom: 0, width: '1px', backgroundColor: '#e74c3c', zIndex: 1000, pointerEvents: 'none' }} />
                        )}
                        {guides.y !== null && (
                            <div style={{ position: 'absolute', top: `${guides.y}px`, left: 0, right: 0, height: '1px', backgroundColor: '#e74c3c', zIndex: 1000, pointerEvents: 'none' }} />
                        )}

                        {!previewMode && <h2 style={{ textAlign: 'center', color: '#bdc3c7' }}>Drag and Drop Area</h2>}
                        {components.map((comp, index) => (
                            <CanvasItem
                                key={comp.id}
                                id={comp.id}
                                type={comp.type}
                                content={comp.content}
                                link={comp.link}
                                style={comp.style}
                                selected={selectedId === comp.id}
                                updateComponentStyles={updateComponentStyles}
                                onSelect={!previewMode ? setSelectedId : () => { }}
                                onDragStart={saveHistory}
                                previewMode={previewMode}
                            />
                        ))}
                    </div>
                </div>

                {/* Properties Panel */}
                {!previewMode && (
                    <div className={styles['properties-panel']}>
                        <h3>Properties</h3>
                        {selectedComponent ? (
                            <div style={{ marginTop: '20px' }}>

                                {selectedComponent.type === 'video' && (
                                    <div style={{ marginBottom: '15px' }}>
                                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Video URL (Embed)</label>
                                        <input type="text" value={selectedComponent.content} onChange={(e) => updateComponentContent(selectedComponent.id, e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                                    </div>
                                )}
                                <h3>Inspector</h3>

                                <div className={styles['prop-category']}>
                                    <div className={`${styles['prop-header']} ${openCategories.content ? styles.open : ''}`} onClick={() => toggleCategory('content')}>
                                        <span><i className="fas fa-edit"></i> CONTENT</span>
                                        <i className="fas fa-chevron-down"></i>
                                    </div>
                                    {openCategories.content && (
                                        <div className={styles['prop-content']}>
                                            <div className={styles['form-group']}>
                                                <label className={styles['form-label']}>{selectedComponent.type === 'input' ? 'Placeholder Text' : 'Content'}</label>
                                                <input
                                                    type="text"
                                                    value={selectedComponent.content}
                                                    onChange={(e) => updateComponentContent(selectedComponent.id, e.target.value)}
                                                    className={styles['form-control']}
                                                />
                                            </div>
                                            {(selectedComponent.type === 'text' || selectedComponent.type === 'heading' || selectedComponent.type === 'button' || selectedComponent.type === 'image') && (
                                                <div className={styles['form-group']}>
                                                    <label className={styles['form-label']}>Link URL</label>
                                                    <input
                                                        type="text"
                                                        value={selectedComponent.link || ''}
                                                        onChange={(e) => updateComponentLink(selectedComponent.id, e.target.value)}
                                                        placeholder="https://"
                                                        className={styles['form-control']}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className={styles['prop-category']}>
                                    <div className={`${styles['prop-header']} ${openCategories.typography ? styles.open : ''}`} onClick={() => toggleCategory('typography')}>
                                        <span><i className="fas fa-font"></i> TYPOGRAPHY</span>
                                        <i className="fas fa-chevron-down"></i>
                                    </div>
                                    {openCategories.typography && (
                                        <div className={styles['prop-content']}>
                                            <div className={styles['form-group']}>
                                                <label className={styles['form-label']}>Font Family</label>
                                                <select
                                                    value={selectedComponent.style?.fontFamily || 'Arial, sans-serif'}
                                                    onChange={(e) => updateComponentStyle(selectedComponent.id, 'fontFamily', e.target.value)}
                                                    className={styles['form-control']}
                                                >
                                                    {FONT_FAMILIES.map(font => (
                                                        <option key={font} value={font}>{font.split(',')[0].replace(/'/g, '')}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className={styles.flex} style={{ gap: '10px' }}>
                                                <div className={styles['form-group']} style={{ flex: 1 }}>
                                                    <label className={styles['form-label']}>Size</label>
                                                    <input type="number" value={parseInt(selectedComponent.style?.fontSize) || 16} onChange={(e) => updateComponentStyle(selectedComponent.id, 'fontSize', `${e.target.value}px`)} className={styles['form-control']} />
                                                </div>
                                                <div className={styles['form-group']} style={{ flex: 1 }}>
                                                    <label className={styles['form-label']}>Weight</label>
                                                    <select value={selectedComponent.style?.fontWeight || '400'} onChange={(e) => updateComponentStyle(selectedComponent.id, 'fontWeight', e.target.value)} className={styles['form-control']}>
                                                        <option value="300">Light</option>
                                                        <option value="400">Normal</option>
                                                        <option value="600">Semi</option>
                                                        <option value="700">Bold</option>
                                                        <option value="900">Black</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className={styles['form-group']}>
                                                <label className={styles['form-label']}>Text Color</label>
                                                <input type="color" value={selectedComponent.style?.color || '#000000'} onChange={(e) => updateComponentStyle(selectedComponent.id, 'color', e.target.value)} className={styles['form-control']} style={{ height: '40px' }} />
                                            </div>
                                            <div className={styles['button-group']} style={{ marginTop: '10px' }}>
                                                <button onClick={() => updateComponentStyle(selectedComponent.id, 'textAlign', 'left')} className={selectedComponent.style?.textAlign === 'left' ? styles.active : ''}><i className="fas fa-align-left"></i></button>
                                                <button onClick={() => updateComponentStyle(selectedComponent.id, 'textAlign', 'center')} className={selectedComponent.style?.textAlign === 'center' ? styles.active : ''}><i className="fas fa-align-center"></i></button>
                                                <button onClick={() => updateComponentStyle(selectedComponent.id, 'textAlign', 'right')} className={selectedComponent.style?.textAlign === 'right' ? styles.active : ''}><i className="fas fa-align-right"></i></button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className={styles['prop-category']}>
                                    <div className={`${styles['prop-header']} ${openCategories.layout ? styles.open : ''}`} onClick={() => toggleCategory('layout')}>
                                        <span><i className="fas fa-th-large"></i> LAYOUT</span>
                                        <i className="fas fa-chevron-down"></i>
                                    </div>
                                    {openCategories.layout && (
                                        <div className={styles['prop-content']}>
                                            <div className={styles.flex} style={{ gap: '10px' }}>
                                                <div className={styles['form-group']} style={{ flex: 1 }}>
                                                    <label className={styles['form-label']}>Padding</label>
                                                    <input type="number" value={parseInt(selectedComponent.style?.padding) || 0} onChange={(e) => updateComponentStyle(selectedComponent.id, 'padding', `${e.target.value}px`)} className={styles['form-control']} />
                                                </div>
                                                <div className={styles['form-group']} style={{ flex: 1 }}>
                                                    <label className={styles['form-label']}>Margin</label>
                                                    <input type="number" value={parseInt(selectedComponent.style?.margin) || 0} onChange={(e) => updateComponentStyle(selectedComponent.id, 'margin', `${e.target.value}px`)} className={styles['form-control']} />
                                                </div>
                                            </div>
                                            <label className={styles['form-label']}>Quick Align</label>
                                            <div className={`${styles.flex} ${styles['justify-between']} ${styles['mb-5']}`} style={{ gap: '4px' }}>
                                                <button onClick={() => alignComponent('left')} className={`${styles.btn} ${styles['btn-secondary']} ${styles['btn-sm']}`} style={{ flex: 1 }} title="Left"><i className="fas fa-arrow-left"></i></button>
                                                <button onClick={() => alignComponent('center')} className={`${styles.btn} ${styles['btn-secondary']} ${styles['btn-sm']}`} style={{ flex: 1 }} title="Center"><i className="fas fa-arrows-alt-h"></i></button>
                                                <button onClick={() => alignComponent('right')} className={`${styles.btn} ${styles['btn-secondary']} ${styles['btn-sm']}`} style={{ flex: 1 }} title="Right"><i className="fas fa-arrow-right"></i></button>
                                            </div>
                                            <div className={`${styles.flex} ${styles['justify-between']}`} style={{ gap: '4px' }}>
                                                <button onClick={() => alignComponent('top')} className={`${styles.btn} ${styles['btn-secondary']} ${styles['btn-sm']}`} style={{ flex: 1 }} title="Top"><i className="fas fa-arrow-up"></i></button>
                                                <button onClick={() => alignComponent('middle')} className={`${styles.btn} ${styles['btn-secondary']} ${styles['btn-sm']}`} style={{ flex: 1 }} title="Middle"><i className="fas fa-arrows-alt-v"></i></button>
                                                <button onClick={() => alignComponent('bottom')} className={`${styles.btn} ${styles['btn-secondary']} ${styles['btn-sm']}`} style={{ flex: 1 }} title="Bottom"><i className="fas fa-arrow-down"></i></button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className={styles['prop-category']}>
                                    <div className={`${styles['prop-header']} ${openCategories.borders ? styles.open : ''}`} onClick={() => toggleCategory('borders')}>
                                        <span><i className="fas fa-border-all"></i> BORDERS</span>
                                        <i className="fas fa-chevron-down"></i>
                                    </div>
                                    {openCategories.borders && (
                                        <div className={styles['prop-content']}>
                                            <div className={styles['form-group']}>
                                                <label className={styles['form-label']}>Radius</label>
                                                <input type="number" value={parseInt(selectedComponent.style?.borderRadius) || 0} onChange={(e) => updateComponentStyle(selectedComponent.id, 'borderRadius', `${e.target.value}px`)} className={styles['form-control']} />
                                            </div>
                                            <div className={styles.flex} style={{ gap: '10px' }}>
                                                <div className={styles['form-group']} style={{ flex: 1 }}>
                                                    <label className={styles['form-label']}>Width</label>
                                                    <input type="number" value={parseInt(selectedComponent.style?.borderWidth) || 0} onChange={(e) => updateComponentStyle(selectedComponent.id, 'borderWidth', `${e.target.value}px`)} className={styles['form-control']} />
                                                </div>
                                                <div className={styles['form-group']} style={{ flex: 1 }}>
                                                    <label className={styles['form-label']}>Style</label>
                                                    <select value={selectedComponent.style?.borderStyle || 'solid'} onChange={(e) => updateComponentStyle(selectedComponent.id, 'borderStyle', e.target.value)} className={styles['form-control']}>
                                                        <option value="solid">Solid</option>
                                                        <option value="dashed">Dashed</option>
                                                        <option value="dotted">Dotted</option>
                                                        <option value="none">None</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className={styles['form-group']}>
                                                <label className={styles['form-label']}>Border Color</label>
                                                <input type="color" value={selectedComponent.style?.borderColor || '#000000'} onChange={(e) => updateComponentStyle(selectedComponent.id, 'borderColor', e.target.value)} className={styles['form-control']} style={{ height: '40px' }} />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className={styles['prop-category']}>
                                    <div className={`${styles['prop-header']} ${openCategories.effects ? styles.open : ''}`} onClick={() => toggleCategory('effects')}>
                                        <span><i className="fas fa-wand-magic-sparkles"></i> EFFECTS</span>
                                        <i className="fas fa-chevron-down"></i>
                                    </div>
                                    {openCategories.effects && (
                                        <div className={styles['prop-content']}>
                                            <div className={styles['form-group']}>
                                                <label className={styles['form-label']}>Box Shadow</label>
                                                <select
                                                    value={selectedComponent.style?.boxShadow || 'none'}
                                                    onChange={(e) => updateComponentStyle(selectedComponent.id, 'boxShadow', e.target.value)}
                                                    className={styles['form-control']}
                                                >
                                                    <option value="none">None</option>
                                                    <option value="0px 2px 5px rgba(0,0,0,0.1)">Soft</option>
                                                    <option value="0px 4px 10px rgba(0,0,0,0.15)">Medium</option>
                                                    <option value="0px 10px 20px rgba(0,0,0,0.2)">Strong</option>
                                                    <option value="inset 0px 4px 10px rgba(0,0,0,0.1)">Inset Shadow</option>
                                                </select>
                                            </div>
                                            <div className={styles['form-group']}>
                                                <label className={styles['form-label']}>Opacity ({Math.round((selectedComponent.style?.opacity || 1) * 100)}%)</label>
                                                <input type="range" min="0" max="1" step="0.1" value={selectedComponent.style?.opacity !== undefined ? selectedComponent.style.opacity : 1} onChange={(e) => updateComponentStyle(selectedComponent.id, 'opacity', parseFloat(e.target.value))} className={styles['w-100']} />
                                            </div>
                                            <div className={styles['form-group']}>
                                                <label className={styles['form-label']}>Z-Index</label>
                                                <input type="number" value={selectedComponent.style?.zIndex || 0} onChange={(e) => updateComponentStyle(selectedComponent.id, 'zIndex', parseInt(e.target.value))} className={styles['form-control']} />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <button
                                    onClick={() => deleteComponent(selectedId)}
                                    className={`${styles.btn} ${styles['btn-danger']} ${styles['w-100']} ${styles['mt-20']}`}
                                >
                                    <i className="fas fa-trash"></i> Delete Component
                                </button>
                            </div>
                        ) : (
                            <div className={styles['mt-20']}>
                                <h4>Page Settings</h4>
                                <label className={`${styles['d-block']} ${styles['mb-5']} ${styles['fw-bold']}`}>Background Image</label>
                                <div className={styles['mb-10']}>
                                    <input type="file" accept="image/*" onChange={handlePageBackgroundUpload} className={styles['w-100']} />
                                </div>
                                <label className={`${styles['d-block']} ${styles['mb-5']} ${styles['fw-bold']}`}>Or Image URL</label>
                                <input
                                    type="text"
                                    value={backgroundImage}
                                    onChange={(e) => setBackgroundImage(e.target.value)}
                                    placeholder="https://"
                                    className={styles['form-control']}
                                />
                                {backgroundImage && (
                                    <>
                                        <button onClick={() => setBackgroundImage('')} className={`${styles.btn} ${styles['btn-danger']} ${styles['w-100']} ${styles['mt-10']} ${styles['mb-15']}`}>Remove Background</button>

                                        <label className={`${styles['d-block']} ${styles['mb-5']} ${styles['fw-bold']}`}>Background Size</label>
                                        <select
                                            value={backgroundSize}
                                            onChange={(e) => setBackgroundSize(e.target.value)}
                                            className={`${styles['form-control']} ${styles['mb-10']}`}
                                        >
                                            <option value="cover">Cover (Fill)</option>
                                            <option value="contain">Contain (Fit)</option>
                                            <option value="auto">Auto (Original Size)</option>
                                            <option value="100% 100%">Stretch (100% 100%)</option>
                                        </select>

                                        <label className={`${styles['d-block']} ${styles['mb-5']} ${styles['fw-bold']}`}>Background Position</label>
                                        <select
                                            value={backgroundPosition}
                                            onChange={(e) => setBackgroundPosition(e.target.value)}
                                            className={`${styles['form-control']} ${styles['mb-10']}`}
                                        >
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

                                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Background Repeat</label>
                                        <select
                                            value={backgroundRepeat}
                                            onChange={(e) => setBackgroundRepeat(e.target.value)}
                                            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '10px' }}
                                        >
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
                )}
            </div>

            {/* Save Template Modal */}
            {showSaveModal && (
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
                            <button
                                onClick={confirmSaveTemplate}
                                className={`${styles.btn} ${styles['btn-primary']} ${styles['w-100']}`}
                            >
                                Save Template
                            </button>
                            <button
                                onClick={() => setShowSaveModal(false)}
                                className={`${styles.btn} ${styles['btn-secondary']} ${styles['w-100']}`}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Templates Modal */}
            {showTemplates && (
                <div className={styles['modal-overlay']}>
                    <div className={styles['modal-content']}>
                        <h3>Choose a Template</h3>
                        <div className={styles['template-grid']}>
                            {templates.map(template => (
                                <div key={template.id} className={styles['template-item']}>
                                    <button
                                        onClick={() => loadTemplate(template)}
                                        className={styles['template-btn']}
                                    >
                                        {template.name}
                                    </button>
                                    {template._id && (
                                        <button
                                            onClick={(e) => handleDeleteTemplate(e, template._id)}
                                            className={styles['delete-btn']}
                                            title="Delete Template"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => setShowTemplates(false)}
                            className={`${styles.btn} ${styles['btn-secondary']} ${styles['w-100']} ${styles['mt-20']}`}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Editor;