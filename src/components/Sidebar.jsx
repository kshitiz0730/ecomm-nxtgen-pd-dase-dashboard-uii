import React, { useState } from 'react';
import { List, ListItem } from '@material-tailwind/react';
import { FaBars, FaUser, FaHandshake, FaShoppingCart } from 'react-icons/fa';

export default function Sidebar({ sidebarItems, handleSidebarClick, isSidebarOpen, setIsSidebarOpen }) {
  const handleMouseEnter = () => setIsSidebarOpen(true);
  const handleMouseLeave = () => setIsSidebarOpen(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-shrink">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white text-gray-800 ${
          isSidebarOpen ? 'w-64' : 'w-16'
        } transition-all duration-300 z-50 md:relative md:w-64`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        role="cdb-sidebar"
      >
        <div
          className="sidebar-container h-full flex flex-col"
          style={{ backgroundColor: '#45ada8' }}
        >
          {/* Sidebar Header */}
          <div
            className="sidebar-header flex justify-between items-center h-16 px-4 border-b border-gray-200"
            style={{ backgroundColor: '#547980' }}
          >
            <button
              className="sidebar-toggler cursor-pointer text-white md:hidden"
              onClick={toggleSidebar}
            >
              <FaBars size={20} className="text-white" style={{ zIndex: '1000' }} />
            </button>
          </div>

          {/* Sidebar Navigation */}
          <div
            className="sidebar-nav flex-grow overflow-y-auto"
            style={{ backgroundColor: '#45ada8' }}
          >
            <div className="sidenav">
              {/* Dynamic Sidebar Items */}
              {sidebarItems && (
                <List>
                  {sidebarItems.map((item) => (
                    <ListItem
                      key={item.key}
                      className={`sidebar-item block py-3 px-4 cursor-pointer hover:bg-gray-100 ${
                        isSidebarOpen
                          ? 'flex items-center gap-2'
                          : 'flex flex-col items-center justify-center'
                      }`}
                      onClick={() => handleSidebarClick(item)}
                    >
                      <div
                        className={`sidebar-item-content flex items-center ${
                          isSidebarOpen ? 'justify-start' : 'justify-center'
                        }`}
                      >
                        <div className="sidebar-icon-wrapper">
                          {item.key === 'account-users' && (
                            <FaUser
                              size={isSidebarOpen ? 20 : 16}
                              className="sidebar-icon text-white mr-2"
                            />
                          )}
                          {item.key === 'contracts' && (
                            <FaHandshake
                              size={isSidebarOpen ? 20 : 16}
                              className="sidebar-icon text-white mr-2"
                            />
                          )}
                          {item.key === 'orders' && (
                            <FaShoppingCart
                              size={isSidebarOpen ? 20 : 16}
                              className="sidebar-icon text-white mr-2"
                            />
                          )}
                        </div>
                        {isSidebarOpen && <span className="ml-2 text-white">{item.name}</span>}
                      </div>
                    </ListItem>
                  ))}
                </List>
              )}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
