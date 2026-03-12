import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useDrop } from 'react-dnd';
import axios from 'axios';

import SidebarItem from './SidebarItem';
import CanvasItem from './CanvasItem';
import styles from './Editor.module.css';
import { PREBUILT_SECTIONS } from '../../data/templates';
import TemplateGallery from '../TemplateGallery/TemplateGallery';

const ItemTypes = {
    SIDEBAR_ITEM: 'sidebarItem',
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



// ===== UserMenu Sub-component =====
const UserMenu = () => {
    const { user, logout } = useAuth();
    const [open, setOpen] = React.useState(false);

    if (!user) return null;

    const initials = user.name
        ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
        : '??';

    return (
        <div style={{ position: 'relative' }}>
            <button
                id="user-menu-btn"
                title={user.name}
                onClick={() => setOpen(o => !o)}
                style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    background: 'rgba(255, 255, 255, 0.7)', border: '1px solid rgba(226, 232, 240, 0.8)',
                    borderRadius: '12px', padding: '6px 12px', cursor: 'pointer',
                    color: '#0f172a', fontSize: '0.875rem', fontWeight: '600',
                    transition: 'all 0.2s', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.01)'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.7)'}
            >
                <span style={{
                    width: '32px', height: '32px', borderRadius: '10px',
                    background: 'linear-gradient(135deg, #6366f1, #ec4899)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.85rem', fontWeight: '700', color: '#fff', flexShrink: 0,
                    boxShadow: '0 4px 8px rgba(99, 102, 241, 0.2)'
                }}>{initials}</span>
                <span style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.name}</span>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5"
                    style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', opacity: 0.5 }}>
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>

            {open && (
                <>
                    {/* Backdrop */}
                    <div onClick={() => setOpen(false)}
                        style={{ position: 'fixed', inset: 0, zIndex: 999 }} />
                    {/* Dropdown */}
                    <div style={{
                        position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                        background: 'rgba(255, 255, 255, 0.95)', border: '1px solid rgba(226, 232, 240, 1)',
                        backdropFilter: 'blur(16px)',
                        borderRadius: '16px', padding: '8px', minWidth: '180px',
                        boxShadow: '0 12px 30px -10px rgba(0,0,0,0.1)', zIndex: 1000,
                        animation: 'menuIn 0.15s ease'
                    }}>
                        <style>{`@keyframes menuIn { from { opacity:0; transform:translateY(-6px) } to { opacity:1; transform:translateY(0) } }`}</style>
                        <div style={{ padding: '8px 12px 10px', borderBottom: '1px solid rgba(226, 232, 240, 0.8)', marginBottom: '6px' }}>
                            <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#0f172a' }}>{user.name}</div>
                            <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '2px' }}>{user.email}</div>
                        </div>
                        <button
                            id="logout-btn"
                            onClick={() => { logout(); setOpen(false); }}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '8px', width: '100%',
                                padding: '8px 12px', background: 'transparent', border: 'none',
                                borderRadius: '10px', cursor: 'pointer', color: '#ef4444',
                                fontSize: '0.87rem', fontWeight: '600', transition: 'background 0.15s'
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(254, 226, 226, 0.8)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                                <polyline points="16 17 21 12 16 7"/>
                                <line x1="21" y1="12" x2="9" y2="12"/>
                            </svg>
                            Sign Out
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};
// ==================================

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
    const [showGallery, setShowGallery] = useState(false);
    const [showPropertiesPanel, setShowPropertiesPanel] = useState(true);
    const [openCategories, setOpenCategories] = useState({
        content: true,
        layout: true,
        flexbox: false,
        typography: true,
        borders: false,
        effects: false
    });
    const [openToolCategories, setOpenToolCategories] = useState({
        layout: true,
        basic: true,
        media: false,
        sections: false,
        pages: true,
        navigator: true
    });
    const [toolbarPos, setToolbarPos] = useState({ top: 0, left: 0, visible: false });
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [tempTemplateName, setTempTemplateName] = useState('');
    const [activeState, setActiveState] = useState('normal'); // 'normal', 'hover', 'active'

    const toggleCategory = (cat) => {
        setOpenCategories(prev => ({ ...prev, [cat]: !prev[cat] }));
    };

    const toggleToolCategory = (cat) => {
        setOpenToolCategories(prev => ({ ...prev, [cat]: !prev[cat] }));
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

    // Show gallery on first load after project is loaded and canvas is empty
    useEffect(() => {
        if (!isLoaded) return;
        const activePage = pages.find(p => p.id === activePageId) || pages[0];
        if (!activePage || activePage.components.length === 0) {
            setShowGallery(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoaded]);

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
                    display: 'block'
                };
                defaultContent = '';
                break;
            case 'section':
                defaultStyle = {
                    width: '100%',
                    height: '300px',
                    backgroundColor: '#f8fafc',
                    padding: '60px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px dashed #cbd5e1',
                    position: 'relative'
                };
                defaultContent = 'Full Width Section';
                break;
            case 'div':
                defaultStyle = {
                    width: '200px',
                    height: '200px',
                    backgroundColor: '#e2e8f0',
                    display: 'block',
                    borderRadius: '8px',
                    border: '1px dashed #94a3b8',
                    position: 'relative'
                };
                defaultContent = '';
                break;
            case 'text':
                defaultStyle = {
                    color: '#475569',
                    fontSize: '16px',
                    lineHeight: '1.6',
                    padding: '10px',
                    margin: '10px',
                    textAlign: 'left',
                    fontFamily: 'Roboto, sans-serif',
                    width: 'auto'
                };
                defaultContent = 'This is a text paragraph. You can edit this directly.';
                break;
            case 'form':
                defaultStyle = {
                    width: '350px',
                    height: 'auto',
                };
                defaultContent = 'Contact Us';
                break;
            case 'map':
                defaultStyle = {
                    width: '100%',
                    height: '300px',
                };
                defaultContent = 'New York, NY';
                break;
            case 'audio':
                defaultStyle = {
                    width: '300px',
                    height: '60px',
                };
                defaultContent = '';
                break;
            case 'iframe':
                defaultStyle = {
                    width: '100%',
                    height: '250px',
                };
                defaultContent = '<p style="text-align: center; color: #94a3b8; padding: 20px;">Embed Code Here</p>';
                break;
            case 'slider':
                defaultStyle = {
                    width: '100%',
                    height: '300px',
                    backgroundColor: '#e2e8f0',
                    borderRadius: '12px'
                };
                defaultContent = 'Slider Component';
                break;
            case 'icon':
                defaultStyle = {
                    width: '50px',
                    height: '50px',
                    color: '#6366f1',
                    fontSize: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                };
                defaultContent = 'fas fa-star';
                break;
            case 'navbar':
                defaultStyle = {
                    width: '100%',
                    height: '60px',
                    backgroundColor: '#ffffff',
                    borderBottom: '1px solid #e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 20px',
                    position: 'absolute',
                    top: '0',
                    left: '0'
                };
                defaultContent = 'Navbar';
                break;
            case 'grid':
                defaultStyle = {
                    width: '100%',
                    height: '300px',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '20px',
                    padding: '20px',
                    backgroundColor: '#f8fafc',
                    border: '1px dashed #cbd5e1'
                };
                defaultContent = 'Grid Section';
                break;
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

        // Ensure absolute positioning for all new dropped elements
        defaultStyle = {
            ...defaultStyle,
            position: 'absolute',
            left: `${x}px`,
            top: `${y}px`,
            zIndex: 1
        };

        const responsiveStyles = {
            tablet: {},
            mobile: {}
        };
        const states = {
            hover: {},
            active: {}
        };

        setComponents((prev) => [
            ...prev,
            {
                id: Date.now(),
                type: item.type,
                content: defaultContent,
                style: defaultStyle,
                responsiveStyles,
                states,
                link: ''
            },
        ]);
    };

    const addSectionToCanvas = (section) => {
        saveHistory();
        const lastComponent = components.length > 0 ? components[components.length - 1] : null;

        if (lastComponent && lastComponent.style?.top) {
            // Find the bottom of the last component roughly
        }

        const newComponents = section.components.map((comp, idx) => ({
            ...comp,
            id: Date.now() + idx,
            style: {
                ...comp.style,
                position: comp.style?.position || 'relative',
                margin: comp.style?.margin || '0 auto'
            }
        }));

        setComponents(prev => [...prev, ...newComponents]);
    };

    const [{ isOver }, drop] = useDrop(() => ({
        accept: [ItemTypes.SIDEBAR_ITEM],
        hover: (item, monitor) => {
            if (!canvasRef.current) return;
            const canvasRect = canvasRef.current.getBoundingClientRect();
            const clientOffset = monitor.getClientOffset();
            if (!clientOffset) return;

            const x = clientOffset.x - canvasRect.left;
            const centerX = canvasRect.width / 2;
            const threshold = 15;

            setGuides(prev => {
                const newGuideX = Math.abs(x - centerX) < threshold ? centerX : null;
                if (prev.x !== newGuideX) return { x: newGuideX, y: null };
                return prev;
            });
        },
        drop: (item, monitor) => {
            if (!canvasRef.current) return;
            const canvasRect = canvasRef.current.getBoundingClientRect();
            const clientOffset = monitor.getClientOffset();
            if (!clientOffset) return;

            const scrollLeft = canvasRef.current.scrollLeft || 0;
            const scrollTop = canvasRef.current.scrollTop || 0;
            const borderLeft = canvasRef.current.clientLeft || 0;
            const borderTop = canvasRef.current.clientTop || 0;

            let x = (clientOffset.x - canvasRect.left - borderLeft) + scrollLeft;
            let y = (clientOffset.y - canvasRect.top - borderTop) + scrollTop;

            // Grid Snapping (10px)
            const gridSize = 10;
            x = Math.round(x / gridSize) * gridSize;
            y = Math.round(y / gridSize) * gridSize;

            // Boundaries
            x = Math.max(0, x);
            y = Math.max(0, y);

            setGuides({ x: null, y: null });
            addComponentToCanvas(item, x, y);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }), [components]);
    const reorderComponent = (id, direction) => {
        saveHistory();
        setComponents((prev) => {
            const index = prev.findIndex(c => c.id === id);
            if (index === -1) return prev;
            const newArray = [...prev];
            const targetIndex = direction === 'up' ? index + 1 : index - 1;
            if (targetIndex < 0 || targetIndex >= newArray.length) return prev;

            const temp = newArray[index];
            newArray[index] = newArray[targetIndex];
            newArray[targetIndex] = temp;
            return newArray;
        });
    };

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
                    if (activeState !== 'normal') {
                        const newStates = {
                            ...comp.states,
                            [activeState]: { ...(comp.states?.[activeState] || {}), [property]: value }
                        };
                        return { ...comp, states: newStates };
                    }
                    if (viewMode !== 'desktop') {
                        const newResponsive = {
                            ...comp.responsiveStyles,
                            [viewMode]: { ...(comp.responsiveStyles?.[viewMode] || {}), [property]: value }
                        };
                        return { ...comp, responsiveStyles: newResponsive };
                    }
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
                    if (activeState !== 'normal') {
                        const newStates = {
                            ...comp.states,
                            [activeState]: { ...(comp.states?.[activeState] || {}), ...styles }
                        };
                        return { ...comp, states: newStates };
                    }
                    if (viewMode !== 'desktop') {
                        const newResponsive = {
                            ...comp.responsiveStyles,
                            [viewMode]: { ...(comp.responsiveStyles?.[viewMode] || {}), ...styles }
                        };
                        return { ...comp, responsiveStyles: newResponsive };
                    }
                    return { ...comp, style: { ...comp.style, ...styles } };
                }
                return comp;
            })
        );
    }, [saveHistory, setComponents, viewMode, activeState]);

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
        if (!template) {
            setShowGallery(false);
            return;
        }
        if (components.length > 0) {
            if (!window.confirm('Loading a template will replace your current work. Are you sure?')) {
                return;
            }
        }
        saveHistory();
        
        // Hybrid Logic: Preserve 'absolute' if coordinates exist, otherwise allow 'relative' for sections
        const normalized = JSON.parse(JSON.stringify(template.components)).map((comp, idx) => {
            const hasCoords = comp.style?.left !== undefined && comp.style?.top !== undefined;

            return {
                ...comp,
                id: Date.now() + idx,
                style: {
                    ...comp.style,
                    // If it has coords, it's a Wix-style absolute element. 
                    // If not (like pre-built sections), it's a Webflow-style relative element.
                    position: comp.style?.position || (hasCoords ? 'absolute' : 'relative'),
                    margin: comp.style?.margin || (hasCoords ? '0' : '0 auto'),
                },
                responsiveStyles: comp.responsiveStyles || { tablet: {}, mobile: {} },
                states: comp.states || { hover: {}, active: {} },
                link: comp.link || '',
            };
        });
        setComponents(normalized);
        setShowGallery(false);
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
            await axios.post('http://localhost:5000/api/templates', {
                name: tempTemplateName,
                components
            });
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

        const toCss = (style) => {
            if (!style) return '';
            return Object.entries(style)
                .map(([k, v]) => `${k.replace(/[A-Z]/g, m => "-" + m.toLowerCase())}:${v}`)
                .join('; ');
        };

        let stylesBlock = '';
        let tabletStylesBlock = '';
        let mobileStylesBlock = '';

        const generateComponentHTML = (comp, idx) => {
            const id = `el-${idx}`;

            // Hybrid Export: Respect the component's position (absolute or relative)
            const exportStyle = { ...comp.style };
            if (!exportStyle.position) {
                exportStyle.position = (comp.style?.left !== undefined && comp.style?.top !== undefined) ? 'absolute' : 'relative';
            }

            stylesBlock += `#${id} { ${toCss(exportStyle)} }\n`;

            // States
            if (comp.states?.hover) stylesBlock += `#${id}:hover { ${toCss(comp.states.hover)} }\n`;
            if (comp.states?.active) stylesBlock += `#${id}:active { ${toCss(comp.states.active)} }\n`;

            // Responsive
            if (comp.responsiveStyles?.tablet) tabletStylesBlock += `#${id} { ${toCss(comp.responsiveStyles.tablet)} }\n`;
            if (comp.responsiveStyles?.mobile) mobileStylesBlock += `#${id} { ${toCss(comp.responsiveStyles.mobile)} }\n`;

            const content = comp.content || '';
            const tag = comp.type === 'heading' ? 'h2' : (comp.type === 'text' ? 'p' : (comp.type === 'button' ? 'button' : 'div'));

            let elementHTML = '';
            if (comp.type === 'image') {
                elementHTML = `<img id="${id}" src="${content}" alt="User content" />`;
            } else if (comp.type === 'video') {
                elementHTML = `<div id="${id}"><iframe src="${content.replace('watch?v=', 'embed/')}" style="width:100%;height:100%" frameborder="0" allowfullscreen></iframe></div>`;
            } else if (comp.type === 'divider') {
                elementHTML = `<hr id="${id}" />`;
            } else if (comp.type === 'input') {
                elementHTML = `<input id="${id}" type="text" placeholder="${content}" />`;
            } else {
                elementHTML = `<${tag} id="${id}">${content}</${tag}>`;
            }

            if (comp.link) {
                return `<a href="${comp.link}" style="text-decoration:none">${elementHTML}</a>`;
            }
            return elementHTML;
        };

        const pageStyle = page.style || {};
        const bgStyleStr = Object.entries(pageStyle)
            .filter(([k]) => ['backgroundImage', 'backgroundSize', 'backgroundPosition', 'backgroundRepeat', 'background'].includes(k))
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
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        body { margin: 0; padding: 0; font-family: 'Roboto', sans-serif; overflow-x: hidden; }
        .canvas { 
            position: relative; 
            width: 100%; 
            min-height: 100vh; 
            ${bgStyleStr} 
        }
        * { box-sizing: border-box; }
        
        /* Base Component Styles */
        ${stylesBlock}
        
        /* Tablet Breakpoint (768px) */
        @media (max-width: 768px) {
            ${tabletStylesBlock}
        }
        
        /* Mobile Breakpoint (480px) */
        @media (max-width: 480px) {
            ${mobileStylesBlock}
        }
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
        position: 'relative',
        backgroundImage: backgroundImage ? `url("${backgroundImage}")` : 'none',
        backgroundSize: backgroundSize,
        backgroundPosition: backgroundPosition,
        backgroundRepeat: backgroundRepeat,
        background: activePage?.style?.background || '#fff'
    };

    return (
        <div className={styles['editor-container']}>
            <div className={styles['editor-header']}>
                <h3>TWB — Template Website Builder</h3>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    {!previewMode && (
                        <>
                            <button onClick={handleSaveAsTemplate} className={`${styles.btn} ${styles['btn-success']}`}>Save as Template</button>
                            <button onClick={() => setShowGallery(true)} className={`${styles.btn} ${styles['btn-primary']}`}><i className="fas fa-layer-group" style={{ marginRight: '6px' }} />Templates</button>
                            <button onClick={undo} disabled={history.length === 0} className={`${styles.btn} ${styles['btn-warning']}`}>Undo</button>
                            <button onClick={redo} disabled={future.length === 0} className={`${styles.btn} ${styles['btn-warning']}`}>Redo</button>
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
                    {/* User info + Logout */}
                    <UserMenu />
                </div>
            </div>

            <div className={`${styles['editor-layout']} ${previewMode ? styles.center : ''}`}>
                {/* Sidebar Tools */}
                {!previewMode && (
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
                                    <i className="fas fa-plus" onClick={(e) => { e.stopPropagation(); addPage(); }} style={{ fontSize: '12px', padding: '4px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '4px', cursor: 'pointer' }}></i>
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
                        {components.map((comp, index) => (
                            <CanvasItem
                                key={comp.id}
                                id={comp.id}
                                type={comp.type}
                                content={comp.content}
                                link={comp.link}
                                style={comp.style}
                                responsiveStyles={comp.responsiveStyles}
                                states={comp.states}
                                selected={selectedId === comp.id}
                                updateComponentStyles={updateComponentStyles}
                                updateComponentContent={updateComponentContent}
                                onSelect={!previewMode ? setSelectedId : () => { }}
                                onDragStart={saveHistory}
                                onMove={moveComponent}
                                previewMode={previewMode}
                                viewMode={viewMode}
                            />
                        ))}
                    </div>
                </div>

                {/* Properties Panel */}
                {!previewMode && showPropertiesPanel && (
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
                                <div className={styles['form-group']} style={{ marginBottom: '24px' }}>
                                    <label className={styles['form-label']}>EDITING STATE</label>
                                    <div className={styles['view-mode-toggle']}>
                                        <button onClick={() => setActiveState('normal')} className={activeState === 'normal' ? styles.active : ''}>Normal</button>
                                        <button onClick={() => setActiveState('hover')} className={activeState === 'hover' ? styles.active : ''}>Hover</button>
                                        <button onClick={() => setActiveState('active')} className={activeState === 'active' ? styles.active : ''}>Active</button>
                                    </div>
                                    {activeState !== 'normal' && (
                                        <div style={{ fontSize: '0.75rem', color: '#818cf8', marginTop: '8px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <i className="fas fa-info-circle"></i> Mode: {activeState.toUpperCase()}
                                        </div>
                                    )}
                                </div>
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
                                            <div className={styles.flex} style={{ gap: '10px' }}>
                                                <div className={styles['form-group']} style={{ flex: 1 }}>
                                                    <label className={styles['form-label']}>Line H</label>
                                                    <input type="number" step="0.1" value={parseFloat(selectedComponent.style?.lineHeight) || 1.5} onChange={(e) => updateComponentStyle(selectedComponent.id, 'lineHeight', e.target.value)} className={styles['form-control']} />
                                                </div>
                                                <div className={styles['form-group']} style={{ flex: 1 }}>
                                                    <label className={styles['form-label']}>Spacing</label>
                                                    <input type="number" step="1" value={parseInt(selectedComponent.style?.letterSpacing) || 0} onChange={(e) => updateComponentStyle(selectedComponent.id, 'letterSpacing', `${e.target.value}px`)} className={styles['form-control']} />
                                                </div>
                                            </div>
                                            <div className={styles['form-group']}>
                                                <label className={styles['form-label']}>Transform</label>
                                                <div className={styles['button-group']}>
                                                    <button onClick={() => updateComponentStyle(selectedComponent.id, 'textTransform', 'none')} className={selectedComponent.style?.textTransform === 'none' || !selectedComponent.style?.textTransform ? styles.active : ''}>None</button>
                                                    <button onClick={() => updateComponentStyle(selectedComponent.id, 'textTransform', 'uppercase')} className={selectedComponent.style?.textTransform === 'uppercase' ? styles.active : ''}>ABC</button>
                                                    <button onClick={() => updateComponentStyle(selectedComponent.id, 'textTransform', 'capitalize')} className={selectedComponent.style?.textTransform === 'capitalize' ? styles.active : ''}>Abc</button>
                                                    <button onClick={() => updateComponentStyle(selectedComponent.id, 'textTransform', 'lowercase')} className={selectedComponent.style?.textTransform === 'lowercase' ? styles.active : ''}>abc</button>
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
                                    <div className={`${styles['prop-header']} ${openCategories.size ? styles.open : ''}`} onClick={() => toggleCategory('size')}>
                                        <span><i className="fas fa-expand-arrows-alt"></i> SIZE & DIMENSIONS</span>
                                        <i className="fas fa-chevron-down"></i>
                                    </div>
                                    {openCategories.size && (
                                        <div className={styles['prop-content']}>
                                            <div className={styles.flex} style={{ gap: '10px' }}>
                                                <div className={styles['form-group']} style={{ flex: 1 }}>
                                                    <label className={styles['form-label']}>Width</label>
                                                    <div style={{ display: 'flex', gap: '4px' }}>
                                                        <input
                                                            type="text"
                                                            value={selectedComponent.style?.width || 'auto'}
                                                            onChange={(e) => updateComponentStyle(selectedComponent.id, 'width', e.target.value)}
                                                            className={styles['form-control']}
                                                            style={{ flex: 2 }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className={styles['form-group']} style={{ flex: 1 }}>
                                                    <label className={styles['form-label']}>Height</label>
                                                    <div style={{ display: 'flex', gap: '4px' }}>
                                                        <input
                                                            type="text"
                                                            value={selectedComponent.style?.height || 'auto'}
                                                            onChange={(e) => updateComponentStyle(selectedComponent.id, 'height', e.target.value)}
                                                            className={styles['form-control']}
                                                            style={{ flex: 2 }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles.flex} style={{ gap: '10px' }}>
                                                <div className={styles['form-group']} style={{ flex: 1 }}>
                                                    <label className={styles['form-label']}>Min W</label>
                                                    <input type="text" placeholder="auto" value={selectedComponent.style?.minWidth || ''} onChange={(e) => updateComponentStyle(selectedComponent.id, 'minWidth', e.target.value)} className={styles['form-control']} />
                                                </div>
                                                <div className={styles['form-group']} style={{ flex: 1 }}>
                                                    <label className={styles['form-label']}>Max W</label>
                                                    <input type="text" placeholder="none" value={selectedComponent.style?.maxWidth || ''} onChange={(e) => updateComponentStyle(selectedComponent.id, 'maxWidth', e.target.value)} className={styles['form-control']} />
                                                </div>
                                            </div>
                                            <div className={styles['form-group']}>
                                                <label className={styles['form-label']}>Overflow</label>
                                                <select value={selectedComponent.style?.overflow || 'visible'} onChange={(e) => updateComponentStyle(selectedComponent.id, 'overflow', e.target.value)} className={styles['form-control']}>
                                                    <option value="visible">Visible</option>
                                                    <option value="hidden">Hidden</option>
                                                    <option value="scroll">Scroll</option>
                                                    <option value="auto">Auto</option>
                                                </select>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className={styles['prop-category']}>
                                    <div className={`${styles['prop-header']} ${openCategories.layout ? styles.open : ''}`} onClick={() => toggleCategory('layout')}>
                                        <span><i className="fas fa-th-large"></i> LAYOUT & SPACING</span>
                                        <i className="fas fa-chevron-down"></i>
                                    </div>
                                    {openCategories.layout && (
                                        <div className={styles['prop-content']}>
                                            <div className={styles['spacing-visualizer']}>
                                                <div className={styles['spacing-container']}>
                                                    <span className={styles['spacing-label']} style={{ top: '6px' }}>Margin</span>
                                                    <input
                                                        type="number"
                                                        className={`${styles['spacing-input-mini']} ${styles.margin}`}
                                                        style={{ top: '4px', left: '50%', transform: 'translateX(-50%)' }}
                                                        value={parseInt(selectedComponent.style?.marginTop) || 0}
                                                        onChange={(e) => updateComponentStyle(selectedComponent.id, 'marginTop', `${e.target.value}px`)}
                                                        title="Margin Top"
                                                    />
                                                    <input
                                                        type="number"
                                                        className={`${styles['spacing-input-mini']} ${styles.margin}`}
                                                        style={{ bottom: '4px', left: '50%', transform: 'translateX(-50%)' }}
                                                        value={parseInt(selectedComponent.style?.marginBottom) || 0}
                                                        onChange={(e) => updateComponentStyle(selectedComponent.id, 'marginBottom', `${e.target.value}px`)}
                                                        title="Margin Bottom"
                                                    />
                                                    <input
                                                        type="number"
                                                        className={`${styles['spacing-input-mini']} ${styles.margin}`}
                                                        style={{ left: '4px', top: '50%', transform: 'translateY(-50%)' }}
                                                        value={parseInt(selectedComponent.style?.marginLeft) || 0}
                                                        onChange={(e) => updateComponentStyle(selectedComponent.id, 'marginLeft', `${e.target.value}px`)}
                                                        title="Margin Left"
                                                    />
                                                    <input
                                                        type="number"
                                                        className={`${styles['spacing-input-mini']} ${styles.margin}`}
                                                        style={{ right: '4px', top: '50%', transform: 'translateY(-50%)' }}
                                                        value={parseInt(selectedComponent.style?.marginRight) || 0}
                                                        onChange={(e) => updateComponentStyle(selectedComponent.id, 'marginRight', `${e.target.value}px`)}
                                                        title="Margin Right"
                                                    />

                                                    <div className={styles['spacing-inner-box']}>
                                                        <span className={styles['spacing-label']} style={{ top: '2px', fontSize: '8px' }}>Padding</span>
                                                        <input
                                                            type="number"
                                                            className={`${styles['spacing-input-mini']} ${styles.padding}`}
                                                            style={{ top: '2px', left: '50%', transform: 'translateX(-50%) scale(0.8)' }}
                                                            value={parseInt(selectedComponent.style?.paddingTop) || 0}
                                                            onChange={(e) => updateComponentStyle(selectedComponent.id, 'paddingTop', `${e.target.value}px`)}
                                                        />
                                                        <input
                                                            type="number"
                                                            className={`${styles['spacing-input-mini']} ${styles.padding}`}
                                                            style={{ bottom: '2px', left: '50%', transform: 'translateX(-50%) scale(0.8)' }}
                                                            value={parseInt(selectedComponent.style?.paddingBottom) || 0}
                                                            onChange={(e) => updateComponentStyle(selectedComponent.id, 'paddingBottom', `${e.target.value}px`)}
                                                        />
                                                        <input
                                                            type="number"
                                                            className={`${styles['spacing-input-mini']} ${styles.padding}`}
                                                            style={{ left: '2px', top: '50%', transform: 'translateY(-50%) scale(0.8)' }}
                                                            value={parseInt(selectedComponent.style?.paddingLeft) || 0}
                                                            onChange={(e) => updateComponentStyle(selectedComponent.id, 'paddingLeft', `${e.target.value}px`)}
                                                        />
                                                        <input
                                                            type="number"
                                                            className={`${styles['spacing-input-mini']} ${styles.padding}`}
                                                            style={{ right: '2px', top: '50%', transform: 'translateY(-50%) scale(0.8)' }}
                                                            value={parseInt(selectedComponent.style?.paddingRight) || 0}
                                                            onChange={(e) => updateComponentStyle(selectedComponent.id, 'paddingRight', `${e.target.value}px`)}
                                                        />
                                                        <div className={styles['spacing-center-icon']}>
                                                            <i className="fas fa-expand"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles['form-group']}>
                                                <label className={styles['form-label']}>Position Mode</label>
                                                <div className={styles['button-group']}>
                                                    <button 
                                                        onClick={() => updateComponentStyle(selectedComponent.id, 'position', 'absolute')} 
                                                        className={selectedComponent.style?.position === 'absolute' ? styles.active : ''}
                                                    >
                                                        Absolute
                                                    </button>
                                                    <button 
                                                        onClick={() => updateComponentStyle(selectedComponent.id, 'position', 'relative')} 
                                                        className={selectedComponent.style?.position === 'relative' ? styles.active : ''}
                                                    >
                                                        Relative
                                                    </button>
                                                </div>
                                                <p style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '5px' }}>
                                                    {selectedComponent.style?.position === 'absolute' 
                                                        ? 'Free dragging enabled (Wix Style)' 
                                                        : 'Auto-stacking enabled (Webflow Style)'}
                                                </p>
                                                
                                                {selectedComponent.style?.position === 'absolute' && (
                                                    <div className={styles.flex} style={{ gap: '10px', marginTop: '12px' }}>
                                                        <div className={styles['form-group']} style={{ flex: 1, marginBottom: 0 }}>
                                                            <label className={styles['form-label']} style={{ fontSize: '10px' }}>X (Left)</label>
                                                            <input 
                                                                type="number" 
                                                                value={parseInt(selectedComponent.style?.left) || 0} 
                                                                onChange={(e) => updateComponentStyle(selectedComponent.id, 'left', `${e.target.value}px`)} 
                                                                className={styles['form-control']} 
                                                            />
                                                        </div>
                                                        <div className={styles['form-group']} style={{ flex: 1, marginBottom: 0 }}>
                                                            <label className={styles['form-label']} style={{ fontSize: '10px' }}>Y (Top)</label>
                                                            <input 
                                                                type="number" 
                                                                value={parseInt(selectedComponent.style?.top) || 0} 
                                                                onChange={(e) => updateComponentStyle(selectedComponent.id, 'top', `${e.target.value}px`)} 
                                                                className={styles['form-control']} 
                                                            />
                                                        </div>
                                                    </div>
                                                )}
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
                                    <div className={`${styles['prop-header']} ${openCategories.flexbox ? styles.open : ''}`} onClick={() => toggleCategory('flexbox')}>
                                        <span><i className="fas fa-layer-group"></i> FLEXBOX</span>
                                        <i className="fas fa-chevron-down"></i>
                                    </div>
                                    {openCategories.flexbox && (
                                        <div className={styles['prop-content']}>
                                            <div className={styles['form-group']}>
                                                <label className={styles['form-label']}>Display</label>
                                                <select value={selectedComponent.style?.display || 'block'} onChange={(e) => updateComponentStyle(selectedComponent.id, 'display', e.target.value)} className={styles['form-control']}>
                                                    <option value="block">Block</option>
                                                    <option value="flex">Flex</option>
                                                    <option value="inline-block">Inline Block</option>
                                                </select>
                                            </div>
                                            {selectedComponent.style?.display === 'flex' && (
                                                <>
                                                    <div className={styles['form-group']}>
                                                        <label className={styles['form-label']}>Direction</label>
                                                        <select value={selectedComponent.style?.flexDirection || 'row'} onChange={(e) => updateComponentStyle(selectedComponent.id, 'flexDirection', e.target.value)} className={styles['form-control']}>
                                                            <option value="row">Row</option>
                                                            <option value="column">Column</option>
                                                        </select>
                                                    </div>
                                                    <div className={styles['form-group']}>
                                                        <label className={styles['form-label']}>Align Items</label>
                                                        <select value={selectedComponent.style?.alignItems || 'stretch'} onChange={(e) => updateComponentStyle(selectedComponent.id, 'alignItems', e.target.value)} className={styles['form-control']}>
                                                            <option value="flex-start">Start</option>
                                                            <option value="center">Center</option>
                                                            <option value="flex-end">End</option>
                                                            <option value="stretch">Stretch</option>
                                                        </select>
                                                    </div>
                                                    <div className={styles['form-group']}>
                                                        <label className={styles['form-label']}>Justify Content</label>
                                                        <select value={selectedComponent.style?.justifyContent || 'flex-start'} onChange={(e) => updateComponentStyle(selectedComponent.id, 'justifyContent', e.target.value)} className={styles['form-control']}>
                                                            <option value="flex-start">Start</option>
                                                            <option value="center">Center</option>
                                                            <option value="flex-end">End</option>
                                                            <option value="space-between">Between</option>
                                                            <option value="space-around">Around</option>
                                                        </select>
                                                    </div>
                                                    <div className={styles['form-group']}>
                                                        <label className={styles['form-label']}>Gap (px)</label>
                                                        <input type="number" value={parseInt(selectedComponent.style?.gap) || 0} onChange={(e) => updateComponentStyle(selectedComponent.id, 'gap', `${e.target.value}px`)} className={styles['form-control']} />
                                                    </div>
                                                </>
                                            )}
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
                                                    <option value="0px 20px 40px rgba(0,0,0,0.3)">Extra Strong</option>
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
                                            <div className={styles['form-group']}>
                                                <label className={styles['form-label']}>Filter (Blur)</label>
                                                <input type="range" min="0" max="20" step="1" value={parseInt(selectedComponent.style?.filter?.replace('blur(', '').replace('px)', '')) || 0} onChange={(e) => updateComponentStyle(selectedComponent.id, 'filter', `blur(${e.target.value}px)`)} className={styles['w-100']} />
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

                                        <label className={`${styles['d-block']} ${styles['mb-5']} ${styles['fw-bold']}`}>Background Gradient</label>
                                        <select
                                            value={activePage.style.background || 'none'}
                                            onChange={(e) => updatePageStyle('background', e.target.value)}
                                            className={`${styles['form-control']} ${styles['mb-15']}`}
                                        >
                                            <option value="none">None</option>
                                            <option value="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">Royal Purple</option>
                                            <option value="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)">Soft Pink</option>
                                            <option value="linear-gradient(135deg, #2af598 0%, #009efd 100%)">Ocean Blue</option>
                                            <option value="linear-gradient(135deg, #0a0a0a 0%, #2e2e2e 100%)">Dark Studio</option>
                                            <option value="linear-gradient(135deg, #d4af37 0%, #aa8b2c 100%)">Gold Luxury</option>
                                        </select>

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

            {/* Professional Template Gallery */}
            {showGallery && (
                <TemplateGallery
                    onSelect={loadTemplate}
                    onClose={() => setShowGallery(false)}
                />
            )}
        </div>
    );
};

export default Editor;