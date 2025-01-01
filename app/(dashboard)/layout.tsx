import React from 'react';
import {UserButton} from '@clerk/nextjs';

const DashboardLayout = ({children}: { children: React.ReactNode }) => {
  return (
    <div className={'h-screen w-screen relative'}>
      <aside
        className={'absolute top-0 left-0 h-full border-r border-black/10 w-[200px]'}>
        mood
      </aside>
      <div className={'ml-[200px] h-[calc(100vh-60px)]'}>
        <header className={'h-[60px] border-b border-black/10 '}>
          <div className={'h-full w-full px-6 flex items-center justify-end'}>
            <UserButton/>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
