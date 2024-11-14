import React from 'react';
import HrHeader from '../components/HrHeader/HrHeader';
import HrSidebar from '../components/SidebarMenu/HrSidebar';

const HRLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="ml-0 lg:!ml-[300px]">
      {/* hr sidebar is fixed positioned so the above classes will have no effect on it */}
      <HrSidebar />
      <HrHeader />
      <div className="p-8">{children}</div>
    </main>
  );
};
export default HRLayout;
