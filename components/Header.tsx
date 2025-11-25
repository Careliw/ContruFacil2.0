import React from 'react';
import { HelpCircle } from 'lucide-react';
import AppLogo from './AppLogo';
import Tooltip from './Tooltip';

interface HeaderProps {
  onOpenHelp: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenHelp }) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm no-print">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4">
           <div className="bg-green-500 p-2 rounded-lg text-white shadow-sm">
             <AppLogo size={22} />
           </div>
           <div>
             <h1 className="text-xl font-bold text-gray-800 leading-tight">ConstruFacil</h1>
             <p className="text-[11px] text-gray-400 font-medium tracking-wide">Calculadora de Averbação</p>
           </div>
        </div>
        
        <Tooltip content="Abrir página de ajuda" position="left">
          <button 
            onClick={onOpenHelp}
            className="flex items-center gap-2 text-gray-500 hover:text-green-600 transition-colors px-4 py-2 rounded-md hover:bg-gray-50 group"
          >
            <HelpCircle size={22} className="group-hover:scale-110 transition-transform" />
            <span className="hidden md:inline text-sm font-medium">Ajuda</span>
          </button>
        </Tooltip>
      </div>
    </header>
  );
};

export default Header;