import { useState, useCallback } from 'react';

const DEFAULT_PAGE_STYLE = {
    backgroundImage: '',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
};

/**
 * usePageManager — manages multi-page state for the editor.
 */
const usePageManager = () => {
    const [pages, setPages] = useState([{
        id: 'home',
        name: 'Home',
        path: '/',
        components: [],
        style: { ...DEFAULT_PAGE_STYLE },
    }]);
    const [activePageId, setActivePageId] = useState('home');

    // ── Modal state ─────────────────────────────────────────────────────────
    const [showAddPageModal, setShowAddPageModal] = useState(false);
    const [newPageName, setNewPageName] = useState('');
    const [editingPage, setEditingPage] = useState(null);   // { id, name }
    const [editPageName, setEditPageName] = useState('');
    const [deletingPage, setDeletingPage] = useState(null); // { id, name }

    // ── Derived ─────────────────────────────────────────────────────────────
    const activePage = pages.find(p => p.id === activePageId) || pages[0];

    // ── Setters that target the active page ─────────────────────────────────
    const setComponents = useCallback((newComponentsOrUpdater) => {
        setPages(prev => prev.map(page => {
            if (page.id !== activePageId) return page;
            const newComponents =
                typeof newComponentsOrUpdater === 'function'
                    ? newComponentsOrUpdater(page.components)
                    : newComponentsOrUpdater;
            return { ...page, components: newComponents };
        }));
    }, [activePageId]);

    const updatePageStyle = useCallback((key, value) => {
        setPages(prev => prev.map(page =>
            page.id === activePageId
                ? { ...page, style: { ...page.style, [key]: value } }
                : page
        ));
    }, [activePageId]);

    // ── CRUD ────────────────────────────────────────────────────────────────
    const addPage = useCallback(() => {
        const name = newPageName.trim();
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
            style: { ...DEFAULT_PAGE_STYLE },
        }]);
        setActivePageId(id);
        setNewPageName('');
        setShowAddPageModal(false);
    }, [newPageName, pages]);

    const deletePage = useCallback((id) => {
        setPages(prev => {
            const filtered = prev.filter(p => p.id !== id);
            if (activePageId === id) {
                setActivePageId(filtered[0]?.id || 'home');
            }
            return filtered;
        });
        setDeletingPage(null);
    }, [activePageId]);

    const renamePage = useCallback(() => {
        const name = editPageName.trim();
        if (!name || !editingPage) return;
        const newId = name.toLowerCase().replace(/\s+/g, '-');

        setPages(prev => prev.map(p =>
            p.id === editingPage.id
                ? { ...p, name, id: newId, path: `/${newId === 'home' ? '' : newId}` }
                : p
        ));
        if (activePageId === editingPage.id) setActivePageId(newId);
        setEditingPage(null);
        setEditPageName('');
    }, [editPageName, editingPage, activePageId]);

    const switchPage = useCallback((id) => {
        setActivePageId(id);
    }, []);

    return {
        // data
        pages,
        setPages,
        activePageId,
        setActivePageId,
        activePage,
        // derived setters
        setComponents,
        updatePageStyle,
        // page CRUD
        addPage,
        deletePage,
        renamePage,
        switchPage,
        // modal state
        showAddPageModal, setShowAddPageModal,
        newPageName, setNewPageName,
        editingPage, setEditingPage,
        editPageName, setEditPageName,
        deletingPage, setDeletingPage,
    };
};

export default usePageManager;
