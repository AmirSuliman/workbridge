'use client';

import React from 'react';
import HrHeader from '../components/Headers/HrHeader';
import HrSidebar from '../components/SidebarMenu/HrSidebar';

const HRLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex">
      <HrSidebar />
      <div className="ml-0 lg:ml-[270px] w-full">
        <HrHeader />
        <div className="p-4 2xl:p-8">{children}</div>
      </div>
    </main>
  );
};

export default HRLayout;
