import { useState, useCallback } from 'react';

/**
 * useHistory — manages undo/redo for the editor canvas components.
 *
 * @param {Array}    components   - current components array
 * @param {Function} setComponents - setter for components
 */
const useHistory = (components, setComponents) => {
    const [history, setHistory] = useState([]);
    const [future, setFuture] = useState([]);

    const saveHistory = useCallback(() => {
        // Records the current state of components before an action alters them.
        // Clears the "future" stack because any new action invalidates previous redo states.
        setHistory(prev => [...prev, components]);
        setFuture([]);
    }, [components]);

    const undo = useCallback(() => {
        if (history.length === 0) return;
        // Restores the last saved state from the history stack and moves the current active state to the future stack.
        const previous = history[history.length - 1];
        setFuture(prev => [components, ...prev]);
        setComponents(previous);
        setHistory(prev => prev.slice(0, -1));
    }, [history, components, setComponents]);

    const redo = useCallback(() => {
        if (future.length === 0) return;
        const next = future[0];
        setHistory(prev => [...prev, components]);
        setComponents(next);
        setFuture(prev => prev.slice(1));
    }, [future, components, setComponents]);

    return { history, future, saveHistory, undo, redo };
};

export default useHistory;
