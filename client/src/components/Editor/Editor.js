import React, { useState, useRef, useCallback, useEffect } from 'react'; // eslint-disable-line no-unused-vars
import usePageManager from './hooks/usePageManager';
import useHistory from './hooks/useHistory';
import useExport from './hooks/useExport';
import { useDrop } from 'react-dnd';
import axios from 'axios';

/**
 * Editor.js
 * 
 * The main orchestrator component for the application frontend engine.
 * 
 * Core responsibilities:
 * - Bootstrapping and managing the React-DnD context for drag-and-drop mechanics.
 * - Integrating custom Data Hooks (`useHistory`, `usePageManager`, `useExport`) into a unified canvas state.
 * - Processing complex UI interactions and propagating changes safely through the data model.
 * - Communicating with the backend API (`axios`) to perform auto-saves, template syncs, and data fetching.
 */

import CanvasItem from './CanvasItem';
import styles from './Editor.module.css';
import TemplateGallery from '../TemplateGallery/TemplateGallery';

// ── Extracted pieces ────────────────────────────────────────────────────────
import getElementDefaults from '../../constants/elementDefaults';
import PropertiesPanel from './components/PropertiesPanel';
import EditorHeader from './components/EditorHeader';
import Sidebar from './components/Sidebar';
import SaveTemplateModal from './modals/SaveTemplateModal';
import AddPageModal from './modals/AddPageModal';
import RenamePageModal from './modals/RenamePageModal';
import DeletePageModal from './modals/DeletePageModal';

const ItemTypes = { SIDEBAR_ITEM: 'sidebarItem' };

const Editor = ({ onNavigateAbout }) => {
    // ── Page management (state + CRUD) ───────────────────────────────────────
    const {
        pages, setPages,
        activePageId, setActivePageId,
        activePage,
        setComponents, updatePageStyle,
        addPage, deletePage, renamePage,
        switchPage: switchPageBase,
        showAddPageModal, setShowAddPageModal,
        newPageName, setNewPageName,
        editingPage, setEditingPage,
        editPageName, setEditPageName,
        deletingPage, setDeletingPage,
    } = usePageManager();

    const components = activePage.components;

    // Background style helpers
    const backgroundImage   = activePage.style.backgroundImage;
    const setBackgroundImage    = (val) => updatePageStyle('backgroundImage', val);
    const backgroundSize    = activePage.style.backgroundSize;
    const setBackgroundSize     = (val) => updatePageStyle('backgroundSize', val);
    const backgroundPosition = activePage.style.backgroundPosition;
    const setBackgroundPosition = (val) => updatePageStyle('backgroundPosition', val);
    const backgroundRepeat  = activePage.style.backgroundRepeat;
    const setBackgroundRepeat   = (val) => updatePageStyle('backgroundRepeat', val);

    // ── Canvas / UI state ────────────────────────────────────────────────────
    const canvasRef = useRef(null);
    const [guides, setGuides]       = useState({ x: null, y: null });
    const [selectedId, setSelectedId] = useState(null);
    const [previewMode, setPreviewMode] = useState(false);
    const [viewMode, setViewMode]   = useState('desktop');
    const [projectId, setProjectId] = useState(null);
    const [isLoaded, setIsLoaded]   = useState(false);
    const isFirstLoad = useRef(true);
    const [showGallery, setShowGallery]               = useState(false);
    const [showPropertiesPanel, setShowPropertiesPanel] = useState(true);
    const [openCategories, setOpenCategories] = useState({
        content: true, layout: true, flexbox: false,
        typography: true, borders: false, effects: false,
    });
    const [openToolCategories, setOpenToolCategories] = useState({
        layout: true, basic: true, media: false,
        sections: false, pages: true, navigator: true,
    });
    const [toolbarPos, setToolbarPos] = useState({ top: 0, left: 0, visible: false });
    const [showSaveModal, setShowSaveModal]         = useState(false);
    const [tempTemplateName, setTempTemplateName]   = useState('');
    const [activeState, setActiveState]             = useState('normal');

    const toggleCategory     = (cat) => setOpenCategories(prev => ({ ...prev, [cat]: !prev[cat] }));
    const toggleToolCategory = (cat) => setOpenToolCategories(prev => ({ ...prev, [cat]: !prev[cat] }));

    // switchPage also clears selection
    const switchPage = (id) => { switchPageBase(id); setSelectedId(null); };

    // ── History (undo / redo) ────────────────────────────────────────────────
    const { history, future, saveHistory, undo, redo } = useHistory(components, setComponents);

    // Track selected element for floating toolbar
    useEffect(() => {
        if (!selectedId || previewMode) {
            setToolbarPos(prev => ({ ...prev, visible: false }));
            return;
        }
        const element = document.getElementById(`component-${selectedId}`);
        if (element && canvasRef.current) {
            const rect      = element.getBoundingClientRect();
            const canvasRect = canvasRef.current.getBoundingClientRect();
            setToolbarPos({
                top:  rect.top  - canvasRect.top  - 45,
                left: rect.left - canvasRect.left + rect.width / 2,
                visible: true,
            });
        }
    }, [selectedId, components, previewMode]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!isLoaded) return;

        // Prevent saving immediately after loading the project
        // This prevents the initial fetch from incorrectly triggering an overwrite.
        if (isFirstLoad.current) {
            isFirstLoad.current = false;
            return;
        }

        // Auto-save function: Continously syncs the user's progress with the backend
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

    // Function triggered upon dropping a new component onto the canvas or inserting one.
    // It captures the default element settings, assigns absolute positioning relative to drop coordinates,
    // and seeds empty objects for responsive and stateful specific styles.
    const addComponentToCanvas = (item, x, y) => {
        saveHistory();

        const { style: defaultStyle_, content: defaultContent } = getElementDefaults(item.type);
        let defaultStyle = { ...defaultStyle_ };


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

    // react-dnd (Drag and Drop) Hook setup for the main canvas area.
    const [{ isOver }, drop] = useDrop(() => ({
        accept: [ItemTypes.SIDEBAR_ITEM],
        hover: (item, monitor) => {
            // Continously evaluates drag movements over the canvas.
            // When dragged near the center of the canvas horizontally, it triggers a snapping guide.
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

            // Calculates the precise relative X/Y drop coordinates. 
            // Accounts for canvas scrolling position and inner borders to correct cursor alignment.
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

    // Generic action to modify a specific styling property for a given component.
    // This dynamically tracks which "View Mode" (desktop, mobile, tablet) and 
    // which "State Mode" (normal, hover, active) the user is currently editing, 
    // ensuring the style updates are nested within the correct responsive breakpoint or pseudo-class logic.
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

        const isMultiPage = template.pages && Array.isArray(template.pages);
        const currentHasContent = isMultiPage
            ? pages.some(p => p.components.length > 0)
            : components.length > 0;

        if (currentHasContent) {
            if (!window.confirm('Loading a template will replace your current work. Are you sure?')) {
                return;
            }
        }

        saveHistory();

        const normalizeComponents = (comps) => {
            return JSON.parse(JSON.stringify(comps)).map((comp, idx) => {
                const hasCoords = comp.style?.left !== undefined && comp.style?.top !== undefined;
                return {
                    ...comp,
                    id: Date.now() + Math.random() + idx, // Unique ID
                    style: {
                        ...comp.style,
                        position: comp.style?.position || (hasCoords ? 'absolute' : 'relative'),
                        margin: comp.style?.margin || (hasCoords ? '0' : '0 auto'),
                    },
                    responsiveStyles: comp.responsiveStyles || { tablet: {}, mobile: {} },
                    states: comp.states || { hover: {}, active: {} },
                    link: comp.link || '',
                };
            });
        };

        if (isMultiPage) {
            const normalizedPages = template.pages.map(page => ({
                ...page,
                components: normalizeComponents(page.components),
                style: page.style || {
                    backgroundImage: '',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }
            }));
            setPages(normalizedPages);
            setActivePageId(normalizedPages[0].id);
        } else {
            const normalized = normalizeComponents(template.components);
            setComponents(normalized);
        }

        setShowGallery(false);
    };

    // ── Export & template functions (via hook) ─────────────────────────
    const { handleExportHTML, handleExportJSON, handleSaveAsTemplate, confirmSaveTemplate } = useExport({
        pages, activePageId, components, tempTemplateName, setShowSaveModal,
    });

    // Wrap handleSaveAsTemplate to also reset the name field
    const openSaveTemplateModal = () => {
        setTempTemplateName('');
        handleSaveAsTemplate();
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
            <EditorHeader
                previewMode={previewMode}
                setPreviewMode={setPreviewMode}
                openSaveTemplateModal={openSaveTemplateModal}
                setShowGallery={setShowGallery}
                historyLength={history.length}
                futureLength={future.length}
                undo={undo}
                redo={redo}
                handleExportHTML={handleExportHTML}
                handleExportJSON={handleExportJSON}
                clearCanvas={clearCanvas}
                viewMode={viewMode}
                setViewMode={setViewMode}
                showPropertiesPanel={showPropertiesPanel}
                setShowPropertiesPanel={setShowPropertiesPanel}
                onNavigateAbout={onNavigateAbout}
            />

            <div className={`${styles['editor-layout']} ${previewMode ? styles.center : ''}`}>
                {/* Sidebar Tools */}
                {!previewMode && (
                    <Sidebar
                        openToolCategories={openToolCategories}
                        toggleToolCategory={toggleToolCategory}
                        addSectionToCanvas={addSectionToCanvas}
                        pages={pages}
                        activePageId={activePageId}
                        switchPage={switchPage}
                        setNewPageName={setNewPageName}
                        setShowAddPageModal={setShowAddPageModal}
                        setEditingPage={setEditingPage}
                        setEditPageName={setEditPageName}
                        setDeletingPage={setDeletingPage}
                        components={components}
                        selectedId={selectedId}
                        setSelectedId={setSelectedId}
                        reorderComponent={reorderComponent}
                        deleteComponent={deleteComponent}
                    />
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
                    <PropertiesPanel
                        selectedComponent={selectedComponent}
                        onStyleChange={updateComponentStyle}
                        onStylesChange={updateComponentStyles}
                        onContentChange={updateComponentContent}
                        onLinkChange={updateComponentLink}
                        onDelete={deleteComponent}
                        onDuplicate={duplicateComponent}
                        onAlign={alignComponent}
                        onReorder={reorderComponent}
                        activeState={activeState}
                        setActiveState={setActiveState}
                        openCategories={openCategories}
                        toggleCategory={toggleCategory}
                        viewMode={viewMode}
                        activePage={activePage}
                        backgroundImage={backgroundImage}
                        setBackgroundImage={setBackgroundImage}
                        backgroundSize={backgroundSize}
                        setBackgroundSize={setBackgroundSize}
                        backgroundPosition={backgroundPosition}
                        setBackgroundPosition={setBackgroundPosition}
                        backgroundRepeat={backgroundRepeat}
                        setBackgroundRepeat={setBackgroundRepeat}
                        updatePageStyle={updatePageStyle}
                        handlePageBackgroundUpload={handlePageBackgroundUpload}
                    />
                )}
            </div>

            {/* Modals */}
            {showSaveModal && (
                <SaveTemplateModal
                    tempTemplateName={tempTemplateName}
                    setTempTemplateName={setTempTemplateName}
                    onSave={confirmSaveTemplate}
                    onClose={() => setShowSaveModal(false)}
                />
            )}

            {showAddPageModal && (
                <AddPageModal
                    newPageName={newPageName}
                    setNewPageName={setNewPageName}
                    onAdd={addPage}
                    onClose={() => setShowAddPageModal(false)}
                />
            )}

            {editingPage && (
                <RenamePageModal
                    editPageName={editPageName}
                    setEditPageName={setEditPageName}
                    onRename={renamePage}
                    onClose={() => setEditingPage(null)}
                />
            )}

            {deletingPage && (
                <DeletePageModal
                    page={deletingPage}
                    onConfirm={deletePage}
                    onClose={() => setDeletingPage(null)}
                />
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