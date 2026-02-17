import React from 'react';
import { useDrag } from 'react-dnd';
import styles from './SidebarItem.module.css';

const ItemTypes = {
    SIDEBAR_ITEM: 'sidebarItem',
};

const SidebarItem = ({ type, label, icon }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.SIDEBAR_ITEM,
        item: { type, label },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            className={styles['sidebar-item']}
            style={{ opacity: isDragging ? 0.5 : 1 }}
        >
            {icon && <i className={`${icon} ${styles['item-icon']}`} style={{ marginRight: '8px', fontSize: '14px' }}></i>}
            <span>{label}</span>
        </div>
    );
};

export default SidebarItem;