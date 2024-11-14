'use client'
import React from 'react';
import { useTabsContext } from './TabsContainer';

interface TabProps {
    index: number;
    children: React.ReactNode;
    tabStyles?: string;
    activeTabStyle?: string;
}

const Tab: React.FC<TabProps> = ({ index, children, tabStyles, activeTabStyle = "font-semibold border-b-2" }) => {
    const { activeTab, setActiveTab } = useTabsContext();

    return (
        <button
            className={` ${tabStyles} ${activeTab === index ? activeTabStyle : ''}`}
            onClick={() => setActiveTab(index)}
        >
            {children}
        </button>
    );
};

export default Tab;
