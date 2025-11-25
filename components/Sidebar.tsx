import React from 'react';
import { LayoutDashboard, HelpCircle } from 'lucide-react';
import AppLogo from './AppLogo';

interface SidebarProps {
  activePage: 'calculator' | 'help';
  onNavigate: (page: 'calculator' | 'help') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, onNavigate }) => {
  return (
    <aside className="bg-white md:w-64 flex-shrink-0 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col no-print z-30">
      <div className="p-4 md:p-6 flex items-center gap-3 border-b border-gray-100">
        <div className="bg-green-500 p-2 rounded-lg text-white">
          <AppLogo size={24} />
        </div>
        <span className="text-xl font-bold text-gray-800 tracking-tight">ConstruFacil</span>
      </div>

      <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
        <button
          onClick={() => onNavigate('calculator')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
            activePage === 'calculator'
              ? 'bg-green-50 text-green-700 shadow-sm ring-1 ring-green-100'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <LayoutDashboard size={20} />
          Calculadora
        </button>

        <button
          onClick={() => onNavigate('help')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
            activePage === 'help'
              ? 'bg-green-50 text-green-700 shadow-sm ring-1 ring-green-100'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <HelpCircle size={20} />
          Ajuda
        </button>
      </nav>

      <div className="p-4 border-t border-gray-100 hidden md:block">
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <p className="text-xs text-gray-500 font-medium">ConstruFacil v1.1.0</p>
          <p className="text-[10px] text-gray-400 mt-1">Ferramenta auxiliar</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;