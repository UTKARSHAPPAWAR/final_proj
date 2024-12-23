import React, { useState } from 'react';

import SearchModal from '../components/ModalSearch';
// import Notifications from '../components/DropdownNotifications';
import Help from '../components/DropdownHelp';
// import UserMenu from '../components/DropdownProfile';
import ThemeToggle from '../components/ThemeToggle';

function Header({ sidebarOpen, setSidebarOpen }) {
  // const [searchModalOpen, setSearchModalOpen] = useState(false);

  return (
    <header className="sticky top-0 bg-green-800 dark:bg-[#182235] border-b border-slate-200 dark:border-slate-700 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          {/* Header: Left side */}
          <div className="flex">
            {/* Hamburger button */}
            <button
              className="text-yellow-500 hover:text-yellow-600 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={(e) => {
                e.stopPropagation();
                setSidebarOpen(!sidebarOpen);
              }}
            >
              <span className="sr-only">Open sidebar</span>
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>
          </div>

          {/* Header: Right side */}
          <div className="flex items-center space-x-3">
            <h1 className='font-bold text-yellow-500 text-2xl font-mono xl:text-2xl hidden sm:block'>Dashboard for Chandrakanta Kesavan Center for Energy Policy and Climate Solutions</h1>
            <h1 className='font-bold text-yellow-500 text-xl font-mono xl:text-xl block sm:hidden'>CKCEPS DashBoard</h1>
            <ThemeToggle />
            {/* Divider */}
            <hr className="w-px h-6 bg-slate-200 dark:bg-slate-700 border-none" />
            {/* <UserMenu align="right" /> */}
          </div>

        </div>
      </div>
    </header>
  );
}

export default Header;
