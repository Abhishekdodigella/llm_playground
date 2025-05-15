import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FlaskConical,
  BarChart2,
  Database,
  Box,
  Home,
  Settings,
  Archive,
  FileText,
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const navigationItems = [
    { name: 'Dashboard', icon: Home, path: '/' },
    { name: 'Playground', icon: FlaskConical, path: '/playground' },
    { name: 'Models', icon: Box, path: '/models' },
    { name: 'Datasets', icon: Database, path: '/datasets' },
    { name: 'Analytics', icon: BarChart2, path: '/analytics' },
    { name: 'Documents', icon: FileText, path: '/documents' },
    { name: 'History', icon: Archive, path: '/history' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 ease-in-out md:relative md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-16 items-center border-b border-slate-200 px-4">
          <h2 className="text-lg font-semibold text-slate-900">Navigation</h2>
        </div>

        <nav className="flex-1 space-y-1 px-2 py-4">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                'flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                location.pathname === item.path
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              )}
              onClick={() => {
                if (window.innerWidth < 768) {
                  setIsOpen(false);
                }
              }}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="border-t border-slate-200 p-4">
          <div className="rounded-md bg-indigo-50 p-3">
            <h3 className="font-medium text-indigo-800">
              Need Help?
            </h3>
            <p className="mt-1 text-xs text-indigo-700">
              Check our documentation or contact support for assistance.
            </p>
            <button className="mt-2 text-xs font-medium text-indigo-600 hover:text-indigo-500">
              View Documentation →
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};