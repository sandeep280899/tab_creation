import React from 'react';

const Tab = ({ title, onClose, onClick, isActive }) => {
    return (
        <div className={`tab ${isActive ? 'active' : ''}`} onClick={onClick}>
            <span className="title">{title}</span>
            <button className="close-btn" onClick={onClose}>x</button>
        </div>
    );
};

export default Tab;
