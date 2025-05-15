import React from 'react';
import { BrainCog, User, Settings, LogOut } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  toggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm transition-all">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2 md:hidden"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </Button>
        <div className="flex items-center">
          <BrainCog className="h-8 w-8 text-indigo-600" />
          <span className="ml-2 text-xl font-bold text-slate-900">
            LLM Playground
          </span>
        </div>
      </div>

      {isAuthenticated && (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          
          <div className="relative">
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-8 w-8 rounded-full"
                />
              ) : (
                <User className="h-8 w-8 rounded-full bg-slate-200 p-1" />
              )}
              <span className="hidden md:inline">{user?.name}</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center text-red-500 hover:bg-red-50 hover:text-red-600"
              onClick={logout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};