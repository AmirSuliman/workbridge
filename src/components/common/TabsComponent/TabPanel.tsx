'use client'
import React from 'react';
import { useTabsContext } from './TabsContainer';

interface TabPanelProps {
    index: number;
    children: React.ReactNode;
    classNames?: string
}

const TabPanel: React.FC<TabPanelProps> = ({ index, children, classNames }) => {
    const { activeTab } = useTabsContext();

    return activeTab === index ? <div className={classNames}>{children}</div> : null;
};

export default TabPanel;
