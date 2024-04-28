import React from 'react';
import Tab from './Tab';

const TabsBar = ({ tabs, activeTabId, onTabClick, onCloseTab, onAddTab }) => {
    return (
        <div className="tabs-bar">
            {tabs.map(tab => (
                <Tab
                    key={tab.id}
                    title={tab.title}
                    onClose={() => onCloseTab(tab.id)}
                    onClick={() => onTabClick(tab.id)}
                    isActive={tab.id === activeTabId}
                />
            ))}
            <div className="add-tab" onClick={onAddTab}>+</div>
        </div>
    );
};

export default TabsBar;
