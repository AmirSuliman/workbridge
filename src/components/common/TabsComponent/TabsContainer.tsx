'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TabsContextType {
    activeTab: number;
    setActiveTab: (index: number) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

const TabsContainer: React.FC<{ containerClasses?: string, children: ReactNode }> = ({ children, containerClasses }) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab }}>
            <div className={containerClasses}>{children}</div>
        </TabsContext.Provider>
    );
};

// Custom hook to use the TabsContext
const useTabsContext = () => {
    const context = useContext(TabsContext);
    if (!context) {
        throw new Error('useTabsContext must be used within a TabsContainer');
    }
    return context;
};

export default TabsContainer;
export { useTabsContext };
