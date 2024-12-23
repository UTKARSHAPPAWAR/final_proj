import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import SidebarLinkGroup from './SidebarLinkGroup';

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true');

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector('body').classList.add('sidebar-expanded');
    } else {
      document.querySelector('body').classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <></>
    // <div>
    //   {/* Sidebar backdrop (mobile only) */}
    //   <div
    //     className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
    //       sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
    //     }`}
    //     aria-hidden="true"
    //   ></div>

    //   {/* Sidebar */}
    //   <div
    //     id="sidebar"
    //     ref={sidebar}w-48
    //     className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar  lg:w-20 lg:sidebar-expanded:!w-60 2xl:!w-60 shrink-0 bg-green-700 p-4 transition-all duration-200 ease-in-out dark:bg-slate-700 ${
    //       sidebarOpen ? 'translate-x-0' : '-translate-x-64'
    //     }`}
    //   >
    //     {/* Sidebar header */}
    //     <div className="flex justify-between mb-10 pr-3 sm:px-2">
    //       {/* Close button */}
    //       <button
    //         ref={trigger}
    //         className="lg:hidden text-yellow-500 hover:text-yellow-400"
    //         onClick={() => setSidebarOpen(!sidebarOpen)}
    //         aria-controls="sidebar"
    //         aria-expanded={sidebarOpen}
    //       >
    //         <span className="sr-only">Close sidebar</span>
    //         <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    //           <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
    //         </svg>
    //       </button>
    //       {/* Logo */}
    //       <NavLink end to="/" className="block ">
    //         <div className='text-yellow-300 font-bold text-2xl'>
    //             CKCEPS
    //         </div>
    //       </NavLink>
    //     </div> 

    //     {/* Links */}
    //     <div className="space-y-8">
    //       {/* Pages group */}
    //       <div>
    //         <h3 className="text-xs uppercase text-white font-semibold pl-3">
    //           <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">
    //             •••
    //           </span>
    //           <span className="text-lg lg:hidden lg:sidebar-expanded:block 2xl:block">Pages</span>
    //         </h3>
    //         <ul className="mt-3">
    //           {/* Dashboard */}
    //           {/* <SidebarLinkGroup activecondition={pathname === '/' || pathname.includes('dashboard')}>
    //             {(handleClick, open) => {
    //               return (
    //                 <React.Fragment>
    //                   <a
    //                     href="#0"
    //                     className={`block text-yellow truncate transition duration-150 ${
    //                       pathname === '/' || pathname.includes('dashboard') ? 'hover:text-black-200' : 'hover:text-black'
    //                     }`}
    //                     onClick={(e) => {
    //                       e.preventDefault();
    //                       sidebarExpanded ? handleClick() : setSidebarExpanded(true);
    //                     }}
    //                   >
    //                     <div className="flex items-center justify-between">
    //                       <div className="flex items-center">
    //                         <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
    //                           <path
    //                             className={`fill-current ${
    //                               pathname === '/' || pathname.includes('dashboard') ? 'text-green-500' : 'text-yellow-400'
    //                             }`}
    //                             d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z"
    //                           />
    //                           <path
    //                             className={`fill-current ${
    //                               pathname === '/' || pathname.includes('dashboard') ? 'text-green-600' : 'text-yellow-600'
    //                             }`}
    //                             d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z"
    //                           />
    //                           <path
    //                             className={`fill-current ${
    //                               pathname === '/' || pathname.includes('dashboard') ? 'text-green-200' : 'text-yellow-400'
    //                             }`}
    //                             d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z"
    //                           />
    //                         </svg>
    //                         <span className="text-lg font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
    //                           Dashboard
    //                         </span>
    //                       </div>
    //                       {/* Icon */}
    //                       {/* <div className="flex shrink-0 ml-2">
    //                         <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-black-400 ${open && 'rotate-180'}`} viewBox="0 0 12 12">
    //                           <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
    //                         </svg>
    //                       </div> */}
    //                     {/* </div>
    //                   </a>
                      
    //                 </React.Fragment>
    //               );
    //             }}
    //           </SidebarLinkGroup> */}
              
    //           {/* E-Commerce */}
    //           {/* <SidebarLinkGroup activecondition={pathname.includes('ecommerce')}>
    //             {(handleClick, open) => {
    //               return (
    //                 <React.Fragment>
    //                   <a
    //                     href="#0"
    //                     className={`block text-slate truncate transition duration-150 ${
    //                       pathname.includes('ecommerce') ? 'hover:text-black-200' : 'hover:text-black'
    //                     }`}
    //                     onClick={(e) => {
    //                       e.preventDefault();
    //                       sidebarExpanded ? handleClick() : setSidebarExpanded(true);
    //                     }}
    //                   >
    //                     <div className="flex items-center justify-between">
    //                       <div className="flex items-center">
    //                         <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
    //                           <path
    //                             className={`fill-current ${pathname.includes('ecommerce') ? 'text-green-300' : 'text-black-400'}`}
    //                             d="M13 15l11-7L11.504.136a1 1 0 00-1.019.007L0 7l13 8z"
    //                           />
    //                           <path
    //                             className={`fill-current ${pathname.includes('ecommerce') ? 'text-green-600' : 'text-black-700'}`}
    //                             d="M13 15L0 7v9c0 .355.189.685.496.864L13 24v-9z"
    //                           />
    //                           <path
    //                             className={`fill-current ${pathname.includes('ecommerce') ? 'text-green-500' : 'text-black-600'}`}
    //                             d="M13 15.047V24l10.573-7.181A.999.999 0 0024 16V8l-11 7.047z"
    //                           />
    //                         </svg>
    //                         <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
    //                           Projects
    //                         </span>
    //                       </div>
    //                       {/* Icon */}
    //                       {/* <div className="flex shrink-0 ml-2">
    //                         <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-black-400 ${open && 'rotate-180'}`} viewBox="0 0 12 12">
    //                           <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
    //                         </svg>
    //                       </div> 
    //                     </div>
    //                   </a>
    //                 </React.Fragment>
    //               );
    //             }}
    //           </SidebarLinkGroup> */}
    //           {/* Community
    //           <SidebarLinkGroup activecondition={pathname.includes('community')}>
    //             {(handleClick, open) => {
    //               return (
    //                 <React.Fragment>
    //                   <a
    //                     href="#0"
    //                     className={`block text-yellow-500 truncate transition duration-150 ${
    //                       pathname.includes('community') ? 'hover:text-black-200' : 'hover:text-black'
    //                     }`}
    //                     onClick={(e) => {
    //                       e.preventDefault();
    //                       sidebarExpanded ? handleClick() : setSidebarExpanded(true);
    //                     }}
    //                   >
    //                     <div className="flex items-center justify-between">
    //                       <div className="flex items-center">
    //                         <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
    //                           <path
    //                             className={`fill-current ${pathname.includes('community') ? 'text-green-500' : 'text-yellow-600'}`}
    //                             d="M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z"
    //                           />
    //                           <path
    //                             className={`fill-current ${pathname.includes('community') ? 'text-green-300' : 'text-yellow-400'}`}
    //                             d="M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z"
    //                           />
    //                         </svg>
    //                         <span className="text-lg font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
    //                           Faculty
    //                         </span>
    //                       </div>
    //                       {/* Icon */}
    //                       {/* <div className="flex shrink-0 ml-2">
    //                         <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-black-400 ${open && 'rotate-180'}`} viewBox="0 0 12 12">
    //                           <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
    //                         </svg>
    //                       </div> */}
    //                     {/* </div>
    //                   </a>
    //                 </React.Fragment>
    //               );
    //             }}
    //           </SidebarLinkGroup> */}
    //           {/* Tasks */}
    //           <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('messages') && 'bg-slate-900'}`}>
    //             <NavLink
    //               end
    //               to="https://carboncalculators.netlify.app"
    //               className={`block text-yellow-300 truncate transition duration-150 ${
    //                 pathname.includes('messages') ? 'hover:text-black-200' : 'hover:text-white'
    //               }`}
    //             >
    //               <div className="flex items-center justify-between">
    //                 <div className="grow flex items-center">
    //                 <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
    //                           <path
    //                             className={`fill-current ${pathname.includes('tasks') ? 'text-green-500' : 'text-yellow-600'}`}
    //                             d="M8 1v2H3v19h18V3h-5V1h7v23H1V1z"
    //                           />
    //                           <path
    //                             className={`fill-current ${pathname.includes('tasks') ? 'text-green-500' : 'text-yellow-600'}`}
    //                             d="M1 1h22v23H1z"
    //                           />
    //                           <path
    //                             className={`fill-current ${pathname.includes('tasks') ? 'text-green-300' : 'text-yellow-400'}`}
    //                             d="M15 10.586L16.414 12 11 17.414 7.586 14 9 12.586l2 2zM5 0h14v4H5z"
    //                           />
    //                         </svg>
    //                   <span className="text-xl font-semibold font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 hover:text-2xl">
    //                     Calculator
    //                   </span>
    //                 </div>
    //               </div>
    //             </NavLink>
    //           </li>
    //           {/* Messages */}
    //           <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('messages') && 'bg-slate-900'}`}>
    //             <NavLink
    //               end
    //               to="https://iitk.ac.in/ckc/"
    //               className={`block text-yellow-300 truncate transition duration-150 ${
    //                 pathname.includes('messages') ? 'hover:text-white' : 'hover:text-white'
    //               }`}
    //             >
    //               <div className="flex items-center justify-between">
    //                 <div className="grow flex items-center">
    //                   <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
    //                     <path
    //                       className={`fill-current ${pathname.includes('messages') ? 'text-green-500' : 'text-yellow-600'}`}
    //                       d="M14.5 7c4.695 0 8.5 3.184 8.5 7.111 0 1.597-.638 3.067-1.7 4.253V23l-4.108-2.148a10 10 0 01-2.692.37c-4.695 0-8.5-3.184-8.5-7.11C6 10.183 9.805 7 14.5 7z"
    //                     />
    //                     <path
    //                       className={`fill-current ${pathname.includes('messages') ? 'text-green-300' : 'text-yellow-400'}`}
    //                       d="M11 1C5.477 1 1 4.582 1 9c0 1.797.75 3.45 2 4.785V19l4.833-2.416C8.829 16.85 9.892 17 11 17c5.523 0 10-3.582 10-8s-4.477-8-10-8z"
    //                     />
    //                   </svg>
    //                   <span className="text-xl font-semibold font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 hover:text-2xl">
    //                     About
    //                   </span>
    //                 </div>
    //               </div>
    //             </NavLink>
    //           </li>
    //           {/* Inbox */}
              
    //           {/* Calendar */}
    //         </ul>
    //       </div>
    //     </div>

    //     {/* Expand / collapse button */}
    //     <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
    //       <div className="px-3 py-2">
    //         <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
    //           <span className="sr-only">Expand / collapse sidebar</span>
    //           <svg className="w-6 h-6 fill-current sidebar-expanded:rotate-180" viewBox="0 0 24 24">
    //             <path className="text-yellow-400" d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z" />
    //             <path className="text-yellow-600" d="M3 23H1V1h2z" />
    //           </svg>
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default Sidebar;
