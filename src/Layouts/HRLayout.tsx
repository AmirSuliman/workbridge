import React from 'react';
import HrHeader from '../components/Headers/HrHeader';
import HrSidebar from '../components/SidebarMenu/HrSidebar';
import AuthProvider from '@/app/api/auth/[...nextauth]/auth-provider';

const HRLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="ml-0 lg:ml-[270px] 1700px:ml-auto max-w-[1700px] mx-auto">
      {/* hr sidebar is fixed positioned so the above classes will have no effect on it */}
      <HrSidebar /> {/* Sidebar width = 270px */}
      <HrHeader />
      <div className="p-4 2xl:p-8 1700px:w-[calc(1700px-270px)] 1700px:mr-0 1700px:ml-auto">
        <AuthProvider>{children}</AuthProvider>
      </div>
    </main>
  );
};
export default HRLayout;
